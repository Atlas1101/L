// import { useState } from "react";
// import { useDispatch } from "react-redux";  // Redux
// import { setUser } from "../../store/slices/userSlice"; //Redux
// import { useNavigate } from "react-router-dom";

// import { signIn } from "../../utils/userApi";

// import {
//   Avatar,
//   Box,
//   Container,
//   TextField,
//   Typography,
//   Button,
//   FormControl,
//   IconButton,
//   FilledInput,
//   InputLabel,
//   InputAdornment,
// } from "@mui/material";

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import LoginIcon from "@mui/icons-material/Login";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [usernameInput, setUsernameInput] = useState("");
//   const [passwordInput, setPasswordInput] = useState("");
//   const [usernameError, setUsernameError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [btnText, setBtnText] = useState("Sign In");
//   const [msgText, setMsgText] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const dispatch = useDispatch();  //  Redux
//   const navigate = useNavigate();  // Initialize navigation

//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUsernameError(false);
//     setPasswordError(false);

//     let hasError = false;

//     if (!usernameInput.trim()) {
//       setUsernameError(true);
//       hasError = true;
//     }
//     if (!passwordInput.trim()) {
//       setPasswordError(true);
//       hasError = true;
//     }

//     if (hasError) return;

//     setIsSubmitted(true);
//     setBtnText("Loading...");
//     setMsgText("");

//     try {
//       const response = await signIn({ username: usernameInput, password: passwordInput });

//       if (response.message === "Authentication successful") {
//         dispatch(setUser(response.username,response._id));  // Save username to Redux store

// console.log(response);

//         setTimeout(() => {//nevigate to home
//           navigate("/home");
//         }, 1500);
//         setUsernameInput("");
//         setPasswordInput("");
//       } else {
//         setMsgText(response.error.error);
//       }
//     } catch (error) {
//       setMsgText("An error occurred during login");
//     } finally {
//       setBtnText("Sign In");
//       setIsSubmitted(false);
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Container sx={{ my: 2, padding: 2 }}>
//         <h1>Instagram</h1>
//         <Avatar
//           sx={{
//             mx: "auto",
//             bgcolor: "secondary.main",
//             textAlign: "center",
//             mb: 1,
//           }}
//         >
//           <LockOutlinedIcon />
//         </Avatar>

//         <Typography component="h1" variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
//           Sign In
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             label="Enter username"
//             fullWidth
//             variant="filled"
//             value={usernameInput}
//             onChange={(e) => setUsernameInput(e.target.value)}
//             autoFocus
//             sx={{
//               input: { color: "white" },
//               label: { color: "hsl(0, 0%, 66%)" },
//               mb: 2,
//               bgcolor: "hsl(0, 0%, 7%)",
//               border: 1,
//             }}
//             error={usernameError}
//             helperText={usernameError ? "Username is required" : ""}
//           />
//           <FormControl
//             fullWidth
//             sx={{
//               input: { color: "white" },
//               label: { color: "hsl(0, 0%, 66%)" },
//               mb: 2,
//               bgcolor: "hsl(0, 0%, 7%)",
//               border: 1,
//             }}
//             variant="filled"
//           >
//             <InputLabel error={passwordError} htmlFor="filled-adornment-password">
//               Password
//             </InputLabel>
//             <FilledInput
//               id="filled-adornment-password"
//               type={showPassword ? "text" : "password"}
//               value={passwordInput}
//               error={passwordError}
//               onChange={(e) => setPasswordInput(e.target.value)}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label={showPassword ? "hide the password" : "display the password"}
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff sx={{ color: "white" }} /> : <Visibility sx={{ color: "white" }} />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Password"
//             />
//             {passwordError && <Typography variant="body2" color="error" sx={{ mt: 1 }}>Password is required</Typography>}
//           </FormControl>

//           <Button variant="contained" startIcon={<LoginIcon />} type="submit" fullWidth sx={{ mt: 1 }}>
//             {btnText}
//           </Button>

//           {msgText && <Typography variant="body2" color="error" sx={{ mt: 1 }}>{msgText}</Typography>}

//           {/* Link to Sign Up page */}
//           <Box sx={{ textAlign: "center", mt: 2 }}>
//             <Typography variant="body2">
//               Don't have an account?{" "}
//               <Link to="/signup" style={{ color: "blue" }}>
//                 Sign Up
//               </Link>
//             </Typography>
//           </Box>
//         </Box>
//       </Container>
//     </Container>
//   );
// };

