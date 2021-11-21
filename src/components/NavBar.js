import { Link } from "react-router-dom";

import {AppBar, Toolbar, Typography, IconButton, Button} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import theme from "./themes/theme";

const NavBar = () => {

    return (
        <AppBar position="static" color="primary" /*iconElementLeft = {<img src='header-logo.png' alt="Logo" />}*/>
            <Toolbar>
                <IconButton color="inherit" component={Link} to="/">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div" style={{ flex: 1, textAlign: 'left' }}>
                    Custom Form Builder
                </Typography>
                <Button component={Link} color="inherit" to="/about">About</Button>
                <Button component={Link} color="inherit" to="/forms">Forms</Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;