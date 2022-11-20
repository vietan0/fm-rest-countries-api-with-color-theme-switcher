import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import CountryCard from './CountryCard';
import { lightTheme, darkTheme } from './themes';
import Nav from './Nav';

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
        console.log(data);
      });
  }, []);
  const [selectedRegion, setSelectedRegion] = useState('');
  const filteredCountries = countries.filter((country) => {
    if (selectedRegion === '') return country;
    return country.region === selectedRegion;
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const selectRegion = (e) => {
    setSelectedRegion(e.target.textContent);
    handleClose();
  };
  const reset = () => {
    setSelectedRegion('');
  };

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

  return (
    <MuiThemeProvider theme={themeObj}>
      <CssBaseline />
      <main className="App">
        <Nav theme={theme} setTheme={setTheme} />
        <Container
          maxWidth="lg"
          sx={{
            marginY: '2rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '3rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                padding: '1rem',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <SearchIcon />
              <TextField
                id="input-with-sx"
                label="Search"
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              {selectedRegion && <Button variant="outlined" onClick={reset}>Reset</Button>}
              <Button
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Filter By Region
              </Button>
              <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
              >
                <MenuItem onClick={selectRegion}>Africa</MenuItem>
                <MenuItem onClick={selectRegion}>Americas</MenuItem>
                <MenuItem onClick={selectRegion}>Asia</MenuItem>
                <MenuItem onClick={selectRegion}>Europe</MenuItem>
                <MenuItem onClick={selectRegion}>Oceania</MenuItem>
              </Menu>
            </Box>
          </Box>
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
