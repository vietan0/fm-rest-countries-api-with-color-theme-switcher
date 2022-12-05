import { Container, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import Searchbar from '../components/Searchbar';
import CountryCard from '../components/CountryCard';
import { CountriesContext } from '../CountriesContext';
import pagination from '../pagination';

export default function Home() {
  const { countries } = useContext(CountriesContext);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isFilteredByUnMember, setIsFilteredByUnMember] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 20;

  const countriesToBeRendered = useMemo(
    () =>
      countries
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
        }),
    [selectedRegion, isFilteredByUnMember, sortBy, currentPage],
  );
  const pages = pagination(countriesToBeRendered, cardsPerPage);
  const countryCards = useMemo(
    () =>
      pages[currentPage - 1].map((countryObj) => (
        <CountryCard
          commonName={countryObj.name.common}
          population={countryObj.population}
          region={countryObj.region}
          capital={countryObj.capital}
          flagImg={countryObj.flags.svg}
          key={nanoid()}
        />
      )),
    [countriesToBeRendered],
  );

  const pagiBar = (
    <Stack spacing={1}>
      <Typography align="center">
        Showing {cardsPerPage} countries out of {countriesToBeRendered.length}
      </Typography>
      <Pagination
        count={pages.length}
        page={currentPage}
        size="large"
        variant="outlined"
        showFirstButton
        showLastButton
        onChange={(event, page) => {
          setCurrentPage(page);
          window.scrollTo(0, 0);
        }}
        sx={{ '> ul': { justifyContent: 'center' } }}
      />
    </Stack>
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginY: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        '@media (min-width: 600px)': {
          paddingLeft: '2rem',
          paddingRight: '2rem',
        },
      }}
    >
      <Searchbar
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        isFilteredByUnMember={isFilteredByUnMember}
        setIsFilteredByUnMember={setIsFilteredByUnMember}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setCurrentPage={setCurrentPage}
      />
      {pagiBar}
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          columnGap: '3rem',
          rowGap: '3rem',
        }}
      >
        {countryCards}
      </Container>
      {pagiBar}
    </Container>
  );
}
