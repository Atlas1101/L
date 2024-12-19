import { useSelector } from "react-redux";
import { RootState } from "../../store/index.ts";
import VolunteerNavbar from "./VolunteerNavbar.tsx";
import OrganizationNavbar from "./OrganisationNavbar.tsx";

const Navbar = () => {
    const userType = useSelector((state: RootState) => state.user.userType);

    return (
        <>
            {userType === "volunteer" && <VolunteerNavbar />}
            {userType === "organization" && <OrganizationNavbar />}
            {userType === "" && <VolunteerNavbar />} {/* Optional fallback */}
        </>
    );
};

export default Navbar;
