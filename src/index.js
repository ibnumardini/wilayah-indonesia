#!/usr/bin/env node

const { program } = require("commander");

const fetchData = require("./fetch-data");
const transformData = require("./transform-data");

program
  .version("1.0.0")
  .description(
    "Wilayah Indonesia Raya - A CLI tool to manage and transform Indonesian administrative data."
  )
  .option("-f, --fetch", "Fetch latest raw data from BPS API")
  .option("-t, --transform", "Transform raw data into relational format")
  .action(async (options) => {
    if (options.fetch) {
      try {
        await fetchData();
        console.log("Data fetched successfully.");
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    if (options.transform) {
      try {
        await transformData();
        console.log("Data transformed successfully.");
      } catch (error) {
        console.error("Error transforming data:", error.message);
      }
    }

    if (!options.fetch && !options.transform) {
      program.help();
    }
  });

program.parse(process.argv);
