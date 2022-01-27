import './App.css';

import { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';

// import countries from './countries.json';
import axios from 'axios';

function App() {

  // create state for rest-countries
  const [restCountries, setRestCountries] = useState([]);
  // getting the restCountries with help of useEffect (run only once)
  useEffect(() => {
    // Get the project by id from the server
    axios.get('https://ih-countries-api.herokuapp.com/countries')
      .then((response) => {
        response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setRestCountries(response.data);
      })
  }, []);

  return (
    <div className="App">
      <Navbar />

      {/* <!-- Bootstrap container wrapper div --> */}
      <div className="container">
        {/* <!-- Bootstrap row wrapper div --> */}
        <div className="row">
          <Routes>
            <Route path='/' element={<CountriesList countries={restCountries} />} >
              <Route path=':id' element={<CountryDetails countries={restCountries} />} />
            </Route>
          </Routes>
        </div>
      </div>

    </div>
  );
}

export default App;
