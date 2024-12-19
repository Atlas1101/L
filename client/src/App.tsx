import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//import Pages
import Login from "./components/AuthForm/LogIn.tsx";
import SignUp from "./components/AuthForm/SignUp.tsx";
import VolunteerHome from "./pages/VolunteerHome.tsx";
import OrganizationProfile from "./pages/Organization-profile.tsx";
import UserProfile from "./pages/User-profile.tsx";
import PageLayout from "./components/PageComponents/PageLayout.tsx";
import EventPage from "./pages/Event-page.tsx";
import CreateNewPost from "./pages/CreateNewPost.tsx";
import SearchPage from "./pages/Search-page.tsx";
import ChatComingSoon from "./pages/Chat.tsx";

import UserPage from "./pages/userpage.tsx";
function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/Volunteer-home" element={<VolunteerHome />} />
        <Route path="/User-profile" element={<UserProfile />} />
        <Route path="/Organization-profile" element={<OrganizationProfile />} />
        <Route path="/Event-page/:id" element={<EventPage />} />
        <Route path="/profile/:username" element={<UserPage/>} />{" "}
        {/* עמוד פרופיל חבר */}
        <Route path="/Event-page/:id" element={<EventPage />} />
        <Route path="/Create" element={<CreateNewPost />} />
        <Route path="/Search" element={<SearchPage />} />
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
