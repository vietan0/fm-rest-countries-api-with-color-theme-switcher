import { Container } from '@mui/material';
import { useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import Searchbar from '../components/Searchbar';
import CountryCard from '../components/CountryCard';
import { CountriesContext } from '../CountriesContext';

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const { countries } = useContext(CountriesContext);
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
  return (
    <Container
      maxWidth="lg"
      sx={{
        marginY: '2rem',
      }}
    >
      <Searchbar
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
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
  );
}
