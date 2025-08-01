const { writeToFile } = require("./file");

exports.info = (message, stdout = false) => {
  if (stdout) console.log(`INFO: ${message}`);

  writeToFile("./logs/info.log", `INFO: ${message}`, true);
};

exports.error = (message, error, stdout = false) => {
  if (stdout) console.error(`ERROR: ${message}`, error);

  writeToFile("./logs/error.log", `ERROR: ${message}\n${error?.stack}`, true);
};
