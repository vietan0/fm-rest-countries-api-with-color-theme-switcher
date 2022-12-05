import { Typography, Box, Card, CardActionArea, CardContent, Link } from '@mui/material';
import { array, number, oneOfType, string } from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

export default function CountryCard({ commonName, population, region, capital, flagImg }) {
  return (
    <Link
      to={`/countries/${commonName}`}
      underline="none"
      component={RouterLink}
    >
      <Card
        elevation={6}
        sx={{ minWidth: '240px' }}
        className="countryCard"
      >
        <CardActionArea>
          <CardContent sx={{ padding: '0' }}>
            <img
              src={flagImg}
              alt={`${commonName}'s flag`}
            />
            <Box sx={{ padding: '1.5rem' }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ fontWeight: '800' }}
              >
                {commonName}
              </Typography>
              <Typography>
                <Typography
                  component="span"
                  sx={{ fontWeight: '600', display: 'inline-block' }}
                >
                  Capital:
                </Typography>{' '}
                {capital}
              </Typography>
              <Typography>
                <Typography
                  component="span"
                  sx={{ fontWeight: '600', display: 'inline-block' }}
                >
                  Region:
                </Typography>{' '}
                {region}
              </Typography>
              <Typography>
                <Typography
                  component="span"
                  sx={{ fontWeight: '600', display: 'inline-block' }}
                >
                  Population:
                </Typography>{' '}
                {population}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

CountryCard.propTypes = {
  commonName: string.isRequired,
  population: number.isRequired,
  region: string.isRequired,
  capital: oneOfType([string, array]),
  flagImg: string.isRequired,
};

CountryCard.defaultProps = { capital: undefined };
