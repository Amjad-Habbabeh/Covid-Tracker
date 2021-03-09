const url = 'https://covid19.mathdro.id/api';
export const fetchData = async (country) => {
  let changebalUrl = url;
  if (country) {
    changebalUrl = `${url}/countries/${country}`;
  }
  try {
    const response = await fetch(changebalUrl);
    const { confirmed, recovered, deaths, lastUpdate } = await response.json();

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {}
};

export const fetchDailyData = async () => {
  try {
    const response = await fetch(`${url}/daily`);
    const data = await response.json();
    const modifyData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifyData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(`${url}/countries`);
    const { countries } = await response.json();
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
