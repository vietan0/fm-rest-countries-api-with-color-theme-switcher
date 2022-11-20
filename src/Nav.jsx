import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { string, func } from 'prop-types';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Nav({ theme, setTheme }) {
  const appBarBg = useTheme().palette.background.default;
  const appBarText = useTheme().palette.text.primary;
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: appBarBg, color: appBarText }}
    >
      <Toolbar sx={{ marginX: '3rem' }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: '800', marginRight: 'auto' }}
        >
          Where in the world?
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        >
          {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          {' '}
          <Typography
            component="span"
            sx={{ fontSize: '0.85rem', marginLeft: '0.5rem' }}
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
