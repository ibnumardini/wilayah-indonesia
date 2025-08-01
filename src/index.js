#!/usr/bin/env node

const { program } = require("commander");

const logger = require("./helper/logger");

const fetchData = require("./fetch-data");
const transformData = require("./transform-data");

program
  .version("1.0.0")
  .description(
    "Wilayah Indonesia - A CLI tool to manage and transform Indonesian administrative data."
  )
  .option("-f, --fetch", "Fetch latest raw data from BPS API")
  .option("-t, --transform", "Transform raw data into relational format")
  .action(async (options) => {
    if (options.fetch) {
      try {
        await fetchData();
        logger.info("Data fetched successfully", true);
      } catch (error) {
        logger.info(error.message, true);
        logger.error("Error fetching data:", error);
      } finally {
        logger.info("Fetching complete", true);
      }
    }

    if (options.transform) {
      try {
        await transformData();
        logger.info("Data transformed successfully", true);
      } catch (error) {
        logger.info(error.message, true);
        logger.error("Error transforming data:", error);
      } finally {
        logger.info("Transformation complete", true);
      }
    }

    if (!options.fetch && !options.transform) {
      program.help();
    }
  });

program.parse(process.argv);
