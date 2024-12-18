import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

//import Pages
import Login from "./components/AuthForm/LogIn.tsx";
import SignUp from "./components/AuthForm/SignUp.tsx";
import AmutahProfilePage from "./pages/AmutahProfilePage.tsx";
import VolunteerHome from "./pages/VolunteerHome.tsx";
import PageLayout from "./components/PageComponents/PageLayout.tsx";

function App() {
    return (
        <PageLayout>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<SignUp />} />
                <Route path="/Amutah-profile" element={<AmutahProfilePage />} />
                <Route path="/Volunteer-home" element={<VolunteerHome />} />
            </Routes>
        </PageLayout>
    );
}

function Root() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default Root;
