/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  useTheme, AppBar, Button, Link, Toolbar, Typography,
} from '@mui/material';
import { string, func } from 'prop-types';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link as RouterLink } from 'react-router-dom';

export default function Nav({ theme, setTheme }) {
  const appBarBg = useTheme().palette.background.default;
  const appBarText = useTheme().palette.text.primary;

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: appBarBg, color: appBarText }}
    >
      <Toolbar sx={{ marginX: '3rem', justifyContent: 'space-between' }}>
        <Link
          component={RouterLink}
          to="/"
          variant="h6"
          underline="hover"
          sx={{
            fontWeight: '800',
            letterSpacing: '-0.5px',
            lineHeight: '110%',
            marginRight: 'auto',
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
