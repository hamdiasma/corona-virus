import React from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import Countrys from "./components/Countrys/Countrys";
import { fetchData } from "./api/index";
import styles from "./App.module.css";
import Logo from "./assets/th.jpg";
import Footer from "./components/footer/Footer";
import Bounce from 'react-reveal/Bounce';

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }

  handelCounrtrieChange = async (country) => {
    const fetchDATA = await fetchData(country);
    console.log(fetchDATA);
    this.setState({ data: fetchDATA, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img src={Logo} alt="corona-virus" className={styles.image} />
        <Bounce  left cascade>
          {country ? (
            <div className={styles.titleSate}>Current State in {country}</div>
          ) : (
            <div className={styles.titleSate}>World Statistics</div>
          )}
        </Bounce >
        <Cards data={data} />

        <Countrys handelCounrtrieChange={this.handelCounrtrieChange} />
        <Chart data={data} country={country} />
        <Footer />
      </div>
    );
  }
}

export default App;
