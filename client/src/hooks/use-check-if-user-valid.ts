// import { useNavigate } from "react-router-dom";
// import { validateToken } from "@/api/userAPI";
// import { validateOrganizationToken } from "../../src/api/organizationAPI";
// import { useDispatch } from "react-redux";
// import { setUser } from "../store/slices/userSlice";

// // הגדרת סוג עבור הנתונים המוחזרים מ-isUserValid
// interface AuthResponse {
//   userLogout: boolean;
//   username: string;
// }

// export async function useCheckIfUserValid(): Promise<void> {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   try {
//     const dataAuth: AuthResponse = await validateToken();

//     if (dataAuth.userLogout) {
//       navigate("/");
//     } else {
//       dispatch(setUser(dataAuth.user));
//     }
//   } catch (error) {
//     console.error("Failed to validate user:", error);
//   }
// }
