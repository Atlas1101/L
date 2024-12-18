// // Components/Logout.js
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logOut } from "../../utils/userApi";
// import { clearUser } from "../../store/slices/userSlice";
// import Cookies from "js-cookie";

// const Logout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const response = await logOut();

//       if (response.message === "Successfully logged out.") {
//         Cookies.remove("jwt");

//         dispatch(clearUser());

//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// };

// export default Logout;

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token cookie (simulating logout)
        Cookies.remove("jwt");

        // Optionally clear any user-related data here if stored in frontend state
        console.log("User logged out");

        // Redirect to login page
        navigate("/login");
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
