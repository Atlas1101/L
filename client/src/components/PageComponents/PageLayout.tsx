import Box from "@mui/material/Box";

import { useLocation } from "react-router-dom";
import NavBar from "./Navbar.tsx";

import { styled } from "@mui/material/styles";

const Offset = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar, // Get height from theme
    width: "100%", // Ensure full width
}));
const PageLayout = ({ children }) => {
    const location = useLocation();
    const noNav = ["/login", "/signup", "/"];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100vh",
                // border: "5px solid red",
                bgcolor: "green",
            }}
        >
            {!noNav.includes(location.pathname) && (
                <>
                    <NavBar />
                    <Offset
                        sx={{ border: "1px solid green", width: "100%" }}
                    />{" "}
                </>
            )}

            <Box
                sx={{
                    flexGrow: 1, // Ensure it fills available space
                    display: "flex", // Enable Flexbox for alignment
                    justifyContent: "center", // Center content horizontally
                    alignItems: "center", // Center content vertically
                    width: "100%", // Full width

                    boxSizing: "border-box", // Prevent padding overflow
                    textAlign: "center", // Optional: Center text inside content
                    bgcolor: " hsl(196, 100%, 98%)",
                    // border: "5px solid green",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default PageLayout;
