const pLimit = require("p-limit");

const { writeToFile } = require("./helper/file");

const urlRegion = "https://sig.bps.go.id/rest-bridging/getwilayah";
const urlPos = "https://sig.bps.go.id/rest-bridging-pos/getwilayah";

const levels = {
  1: "provinsi",
  2: "kabupaten",
  3: "kecamatan",
  4: "desa",
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

    const districts = await Promise.all(
      provinces.map((province) => limit(() => yield(2, province.kode_bps)))
    );

    writeToFile(`${dataPath}/2-districts.json`, districts.flat());

    const subdistricts = await Promise.all(
      districts
        .flat()
        .map((district) => limit(() => yield(3, district.kode_bps)))
    );

    writeToFile(`${dataPath}/3-subdistricts.json`, subdistricts.flat());

    const villages = await Promise.all(
      subdistricts
        .flat()
        .map((subdistrict) => limit(() => yield(4, subdistrict.kode_bps)))
    );

    writeToFile(`${dataPath}/4-villages.json`, villages.flat());

    const postcodes = await Promise.all(
      provinces.map((province) =>
        limit(() => yield(4, province.kode_bps, true))
      )
    );

    writeToFile(`${dataPath}/5-postcodes.json`, postcodes.flat());
  } catch (error) {
    console.error(error);
  }
};

module.exports = fetchData;
