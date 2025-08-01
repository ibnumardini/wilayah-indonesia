const { writeToFile, readFromFile } = require("./helper/file");
const { titleCase } = require("./helper/string");

const transformData = async () => {
  try {
    const dataRawPath = "./data/raw";
    const dataPath = "./data/transformed";

    const provinces = await readFromFile(`${dataRawPath}/1-provinces.json`);
    if (!provinces) {
      console.log("Provinces data not found");
      return;
    }

    const transformedProvinces = provinces.map((province) => ({
      code: province.kode_bps,
      name: titleCase(province.nama_bps),
    }));

    writeToFile(`${dataPath}/1-provinces.json`, transformedProvinces);

    const regencies = await readFromFile(`${dataRawPath}/2-regencies.json`);
    if (!regencies) {
      console.log("Regencies data not found");
      return;
    }

    const transformedRegencies = regencies.map((regency) => ({
      code: regency.kode_bps,
      name: titleCase(regency.nama_bps),
      province_code: regency.kode_bps.slice(0, 2),
    }));

    writeToFile(`${dataPath}/2-regencies.json`, transformedRegencies);

    const districts = await readFromFile(`${dataRawPath}/3-districts.json`);
    if (!districts) {
      console.log("Districts data not found");
      return;
    }

    const transformedDistricts = districts.map((district) => ({
      code: district.kode_bps,
      name: titleCase(district.nama_bps),
      regency_code: district.kode_bps.slice(0, 4),
    }));

    writeToFile(`${dataPath}/3-districts.json`, transformedDistricts);

    const subdistricts = await readFromFile(
      `${dataRawPath}/4-subdistricts.json`
    );
    if (!subdistricts) {
      console.log("Subdistricts data not found");
      return;
    }

    const transformedSubdistricts = subdistricts.map((subdistrict) => ({
      code: subdistrict.kode_bps,
      name: titleCase(subdistrict.nama_bps),
      district_code: subdistrict.kode_bps.slice(0, 7),
    }));

    writeToFile(`${dataPath}/4-subdistricts.json`, transformedSubdistricts);

    const postcodes = await readFromFile(`${dataRawPath}/5-postcodes.json`);
    if (!postcodes) {
      console.log("Postcodes data not found");
      return;
    }

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
