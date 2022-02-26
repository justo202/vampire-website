const {default: axios} = require('axios');
const getUuidByString = require('uuid-by-string');
const admin = require('../db/firebase-admin');
const functions = require('firebase-functions');
const firestore = admin.firestore();
const bulkWriter = firestore.bulkWriter();

const pubMedSearch = async (author) => {
  const firstname = author.name.split(" ")[0];
  const lastname = author.name.split(" ")[1];
  const result = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?retmode=json&term=${encodeURIComponent(`${lastname}, ${firstname}`)}[Full%20Author%20Name]&usehistory=y`);
  const publications = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?retmode=json&WebEnv=${result.data.esearchresult.webenv}&query_key=1&db=pubmed`);
  delete publications.data.result.uids;
  return await publications.data.result;
}

const ieeeXploreSearch = (author) => {
  if (!process.env.IEEEXPLORE_API_KEY) {
    return {error: "IEEEXPLORE_API_KEY NOT SET"}
  }

  const baseUrl = `http://ieeexploreapi.ieee.org/api/v1/search/articles?apikey=${process.env.IEEEXPLORE_API_KEY}&format=json`;
  const query = `&author=${author.name}`;
  return axios.get(`${baseUrl}${query}`).then(res => {
    const {articles} = res.data;
    if (!articles) {
      console.log("something happened");
      return { error: "No articles on IEEE found." }
    }
    const included = ({full_name}) => full_name.includes(author.name);
    return ({
      articles: articles.filter(({authors: { authors }}) => authors.some(included))
    })
  }).catch(err => {
    // console.error(err);
  });
}

const googleScholarSearch = async (author) => {
  const options = {
    urls: {
      base: "https://serpapi.com/search?",
      author_engine: "google_scholar_author",
      profiles_engine: "google_scholar_profiles"
    },
    operation: "view_citation"
  }

  // API Request to confirm Google Scholar Author ID
  const authorQuery = `${options.urls.base}engine=${options.urls.profiles_engine}&mauthors=${encodeURIComponent(author.name)}&api_key=${process.env.SERP_API_KEY}`;
  const id = await axios.get(authorQuery).then(res => {
    return res.data.profiles[0].author_id;
  }).catch(err => {
    console.error(err);
  });

  // If author ID does not exist, return error
  if (!id) {
    return ({error: "ID of author not found. Something went wrong"});
  }

  // API Request to get Google Scholar Articles by Author ID
  const idQuery = `${options.urls.base}engine=${options.urls.author_engine}&author_id=${id}&api_key=${process.env.SERP_API_KEY}`

  const articleIds = await axios.get(idQuery).then(res => {
    return res.data.articles.map(ar => ar.citation_id);
  }).catch(err => {
    // console.error(err);
  });

  const query = `${options.urls.base}engine=${options.urls.author_engine}&api_key=${process.env.SERP_API_KEY}&author_id=${id}&citation_id=${articleIds[0]}&view_op=${options.operation}`


  // const citations = await axios.get(query).then(res => {
  //   console.log(res.data.citation);
  // }).catch(err => {
  //   console.error(err);
  // })

  const citations = await Promise.allSettled(articleIds.map(id =>
    axios.get(`${options.urls.base}engine=${options.urls.author_engine}&api_key=${process.env.SERP_API_KEY}&author_id=${id}&citation_id=${id}&view_op=${options.operation}`)
         .then(res => {
           return res.data
          })
  ));

  return citations;
}

const parseString = (str) => str.match(/[\p{Letter}\p{Mark}\s]+/gu)[0].split(" ").join("")


exports.update = functions.https.onRequest(async (req, res) => {
  let articlesAdded = 0;
  const { collection, author } = JSON.parse(req.body);
  const {articles: ieeeArticles} = await ieeeXploreSearch(author);
  const scholRes = await googleScholarSearch(author);
  const pubMedRes = await pubMedSearch(author);

  for (let item in pubMedRes) {
    let ref = firestore.collection(collection).doc(getUuidByString(parseString(pubMedRes[item].title.match(/[\p{Letter}\p{Mark}\s]+/gu)[0].split(" ").join(""))));
    bulkWriter.set(ref, pubMedRes[item]);
    articlesAdded++;
  }

  scholRes.forEach(article => {
    let ref = firestore.collection(collection).doc(getUuidByString(parseString(article.value.citation.title.match(/[\p{Letter}\p{Mark}\s]+/gu)[0].split(" ").join(""))));
    bulkWriter.set(ref, article.value.citation);
    articlesAdded++;
  });

  ieeeArticles.forEach(article => {
    let ref = firestore.collection(collection).doc(getUuidByString(parseString(article.title.match(/[\p{Letter}\p{Mark}\s]+/gu)[0].split(" ").join(""))));
    bulkWriter.set(ref, article);
    articlesAdded++;
  });

  // // TODO
  // // loop through all fetched publications and add to firestore
  // // return number of publications fetched
  // // an idea could be to create a node tree that links authors to publications?????????

  await bulkWriter.close();
  res.json({msg: "Woohoo!"})
});

module.exports = { pubMedSearch, ieeeXploreSearch, googleScholarSearch, parseString}
