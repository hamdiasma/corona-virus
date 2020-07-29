import React, { useState, useEffect } from "react";

import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchCountries } from "../../api/index";
import styles from "./Countrys.module.css";
const Countrys = ({ handelCounrtrieChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };
    fetchAPI();
  }, [setCountries]);

  return (
    <FormControl className={styles.formcontrole}>
      <NativeSelect onChange={(e) => handelCounrtrieChange(e.target.value)}>
        <option value="">Global</option>
        {countries.map((countrie, index) => (
          <option key={index} value={countrie}>
            {countrie}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Countrys;
