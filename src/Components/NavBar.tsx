import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
// import MenuIcon from "@mui/icons-material/Menu";
const theme = createTheme({
  typography: {
    fontFamily: "Press Start 2P",
  },
});

export default function ButtonAppBar() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative" className="full-width-app-bar">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography className="pikaza-navbar" variant="h5" component="div" sx={{ flexGrow: 1 }}>
            PIKAZA
          </Typography>
          <Button color="inherit" component={Link} to="/home" variant="outlined">
            HOME
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
