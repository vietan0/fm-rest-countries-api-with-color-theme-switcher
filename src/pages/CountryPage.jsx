import { useContext } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  Button, Container, Link, Stack, Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CountriesContext } from '../CountriesContext';

export default function CountryPage() {
  const params = useParams();
  const { countries } = useContext(CountriesContext);
  const found = countries.find((country) => country.name.common === params.name);
  console.log(found.population);

  const borderCountriesLinks = found.borders.map((cca3) => {
    const countryObj = countries.find((country) => country.cca3 === cca3);
    return (
      <Link
        to={`/countries/${countryObj.name.common}`}
        component={RouterLink}
        underline="hover"
        sx={{ marginRight: '1rem' }}
      >
        {cca3}
      </Link>
    );
  });
  const nav = useNavigate();

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginY: '2rem',
      }}
      className="countryPage"
    >
      <Button
        onClick={() => nav(-1)}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        disableRipple
      >
        Back
      </Button>
      <Stack
        direction={{ sm: 'column', md: 'row' }}
        spacing={6}
        sx={{
          marginTop: '2rem',
          '> *': {
            flexGrow: '1',
          },
        }}
      >
        <img
          src={found.flags.svg}
          alt={`${found.name.common}'s flag`}
        />
        <Stack spacing={2}>
          <Typography
            component="h1"
            variant="h3"
          >
            {found.name.common}
          </Typography>
          <Stack>
            <Typography>
              <Typography
                component="span"
                sx={{ fontWeight: '600', display: 'inline-block' }}
              >
                Native Name:
              </Typography>
              {' '}
              {JSON.stringify(Object.values(Object.values(found.name.nativeName)[0])[0])}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{ fontWeight: '600', display: 'inline-block' }}
              >
                Population:
              </Typography>
              {' '}
              {found.population}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{ fontWeight: '600', display: 'inline-block' }}
              >
                Region:
              </Typography>
              {' '}
              {found.region}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{ fontWeight: '600', display: 'inline-block' }}
              >
                Subregion:
              </Typography>
              {' '}
              {found.subregion}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{ fontWeight: '600', display: 'inline-block' }}
              >
                Top Level Domain:
              </Typography>
              {' '}
              {found.tld[0]}
            </Typography>
            <Typography component="pre">
              <Typography
                component="span"
                sx={{ fontWeight: '600', display: 'inline-block' }}
              >
                Currencies:
              </Typography>
              {' '}
              {Object.keys(found.currencies)[0]}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{ fontWeight: '600', display: 'inline-block' }}
              >
                Language:
              </Typography>
              {' '}
              {Object.values(found.languages)[0]}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{ fontWeight: '600', display: 'inline-block' }}
              >
                Capital:
              </Typography>
              {' '}
              {found.capital[0]}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{ fontWeight: '600', display: 'inline-block' }}
              >
                Bordering countries:
              </Typography>
              {' '}
              {borderCountriesLinks}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
