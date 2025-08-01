const { writeToFile, readFromFile } = require("./helper/file");
const { titleCase } = require("./helper/string");
const logger = require("./helper/logger");

const transformData = async () => {
  try {
    const dataRawPath = "./data/raw";
    const dataPath = "./data/transformed";

    const provinces = await readFromFile(`${dataRawPath}/1-provinces.json`);
    if (!provinces) throw new Error("Provinces data not found");

    const transformedProvinces = provinces.map((province) => ({
      code: province.kode_bps,
      name: titleCase(province.nama_bps),
    }));

    writeToFile(`${dataPath}/1-provinces.json`, transformedProvinces);

    logger.info("Provinces data transformed successfully", true);

    const regencies = await readFromFile(`${dataRawPath}/2-regencies.json`);
    if (!regencies) throw new Error("Regencies data not found");

    const transformedRegencies = regencies.map((regency) => ({
      code: regency.kode_bps,
      name: titleCase(regency.nama_bps),
      province_code: regency.kode_bps.slice(0, 2),
    }));

    writeToFile(`${dataPath}/2-regencies.json`, transformedRegencies);

    logger.info("Regencies data transformed successfully", true);

    const districts = await readFromFile(`${dataRawPath}/3-districts.json`);
    if (!districts) throw new Error("Districts data not found");

    const transformedDistricts = districts.map((district) => ({
      code: district.kode_bps,
      name: titleCase(district.nama_bps),
      regency_code: district.kode_bps.slice(0, 4),
    }));

    writeToFile(`${dataPath}/3-districts.json`, transformedDistricts);

    logger.info("Districts data transformed successfully", true);

    const subdistricts = await readFromFile(
      `${dataRawPath}/4-subdistricts.json`
    );
    if (!subdistricts) throw new Error("Subdistricts data not found");

    const transformedSubdistricts = subdistricts.map((subdistrict) => ({
      code: subdistrict.kode_bps,
      name: titleCase(subdistrict.nama_bps),
      district_code: subdistrict.kode_bps.slice(0, 7),
    }));

    writeToFile(`${dataPath}/4-subdistricts.json`, transformedSubdistricts);

    logger.info("Subdistricts data transformed successfully", true);

    const postcodes = await readFromFile(`${dataRawPath}/5-postcodes.json`);
    if (!postcodes) throw new Error("Postcodes data not found");

    const transformedPostcodes = postcodes.map((postCode) => ({
      code: postCode.kode_pos,
      name: titleCase(postCode.nama_pos),
      subdistrict_code: postCode.kode_bps,
    }));

    writeToFile(`${dataPath}/5-postcodes.json`, transformedPostcodes);

    logger.info("Postcodes data transformed successfully", true);
  } catch (error) {
    throw error;
  }
};

module.exports = transformData;