// export default Login;

import { useState } from "react";
import { useDispatch } from "react-redux"; // Redux
import { setUser } from "../../store/slices/userSlice"; // Redux
import { useNavigate } from "react-router-dom"; // Navigation
import { signIn } from "../../utils/userApi.ts"; // API for login
import {
    Avatar,
    Box,
    Container,
    TextField,
    Typography,
    Button,
    FormControl,
    IconButton,
    FilledInput,
    InputLabel,
    InputAdornment,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

// Define types for the API response
interface SignInResponse {
    message: string;
    username?: string;
    _id?: string;
    error?: string;
}

// Define types for the error state
interface Errors {
    username: boolean;
    password: boolean;
}

const Login: React.FC = () => {
    // State for form inputs
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");

    // State for error handling
    const [errors, setErrors] = useState<Errors>({
        username: false,
        password: false,
    });

    // State for password visibility
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // State for button text and message
    const [btnText, setBtnText] = useState<string>("Sign In");
    const [msgText, setMsgText] = useState<string>("");

    const dispatch = useDispatch(); // Redux dispatch
    const navigate = useNavigate(); // Navigation

    // Toggle password visibility
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    // Validate inputs
    const validateInputs = (): boolean => {
        const newErrors: Errors = {
            username: !usernameInput.trim(),
            password: !passwordInput.trim(),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setMsgText("");
        setErrors({ username: false, password: false });

        if (validateInputs()) {
            setBtnText("Loading...");
            try {
                const response: SignInResponse = await signIn({
                    username: usernameInput,
                    password: passwordInput,
                });

                if (response.message === "Authentication successful") {
                    // Dispatch user info to Redux
                    dispatch(
                        setUser({
                            username: response.username!,
                            id: response._id!,
                        })
                    );
                    setMsgText("Login successful!");

                    // Navigate to the home page
                    setTimeout(() => navigate("/home"), 1500);
                } else {
                    setMsgText(
                        response.error || "Login failed. Please try again."
                    );
                }
            } catch (error) {
                console.error("Error during login:", error);
                setMsgText("An error occurred. Please try again.");
            } finally {
                setBtnText("Sign In");
            }
        } else {
            setMsgText("Please fill out all required fields.");
        }
    };

    return (
        <Container maxWidth="xs">
            <Container sx={{ my: 2, padding: 2 }}>
                <h1>Instagram</h1>
                <Avatar
                    sx={{
                        mx: "auto",
                        bgcolor: "secondary.main",
                        textAlign: "center",
                        mb: 1,
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>

                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                    Sign In
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        label="Enter username"
                        fullWidth
                        variant="filled"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        autoFocus
                        sx={{
                            input: { color: "white" },
                            label: { color: "hsl(0, 0%, 66%)" },
                            mb: 2,
                            bgcolor: "hsl(0, 0%, 7%)",
                            border: 1,
                        }}
                        error={errors.username}
                        helperText={
                            errors.username ? "Username is required" : ""
                        }
                    />
                    <FormControl
                        fullWidth
                        sx={{
                            input: { color: "white" },
                            label: { color: "hsl(0, 0%, 66%)" },
                            mb: 2,
                            bgcolor: "hsl(0, 0%, 7%)",
                            border: 1,
                        }}
                        variant="filled"
                    >
                        <InputLabel
                            error={errors.password}
                            htmlFor="filled-adornment-password"
                        >
                            Password
                        </InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? "text" : "password"}
                            value={passwordInput}
                            error={errors.password}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword
                                                ? "hide the password"
                                                : "display the password"
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff
                                                sx={{ color: "white" }}
                                            />
                                        ) : (
                                            <Visibility
                                                sx={{ color: "white" }}
                                            />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <Button
                        variant="contained"
                        startIcon={<LoginIcon />}
                        type="submit"
                        fullWidth
                        disabled={btnText === "Loading..."}
                        sx={{ mt: 1 }}
                    >
                        {btnText}
                    </Button>

                    {msgText && (
                        <Typography
                            variant="body2"
                            color={
                                msgText.includes("successful")
                                    ? "primary"
                                    : "error"
                            }
                            sx={{ mt: 1 }}
                        >
                            {msgText}
                        </Typography>
                    )}

                    {/* Link to Sign Up page */}
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <Link to="/signup" style={{ color: "blue" }}>
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
};

export default Login;
