const fs = require("fs");

const logger = require("./logger");

exports.writeToFile = (filename, data, stream = false) => {
  const dirPath = filename.split("/").slice(0, -1).join("/");

  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      throw new Error(`Error creating directory ${dirPath}: ${err.message}`);
    } else {
      if (stream) {
        const writeStream = fs.createWriteStream(filename, { flags: "a" });
        writeStream.write(JSON.stringify(data) + "\n");
        writeStream.end();
      } else {
        fs.writeFile(filename, JSON.stringify(data), (err) => {
          if (err) {
            throw new Error(
              `Error writing to file ${filename}: ${err.message}`
            );
          }
        });
      }
    }
  });
};

exports.readFromFile = async (filename) => {
  try {
    const data = await fs.promises.readFile(filename, "utf8");
    return JSON.parse(data);
  } catch (err) {
    logger.error(`Error reading from file ${filename}:`, err);
    return null;
  }
};
