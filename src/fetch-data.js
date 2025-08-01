const pLimit = require("p-limit");

const { writeToFile } = require("./helper/file");
const logger = require("./helper/logger");

const urlRegion = "https://sig.bps.go.id/rest-bridging/getwilayah";
const urlPos = "https://sig.bps.go.id/rest-bridging-pos/getwilayah";

const levels = {
  1: "provinsi", // province
  2: "kabupaten", // city/regency
  3: "kecamatan", // district
  4: "desa", // village/subdistrict
};

const yield = async (level, parent = false, pos = false) => {
  const params = {
    level: levels[level],
  };

  if (parent) params["parent"] = parent;

  const queryParams = new URLSearchParams(params).toString();

  const response = await fetch(`${pos ? urlPos : urlRegion}?${queryParams}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const fetchData = async () => {
  try {
    const dataPath = "./data/raw";

    const limit = pLimit(100);

    const provinces = await yield(1);

    writeToFile(`${dataPath}/1-provinces.json`, provinces);

    logger.info("Provinces data fetched successfully", true);

    const regencies = await Promise.all(
      provinces.map((province) => limit(() => yield(2, province.kode_bps)))
    );

    writeToFile(`${dataPath}/2-regencies.json`, regencies.flat());

    logger.info("Regencies data fetched successfully", true);

    const districts = await Promise.all(
      regencies.flat().map((regency) => limit(() => yield(3, regency.kode_bps)))
    );

    writeToFile(`${dataPath}/3-districts.json`, districts.flat());

    logger.info("Districts data fetched successfully", true);

    const subdistricts = await Promise.all(
      districts
        .flat()
        .map((district) => limit(() => yield(4, district.kode_bps)))
    );

    writeToFile(`${dataPath}/4-subdistricts.json`, subdistricts.flat());

    logger.info("Subdistricts data fetched successfully", true);

    const postcodes = await Promise.all(
      provinces.map((province) =>
        limit(() => yield(4, province.kode_bps, true))
      )
    );

    writeToFile(`${dataPath}/5-postcodes.json`, postcodes.flat());

    logger.info("Postcodes data fetched successfully", true);
  } catch (error) {
    throw error;
  }
};

module.exports = fetchData;
