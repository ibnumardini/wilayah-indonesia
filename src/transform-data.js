const { writeToFile } = require("./helper/file");
const { titleCase } = require("./helper/string");

const provinces = require("../data/raw/1-provinces.json");
const regencies = require("../data/raw/2-regencies.json");
const districts = require("../data/raw/3-districts.json");
const subdistricts = require("../data/raw/4-subdistricts.json");
const postcodes = require("../data/raw/5-postcodes.json");

const transformData = async () => {
  try {
    const dataPath = "./data/transformed";

    const transformedProvinces = provinces.map((province) => ({
      code: province.kode_bps,
      name: titleCase(province.nama_bps),
    }));

    writeToFile(`${dataPath}/1-provinces.json`, transformedProvinces);

    const transformedRegencies = regencies.map((regency) => ({
      code: regency.kode_bps,
      name: titleCase(regency.nama_bps),
      province_code: regency.kode_bps.slice(0, 2),
    }));

    writeToFile(`${dataPath}/2-regencies.json`, transformedRegencies);

    const transformedDistricts = districts.map((district) => ({
      code: district.kode_bps,
      name: titleCase(district.nama_bps),
      regency_code: district.kode_bps.slice(0, 4),
    }));

    writeToFile(`${dataPath}/3-districts.json`, transformedDistricts);

    const transformedSubdistricts = subdistricts.map((subdistrict) => ({
      code: subdistrict.kode_bps,
      name: titleCase(subdistrict.nama_bps),
      district_code: subdistrict.kode_bps.slice(0, 7),
    }));

    writeToFile(`${dataPath}/4-subdistricts.json`, transformedSubdistricts);

    const transformedPostcodes = postcodes.map((postCode) => ({
      code: postCode.kode_pos,
      name: titleCase(postCode.nama_pos),
      subdistrict_code: postCode.kode_bps,
    }));

    writeToFile(`${dataPath}/5-postcodes.json`, transformedPostcodes);
  } catch (error) {
    console.error("Error during transformation:", error);
  }
};

module.exports = transformData;
