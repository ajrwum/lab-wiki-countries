import './App.css';

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';

import countries from './countries.json';

function App() {
  return (
    <div className="App">
      <Navbar />

      {/* <!-- Bootstrap container wrapper div --> */}
      <div className="container">
        {/* <!-- Bootstrap row wrapper div --> */}
        <div className="row">
          <Routes>
            <Route path='/' element={<CountriesList countries={countries} />} >
              <Route path=':id' element={<CountryDetails countries={countries} />} />
            </Route>
          </Routes>
        </div>
      </div>

    </div>
  );
}

export default App;
