// db/store.js
const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "../db/db.json");

const readNotesFromFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbFilePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

const writeNotesToFile = (notes) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbFilePath, JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

module.exports = {
  readNotesFromFile,
  writeNotesToFile,
};
