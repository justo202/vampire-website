const doi2bib = require("doi2bib");
const bibtexParse = require("@orcid/bibtex-parse-js");
const refs = require("../src/data/publications.json");

// TODO: Parse Author text for specialise characters

exports.handler = async function (e, ctx) {
  let data = [];
  const {pageNumber = 1, pubsPerPage = 12} = JSON.parse(e.body);

  data = await Promise.all(
    refs[0].data
      .slice((pageNumber - 1) * pubsPerPage, pageNumber * pubsPerPage)
      .map((item) =>
        doi2bib.getCitation(item).then((i) => bibtexParse.toJSON(i)[0])
      )
  );

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
