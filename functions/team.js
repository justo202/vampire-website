const fs = require("fs");
const path = require("path");
const fileName = path.resolve("src/data/team.json");
const file = require("../src/data/team.json");
const {v4: uuidv4} = require("uuid");

const addMember = (newMember) => {
  const {name, dateJoined} = newMember,
    id = uuidv4();

  file.team[id] = {id, name, dateJoined};
  return file;
};

exports.handler = async function (e, ctx) {
  const newTeam = addMember(JSON.parse(e.body));
  fs.writeFile(fileName, JSON.stringify(newTeam, null, 2), (e) =>
    console.error(e)
  );

  return {
    statusCode: 200,
    data: {success: true},
  };
};
