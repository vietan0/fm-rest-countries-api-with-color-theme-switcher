/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { string, func } from 'prop-types';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Nav({ theme, setTheme }) {
  const appBarBg = useTheme().palette.background.default;
  const appBarText = useTheme().palette.text.primary;

  console.log('Nav rendered!');
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: appBarBg, color: appBarText }}
    >
      <Toolbar sx={{ marginX: '3rem' }}>
        <Link
          href="#"
          variant="h6"
          underline="hover"
          sx={{
            fontWeight: '800', letterSpacing: '-0.5px', lineHeight: '110%', marginRight: 'auto',
          }}
        >
          Where in the world?
        </Link>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          startIcon={theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          disableRipple
        >
          <Typography
            component="span"
            sx={{ fontSize: '0.85rem' }}
          >
            {theme === 'light' ? 'dark' : 'light'}
            {' '}
            Mode
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

Nav.propTypes = {
  theme: string.isRequired,
  setTheme: func.isRequired,
};
