import { useContext } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  Button, Container, Grid, Stack, Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CountriesContext } from '../CountriesContext';

export default function CountryPage() {
  const params = useParams();
  const { countries } = useContext(CountriesContext);
  const found = countries.find((country) => country.name.common === params.name);

  const borderCountriesLinks = found.borders
    && found.borders.map((cca3) => {
      const countryObj = countries.find((country) => country.cca3 === cca3);
      return (
        <Button
          to={`/countries/${countryObj.name.common}`}
          component={RouterLink}
          variant="outlined"
          sx={{ marginRight: '1rem' }}
        >
          {cca3}
        </Button>
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
        onClick={() => nav('/')}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        disableRipple
      >
        Back to Countries
      </Button>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={6}
        sx={{
          marginTop: '2rem',
          '> *': {
            flexGrow: '1',
          },
        }}
      >
        <Grid
          item
          xs={12}
          sm={7}
        >
          <img
            src={found.flags.svg}
            alt={`${found.name.common}'s flag`}
          />
        </Grid>
        <Grid
          item
          xs
          sm
        >
          <Stack spacing={2}>
            <Typography
              component="h1"
              variant="h3"
            >
              {found.name.common}
            </Typography>
            <Stack spacing={4}>
              <Stack
                direction={{ sm: 'column', md: 'row' }}
                spacing={2}
              >
                <Stack spacing={1}>
                  <Typography>
                    <Typography
                      component="span"
                      sx={{ fontWeight: '600', display: 'inline-block' }}
                    >
                      Native Name:
                    </Typography>
                    {' '}
                    {Object.values(Object.values(found.name.nativeName)[0])[0]}
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
                </Stack>
                <Stack spacing={1}>
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
                </Stack>
              </Stack>
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
        </Grid>
      </Grid>
    </Container>
  );
}
