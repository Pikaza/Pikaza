import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import pikachu from '/images/itus.webp';

export default function ButtonAppBar() {
  return (
    <AppBar position="relative" className="full-width-app-bar">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <img id="navbar-pika" src={pikachu} />
        </IconButton>

        <Typography
          className="pikaza-navbar"
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          PIKAZA
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/addQuestion"
          variant="outlined"
        >
          ADD QUESTION
        </Button>
        {/* <Button color="inherit" component={Link} to="/home" variant="outlined">
          HOME
        </Button> */}
      </Toolbar>
    </AppBar>
  );
}
