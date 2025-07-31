const fs = require("fs");

exports.writeToFile = (filename, data) => {
  const dirPath = filename.split("/").slice(0, -1).join("/");

  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating folder:", err);
      return;
    } else {
      fs.writeFile(filename, JSON.stringify(data), (err) => {
        if (err) {
          console.error(`Error writing to file ${filename}:`, err);
        } else {
          console.log(`Data successfully written to ${filename}`);
        }
      });
    }
  });
};
