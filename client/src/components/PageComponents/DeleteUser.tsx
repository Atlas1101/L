//

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const DeleteUser = () => {
    const navigate = useNavigate();

    const handleDelete = () => {
        // Simulate user deletion by removing the token cookie
        Cookies.remove("jwt");

        // Optionally clear any user-related frontend state if necessary
        console.log("User and related data deleted.");

        // Redirect to login page after deletion
        navigate("/login");
    };

    return <button onClick={handleDelete}>Delete User</button>;
};

export default DeleteUser;
