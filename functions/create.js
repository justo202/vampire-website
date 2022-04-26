const {default: axios} = require("axios");
const functions = require("firebase-functions");

const pubMedSearch = async (author) => {
  const generalFields =
    "&tool=VAMPIRE_PUBLICATION_SEARCH&email=vampire_enquires@dundee.ac.uk";
  const firstname = author.split(" ")[0];
  const lastname = author.split(" ")[1];
  const result = await axios.get(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?retmode=json&term=${encodeURIComponent(
      `${lastname}, ${firstname}`
    )}[Full%20Author%20Name]&usehistory=y${generalFields}`
  );
  const publications = await axios
    .get(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?retmode=json&WebEnv=${result.data.esearchresult.webenv}&query_key=1&db=pubmed${generalFields}`
    )
    .then((res) => {
      if (res.data && res.data.result) {
        let newRes = {};
        for (let key in res.data.result) {
          newRes[key] = {
            ...res.data.result[key],
            searchEngine: "pubmed",
          };
        }
        return newRes;
      } else {
        return {};
      }
    });

  return publications;
};

const ieeeXploreSearch = (author) => {
  if (!functions.config().search.ieeexplore_api_key) {
    return {error: "IEEEXPLORE_API_KEY NOT SET"};
  }

  const baseUrl = `http://ieeexploreapi.ieee.org/api/v1/search/articles?apikey=${
    functions.config().search.ieeexplore_api_key
  }&format=json`;
  const query = `&author=${author}`;
  return axios
    .get(`${baseUrl}${query}`)
    .then((res) => {
      const {articles} = res.data;
      if (!articles) {
        return {error: "No articles on IEEE found."};
      }
      const included = ({full_name}) => full_name.includes(author);
      return {
        articles: articles
          .filter(({authors: {authors}}) => authors.some(included))
          .map((item) => ({...item, searchEngine: "ieeexplore"})),
      };
    })
    .catch((err) => {
      console.error(err);
    });
};

const googleScholarSearch = async (author) => {
  const options = {
    urls: {
      base: "https://serpapi.com/search?",
      author_engine: "google_scholar_author",
      profiles_engine: "google_scholar_profiles",
    },
    operation: "view_citation",
  };

  // API Request to confirm Google Scholar Author ID
  const authorQuery = `${options.urls.base}engine=${
    options.urls.profiles_engine
  }&mauthors=${encodeURIComponent(author)}&api_key=${process.env.SERP_API_KEY}`;
  const id = await axios
    .get(authorQuery)
    .then((res) => {
      if (res.data.profiles) {
        if (res.data.profiles.length > 0) {
          return res.data.profiles[0].author_id;
        }
      }
    })
    .catch((err) => {
      console.error(err);
    });

  // If author ID does not exist, return error
  if (!id) {
    return {error: "ID of author not found. Something went wrong"};
  }

  // API Request to get Google Scholar Articles by Author ID
  const idQuery = `${options.urls.base}engine=${options.urls.author_engine}&author_id=${id}&api_key=${process.env.SERP_API_KEY}`;

  const articleIds = await axios
    .get(idQuery)
    .then((res) => {
      return res.data.articles.map((ar) => ar.citation_id);
    })
    .catch((err) => {
      console.error(err);
    });

  const query = `${options.urls.base}engine=${options.urls.author_engine}&api_key=${process.env.SERP_API_KEY}&author_id=${id}&citation_id=${articleIds[0]}&view_op=${options.operation}`;

  const citations = await Promise.allSettled(
    articleIds.map((id) =>
      axios
        .get(
          `${options.urls.base}engine=${options.urls.author_engine}&api_key=${process.env.SERP_API_KEY}&author_id=${id}&citation_id=${id}&view_op=${options.operation}`
        )
        .then((res) => res.data)
    )
  );

  return citations;
};

exports.create = functions
  .region("europe-west2")
  .https.onCall(async (data, context) => {
    const {author} = data;
    const {error: ieeeErr, articles: ieeeArticles} = await ieeeXploreSearch(
      author
    );
    // const {error: scholErr, articles: scholRes} = await googleScholarSearch(
    //   author
    // );
    // const {error: pubMedErr, articles: pubMedRes} = await pubMedSearch(author);

    console.log(ieeeErr);
    // status 3 === everything went fine
    // status 2 === most things went fine
    // status 1 === all errored
    // status 0 === uncaught error
    return {
      // ...scholRes,
      // ...pubMedRes,
      ...ieeeArticles,
    };
  });
