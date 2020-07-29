import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changebleURL = url;
  if (country) {
    changebleURL = `${url}/countries/${country}`;
  }
  try {
    const response = await axios.get(changebleURL);
    const data = await response.data;
    const { confirmed, recovered, deaths, lastUpdate } = data;
    const modifieData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
    return modifieData;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchDailydata = async () => {
  try {
    const response = await axios.get(`${url}/daily`);
    const data = await response.data;
    const modifieData = await data.map((dayliData) => ({
      confirmed: dayliData.confirmed.total,
      deaths: dayliData.deaths.total,
      date: dayliData.reportDate,
    }));
    return modifieData;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${url}/countries`);
    const data = await response.data.countries;
    const countries = data.map((countrie) => countrie.name);
    return countries;
  } catch (error) {}
};
