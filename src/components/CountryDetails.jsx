import React from 'react';

import { Link, useParams } from 'react-router-dom';

const CountryDetails = ({ countries }) => {
  // getting the country's id from params
  const id = useParams().id;
  // getting the country and eventual border countries after the id
  const country = countries.find(c => c.alpha3Code === id);
  let borderCountries = [];
  country.borders && country.borders.forEach(border => {
    const c = countries.find(country => country.alpha3Code === border);
    borderCountries.push({code: border, name: c.name.common});
  });


  return <>
    <h2>Country Details</h2>
    {/* <!-- Country Details (Bootstrap column) --> */}
    <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt="country flag" style={{width: '300px'}}/>
    {/* <img src={`https://restcountries.eu/data/${country.alpha3Code}.svg`} alt="country flag" style={{width: '300px'}}/> */}
    <h1>{country.name.common}</h1>
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
  </>;
};

export default CountryDetails;
