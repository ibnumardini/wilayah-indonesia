const { writeToFile } = require("./helper/file");
const { titleCase } = require("./helper/string");

const rawProvinces = require("../data/raw/1-provinces.json");
const rawDistricts = require("../data/raw/2-districts.json");
const rawSubdistricts = require("../data/raw/3-subdistricts.json");
const rawVillages = require("../data/raw/4-villages.json");
const rawPostCodes = require("../data/raw/5-postcodes.json");

const transformData = async () => {
  try {
    const dataPath = "./data/transformed";

    const transformedProvinces = rawProvinces.map((province) => ({
      code: province.kode_bps,
      name: titleCase(province.nama_bps),
    }));

    writeToFile(`${dataPath}/1-provinces.json`, transformedProvinces);

    const districts = rawDistricts.map((district) => ({
      code: district.kode_bps,
      name: titleCase(district.nama_bps),
      province_code: district.kode_bps.slice(0, 2),
    }));

    writeToFile(`${dataPath}/2-districts.json`, districts);

    const subdistricts = rawSubdistricts.map((subdistrict) => ({
      code: subdistrict.kode_bps,
      name: titleCase(subdistrict.nama_bps),
      district_code: subdistrict.kode_bps.slice(0, 4),
    }));

    writeToFile(`${dataPath}/3-subdistricts.json`, subdistricts);

    const villages = rawVillages.map((village) => ({
      code: village.kode_bps,
      name: titleCase(village.nama_bps),
      subdistrict_code: village.kode_bps.slice(0, 7),
    }));

    writeToFile(`${dataPath}/4-villages.json`, villages);

    const postCodes = rawPostCodes.map((postCode) => ({
      code: postCode.kode_pos,
      name: titleCase(postCode.nama_pos),
      village_code: postCode.kode_bps,
    }));

    writeToFile(`${dataPath}/5-postcodes.json`, postCodes);
  } catch (error) {
    console.error("Error during transformation:", error);
  }
};

module.exports = transformData;
