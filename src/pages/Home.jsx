import { Container } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import Searchbar from '../components/Searchbar';
import CountryCard from '../components/CountryCard';
import { CountriesContext } from '../CountriesContext';

export default function Home() {
  const { countries } = useContext(CountriesContext);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isFilteredByUnMember, setIsFilteredByUnMember] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const countryCards = useMemo(
    () => countries
      .slice(0, 30)
      .filter((country) => {
        if (selectedRegion) return country.region === selectedRegion;
        if (isFilteredByUnMember) return country.unMember === true;
        if (country.name.common === 'Antarctica') return false; // not a country
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'Name') return a.name.common > b.name.common;
        if (sortBy === 'Population') return a.population < b.population;
        if (sortBy === 'Area') return a.area < b.area;
        return undefined;
      })
      .map((countryObj) => (
        <CountryCard
          commonName={countryObj.name.common}
          population={countryObj.population}
          region={countryObj.region}
          capital={countryObj.capital}
          flagImg={countryObj.flags.svg}
          key={nanoid()}
        />
      )),
    [selectedRegion, isFilteredByUnMember, sortBy],
  );

  return (
    <Container
      maxWidth="lg"
      sx={{ marginY: '2rem' }}
    >
      <Searchbar
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        isFilteredByUnMember={isFilteredByUnMember}
        setIsFilteredByUnMember={setIsFilteredByUnMember}
        sortBy={sortBy}
        setSortBy={setSortBy}
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
