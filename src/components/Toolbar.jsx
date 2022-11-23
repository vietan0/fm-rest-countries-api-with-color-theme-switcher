import {
  Box, Button, Menu, MenuItem, TextField, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from 'react';
import { string, func } from 'prop-types';

export default function Toolbar({ selectedRegion, setSelectedRegion }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const selectRegion = (e) => {
    setSelectedRegion(e.target.textContent);
    handleClose();
  };
  const reset = () => {
    setSelectedRegion('');
  };

  console.log('Toolbar rendered!');
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '2rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        <TextField
          id="input-with-sx"
          label="Search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        {selectedRegion && (
          <Button
            variant="outlined"
            onClick={reset}
            disableRipple
          >
            Reset
          </Button>
        )}
        <Button
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          startIcon={<FilterAltIcon />}
          disableRipple
        >
          Filter By Region
        </Button>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={selectRegion}>Africa</MenuItem>
          <MenuItem onClick={selectRegion}>Americas</MenuItem>
          <MenuItem onClick={selectRegion}>Asia</MenuItem>
          <MenuItem onClick={selectRegion}>Europe</MenuItem>
          <MenuItem onClick={selectRegion}>Oceania</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

Toolbar.propTypes = {
  selectedRegion: string.isRequired,
  setSelectedRegion: func.isRequired,
};
