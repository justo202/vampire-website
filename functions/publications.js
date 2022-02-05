const doi2bib = require("doi2bib");
const bibtexParse = require("@orcid/bibtex-parse-js");
const pubRefs = require("../src/data/publications.json");

exports.handler = async function (e, ctx) {
  let data = [];
  for (let pub in pubRefs) {
    data.push(
      bibtexParse.toJSON(await doi2bib.getCitation(pubRefs[pub].doi))[0]
    );
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
