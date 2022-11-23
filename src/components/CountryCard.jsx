import {
  Typography, Box, Card, CardContent,
} from '@mui/material';
import {
  array, number, oneOfType, string,
} from 'prop-types';

export default function CountryCard({
  commonName, population, region, capital, flagImg,
}) {
  return (
    <Card
      elevation={6}
      sx={{
        minWidth: '240px',
      }}
    >
      <CardContent
        sx={{
          padding: '0',
        }}
      >
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
              Population:
            </Typography>
            {' '}
            {population}
          </Typography>
          <Typography>
            <Typography
              component="span"
              sx={{ fontWeight: '600', display: 'inline-block' }}
            >
              Region:
            </Typography>
            {' '}
            {region}
          </Typography>
          <Typography>
            <Typography
              component="span"
              sx={{ fontWeight: '600', display: 'inline-block' }}
            >
              Capital:
            </Typography>
            {' '}
            {capital}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

CountryCard.propTypes = {
  commonName: string.isRequired,
  population: number.isRequired,
  region: string.isRequired,
  capital: oneOfType([string, array]),
  flagImg: string.isRequired,
};

CountryCard.defaultProps = {
  capital: undefined,
};
