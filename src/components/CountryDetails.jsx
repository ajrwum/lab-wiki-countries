import React from 'react';

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

const CountryDetails = ({ countries }) => {

  // getting the country's id from params
  const id = useParams().id;
  console.log('id :>> ', id);

  // getting the country and eventual border countries after the id (when using the static json file)
  // const country = countries.find(c => c.alpha3Code === id);

  // create state for rest-country
  const [fetching, setFetching] = useState(true);
  const [country, setCountry] = useState({});
  // getting the country with help of useEffect (run each time the id changes)
  useEffect(() => {
    // Get the project by id from the server
    axios.get(`https://ih-countries-api.herokuapp.com/countries/${id}`)
    .then((response) => {
      console.log('--- - response.data', response.data);
      setCountry(response.data);
      setFetching(false);
    })
  }, [id]);
  
  // some init for future country display
  let borderCountries = [];
  // getting the eventual border countries
  country.borders && country.borders.forEach(border => {
    const cntr = countries.find(c => c.alpha3Code === border);
    borderCountries.push({code: border, name: cntr.name.common});
  });

  
  return <>
    <h2>Country's Details</h2>
    {/* <!-- Country Details (Bootstrap column) --> */}

    {/* temporary display in case the fetch takes more time than expected */}
    {fetching && <p>Loading country's data...</p>}

    {/* protection before display to be sure to have the necessary data for remaining operations */}
    {!fetching &&
    <>
      <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
            alt="country flag"
            style={{width: '300px'}}/>
      <h3>{country.name.common}</h3>
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{width: '30%'}}>Capital</td>
            <td>{country.capital[0]}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {country.area} km <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
            {
              borderCountries.length > 0
              ? (
                <ul>
                  {borderCountries && borderCountries.map(c => {
                    return (
                      <p key={c.code}>
                        <Link to={`/${c.code}`} >{c.name}</Link>
                      </p>
                    )})
                  }
                </ul>  
              )
              : (
                <p>No border country</p>
              )
            }
            </td>
          </tr>
        </tbody>
      </table>
    </>
    }
  </>;
};

export default CountryDetails;
