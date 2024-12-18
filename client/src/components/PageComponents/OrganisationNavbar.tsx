// NavBar.js

import * as React from "react";
import { Link } from "react-router-dom";

// material mui imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import DeleteUser from "./DeleteUser.tsx";
import Logout from "./Logout.tsx";

import logo from "../../assets/logo.jpg";

const pages = ["Home", "Chats", "New Event", "About"];
const settings = ["Profile", "Logout", "DeleteUser"];

function OrganisationNavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position="fixed"
            sx={{ bgcolor: "hsl(196, 100%, 98%)", top: 0, width: "100%" }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        src={logo}
                        alt="Logooo"
                        sx={{
                            maxHeight: "60px",
                            maxWidth: "100%",
                            objectFit: "contain",
                            display: { xs: "none", md: "flex" }, // Responsive display
                            mr: 1, // Margin-right
                        }}
                    />

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 900,
                            letterSpacing: ".3rem",
                            color: "hsl(0, 0.00%, 0.00%)",
                            textDecoration: "none",
                            fontSize: "1.5rem",
                        }}
                    >
                        Linkind
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="black"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    component={Link}
                                    to={`/${page
                                        .toLowerCase()
                                        .replace(" ", "-")}`}
                                >
                                    <Typography sx={{ textAlign: "center" }}>
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        component="img"
                        src={logo}
                        alt="Logooo"
                        sx={{
                            maxHeight: "60px",
                            maxWidth: "100%",
                            objectFit: "contain",
                            display: { xs: "flex", md: "none" },
                            mr: 1,
                            my: 1,
                        }}
                    />

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".1rem",
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        Linkind
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to={`/${page.toLowerCase().replace(" ", "-")}`}
                                sx={{
                                    my: 2,
                                    color: "black",
                                    display: "block",
                                    fontWeight: "700",
                                    fontSize: "15px",
                                    spacing: "100px",
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="oemy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                    component={Link}
                                    to={
                                        setting === "Logout"
                                            ? "/login"
                                            : setting === "DeleteUser"
                                            ? "/login"
                                            : `/${setting
                                                  .toLowerCase()
                                                  .replace(" ", "-")}`
                                    }
                                >
                                    {setting === "Logout" ? (
                                        <Logout />
                                    ) : setting === "DeleteUser" ? (
                                        <DeleteUser />
                                    ) : (
                                        <Typography
                                            sx={{ textAlign: "center" }}
                                        >
                                            {setting}
                                        </Typography>
                                    )}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default OrganisationNavBar;
