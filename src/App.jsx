import { createTheme, ThemeProvider, CssBaseline, Typography, Link } from '@mui/material';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { lightTheme, darkTheme } from './themes';
import Nav from './components/Nav';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';

export default function App() {
  // theming
  const [theme, setTheme] = useState(
    // find browser's preference first
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );
  const themeObj = createTheme(theme === 'light' ? lightTheme : darkTheme);

  return (
    <ThemeProvider theme={themeObj}>
      <CssBaseline />
      <main className="App">
        <Typography
          variant="h1"
          className="sr-only"
        >
          REST Countries API with color theme switcher - Frontend Mentor Challenge - Solution by
          Viet An
        </Typography>
        <Nav
          theme={theme}
          setTheme={setTheme}
        />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/countries/:name"
            element={<CountryPage />}
          />
        </Routes>
        <Typography
          align="center"
          className="attribution"
          padding={2}
          fontSize={14}
        >
          Challenge by{' '}
          <Link
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            rel="noreferrer"
          >
            Frontend Mentor
          </Link>
          <Link
            href="https://github.com/vietan0"
            target="_blank"
            rel="noreferrer"
          >
            Việt An
          </Link>
        </Typography>
      </main>
    </ThemeProvider>
  );
}
