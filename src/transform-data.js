const { writeToFile } = require("./helper/file");
const { titleCase } = require("./helper/string");

const provinces = require("../data/raw/1-provinces.json");
const districts = require("../data/raw/2-districts.json");
const subdistricts = require("../data/raw/3-subdistricts.json");
const villages = require("../data/raw/4-villages.json");
const postcodes = require("../data/raw/5-postcodes.json");

const transformData = async () => {
  try {
    const dataPath = "./data/transformed";

    const transformedProvinces = provinces.map((province) => ({
      code: province.kode_bps,
      name: titleCase(province.nama_bps),
    }));

    writeToFile(`${dataPath}/1-provinces.json`, transformedProvinces);

    const transformedDistricts = districts.map((district) => ({
      code: district.kode_bps,
      name: titleCase(district.nama_bps),
      province_code: district.kode_bps.slice(0, 2),
    }));

    writeToFile(`${dataPath}/2-districts.json`, transformedDistricts);

    const transformedSubdistricts = subdistricts.map((subdistrict) => ({
      code: subdistrict.kode_bps,
      name: titleCase(subdistrict.nama_bps),
      district_code: subdistrict.kode_bps.slice(0, 4),
    }));

    writeToFile(`${dataPath}/3-subdistricts.json`, transformedSubdistricts);

    const transformedVillages = villages.map((village) => ({
      code: village.kode_bps,
      name: titleCase(village.nama_bps),
      subdistrict_code: village.kode_bps.slice(0, 7),
    }));

    writeToFile(`${dataPath}/4-villages.json`, transformedVillages);

    const transformedPostcodes = postcodes.map((postCode) => ({
      code: postCode.kode_pos,
      name: titleCase(postCode.nama_pos),
      village_code: postCode.kode_bps,
    }));

    writeToFile(`${dataPath}/5-postcodes.json`, transformedPostcodes);
  } catch (error) {
    console.error("Error during transformation:", error);
  }
};

module.exports = transformData;
