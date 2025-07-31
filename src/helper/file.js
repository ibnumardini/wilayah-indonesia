const fs = require("fs");

exports.writeToFile = (filename, data) => {
  fs.writeFile(filename, JSON.stringify(data), (err) => {
    if (err) {
      console.error(`Error writing to file ${filename}:`, err);
    } else {
      console.log(`Data successfully written to ${filename}`);
    }
  });
};
