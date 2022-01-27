import React from 'react';

import { Link, Outlet } from 'react-router-dom';

const CountriesList = ({ countries }) => {
  return <>
    {/* <!-- Countries List (Bootstrap column) --> */}
    <div className="col-5" style={{maxHeight: '90vh', overflow: 'scroll'}}>
      <h2>Countries' List</h2>
      <div className="list-group">
        {countries && countries.map(country => {
          // constructing the url for the flag after the alpha2Code info
          const flagUrl = `https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`;
          return (
            <Link to={country.alpha3Code}
                  key={country.alpha3Code}
                  className="list-group-item list-group-item-action" >
              <img src={flagUrl} alt="country flag" />
              <p>{country.name.common}</p>
            </Link>
          );
        })}
      </div>
    </div>

    <div className="col-7">
      <Outlet />
    </div>

  </>;
};

export default CountriesList;
