const faunadb = require("faunadb");
const fs = require("fs");
const path = require("path");
const fileName = path.resolve("src/data/team.json");
const file = require("../src/data/team.json");
const {v4: uuidv4} = require("uuid");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

const addMember = (newMember) => {
  const {name, dateJoined} = newMember,
    id = uuidv4();

  file.team[id] = {id, name, dateJoined};
  return file;
};

exports.handler = async function (e, ctx, callback) {
  return client
    .query(q.Get(q.Match(q.Index("team_by_name"), "R Sewell")))
    .then((res) => {
      console.log(res);
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(res),
      });
    })
    .catch((err) => {
      console.error(err);
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(err),
      });
    });
  // const newTeam = addMember(JSON.parse(e.body));
  // fs.writeFile(fileName, JSON.stringify(newTeam, null, 2), (e) =>
  //   console.error(e)
  // );

  // return {
  //   statusCode: 200,
  //   data: {success: true},
  // };
};
