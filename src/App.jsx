import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Container,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { lightTheme, darkTheme } from './themes';
import Nav from './components/Nav';
import CountryCard from './components/CountryCard';
import Toolbar from './components/Toolbar';

export default function App() {
  // theming
  const [theme, setTheme] = useState('light');
  const themeObj = createTheme(theme === 'light' ? lightTheme : darkTheme);

  // loading data
  const [countries, setCountries] = useState(JSON.parse(localStorage.getItem('countries')) || []);
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        // localStorage.setItem('countries', JSON.stringify(data));
      });
  }, []);

  const [selectedRegion, setSelectedRegion] = useState('');
  const filteredCountries = countries.filter((country) => {
    if (selectedRegion === '') return country;
    return country.region === selectedRegion;
  });

  const countryCards = filteredCountries.slice(0, 20).map((countryObj) => (
    <CountryCard
      commonName={countryObj.name.common}
      population={countryObj.population}
      region={countryObj.region}
      capital={countryObj.capital}
      flagImg={countryObj.flags.png}
      key={nanoid()}
    />
  ));

  console.log('App rendered!');

  return (
    <MuiThemeProvider theme={themeObj}>
      <CssBaseline />
      <main className="App">
        <Nav
          theme={theme}
          setTheme={setTheme}
        />
        <Container
          maxWidth="lg"
          sx={{
            marginY: '2rem',
          }}
        >
          <Toolbar selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
          <Container
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              columnGap: '3rem',
              rowGap: '3rem',
              '@media (min-width: 600px)': {
                padding: '0',
              },
            }}
          >
            {countryCards}
          </Container>
        </Container>
      </main>
    </MuiThemeProvider>
  );
}
