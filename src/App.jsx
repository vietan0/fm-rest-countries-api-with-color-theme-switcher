import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
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
      </main>
    </ThemeProvider>
  );
}
