import './App.css';
import Cards from './components/Cards/Cards';
import Chart from './components/Charts/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import styles from './App.module.css';
import { fetchData } from './api/index';
import { useEffect, useState } from 'react';
import coronaImage from './images/image.png';

function App() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState('');
  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  const handleCountryChange = async (country) => {
    await setCountry(country);

    const fetchedData = await fetchData(country);
    await setData(fetchedData);
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt="Corona Image" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
