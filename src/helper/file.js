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

exports.readFromFile = async (filename) => {
  try {
    const data = await fs.promises.readFile(filename, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading from file ${filename}:`, err);
    return null;
  }
};
