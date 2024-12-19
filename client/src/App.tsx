import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

//import Pages
import Login from "./components/AuthForm/LogIn.tsx";
import SignUp from "./components/AuthForm/SignUp.tsx";
import AmutahProfilePage from "./pages/AmutahProfilePage.tsx";
import VolunteerHome from "./pages/VolunteerHome.tsx";
import OrganizationProfile from "./pages/Organization-profile.tsx";
import UserProfile from "./pages/User-profile.tsx";
import PageLayout from "./components/PageComponents/PageLayout.tsx";
import EventPage from "./pages/Event-page.tsx";
import CreateNewPost from "./pages/CreateNewPost.tsx";
import SearchPage from "./pages/Search-page.tsx";

function App() {
    return (
        <PageLayout>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<SignUp />} />
                <Route path="/homev" element={<VolunteerHome />} />

                <Route path="/User-profile" element={<UserProfile />} />

                <Route
                    path="/Organization-profile"
                    element={<OrganizationProfile />}
                />
                <Route path="/event-page/:id" element={<EventPage />} />
                <Route path="/new-event" element={<CreateNewPost />} />
                <Route path="/search" element={<SearchPage />} />
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
