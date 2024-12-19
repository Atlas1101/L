// import { useState } from "react";
// import { useDispatch } from "react-redux"; //redux
// import { setUser } from "../../store/slices/userSlice.js";  //redux
// import { signUp } from "../../utils/userApi";
// import { useNavigate } from "react-router-dom";

// import {
//   Avatar,
//   Box,
//   Container,
//   Paper,
//   TextField,
//   Typography,
//   Button,
//   FormControl,
//   IconButton,
//   FilledInput,
//   InputLabel,
//   InputAdornment,
// } from "@mui/material";

// import CreateIcon from "@mui/icons-material/Create";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { Link } from "react-router-dom";

// const SignUp = () => {
//   const dispatch = useDispatch(); //redux
//   const navigate = useNavigate();  // Initialize navigation

//   // State for form inputs
//   const [usernameInput, setUsernameInput] = useState("");
//   const [passwordInput, setPasswordInput] = useState("");
//   const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
//   const [emailInput, setEmailInput] = useState("");

//   // State for error handling
//   const [usernameError, setUsernameError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [confirmPasswordError, setConfirmPasswordError] = useState(false);

//   // State for password visibility
//   const [showPassword, setShowPassword] = useState(false);

//   // Handle password visibility toggle
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Reset errors before validation
//     setUsernameError(false);
//     setPasswordError(false);
//     setEmailError(false);
//     setConfirmPasswordError(false);

//     let hasError = false;

//     // Input validation
//     if (!usernameInput.trim()) {
//       setUsernameError(true);
//       hasError = true;
//     }
//     if (!emailInput.trim() || !/\S+@\S+\.\S+/.test(emailInput)) {
//       setEmailError(true);
//       hasError = true;
//     }
//     if (!passwordInput.trim()) {
//       setPasswordError(true);
//       hasError = true;
//     }
//     if (passwordInput !== confirmPasswordInput) {
//       setConfirmPasswordError(true);
//       hasError = true;
//     }

//     if (hasError) return;

//     try {
//       // Call sign-up API
//       const response = await signUp({   //api call to save new user
//         username: usernameInput,
//         email: emailInput,
//         password: passwordInput,
//       });

//       if (response.status==="success") {
//         // Dispatch action to store user info in Redux
//         dispatch(setUser(usernameInput));  //redux

//         // Optionally navigate to home page or login
//       } else {
//         console.log("Sign-up failed:", response.error);
//       }
//     } catch (error) {
//       console.log("Error occurred during sign-up:", error);
//     }
//     setTimeout(() => {//
//       navigate("/login");
//     }, 1500);

//   };

//   return (
//     <Container maxWidth="xs">
//       <Paper sx={{ padding: 2 }}>
//         <Avatar sx={{ mx: "auto", bgcolor: "secondary.main" }}>
//           <CreateIcon />
//         </Avatar>

//         <Typography variant="h5" align="center" sx={{ mt: 1 }}>
//           Sign Up
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             label="Username"
//             fullWidth
//             variant="filled"
//             value={usernameInput}
//             onChange={(e) => setUsernameInput(e.target.value)}
//             error={usernameError}
//             helperText={usernameError ? "Username is required" : ""}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Email"
//             fullWidth
//             variant="filled"
//             value={emailInput}
//             onChange={(e) => setEmailInput(e.target.value)}
//             error={emailError}
//             helperText={emailError ? "Invalid email" : ""}
//             sx={{ mb: 2 }}
//           />
//           <FormControl
//             fullWidth
//             variant="filled"
//             sx={{ mb: 2 }}
//           >
//             <InputLabel>Password</InputLabel>
//             <FilledInput
//               type={showPassword ? "text" : "password"}
//               value={passwordInput}
//               onChange={(e) => setPasswordInput(e.target.value)}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//             />
//           </FormControl>

//           <FormControl
//             fullWidth
//             variant="filled"
//             sx={{ mb: 2 }}
//           >
//             <InputLabel>Confirm Password</InputLabel>
//             <FilledInput
//               type={showPassword ? "text" : "password"}
//               value={confirmPasswordInput}
//               onChange={(e) => setConfirmPasswordInput(e.target.value)}
//             />
//             {confirmPasswordError && (
//               <Typography variant="body2" color="error" sx={{ mt: 1 }}>
//                 Passwords do not match
//               </Typography>
//             )}
//           </FormControl>

//           <Button
//             variant="contained"
//             type="submit"
//             fullWidth
//             sx={{ mt: 1 }}
//             startIcon={<CreateIcon />}
//           >
//             Sign Up
//           </Button>

//           {/* Link to Login page */}
//           <Box sx={{ textAlign: "center", mt: 2 }}>
//             <Typography variant="body2">
//               Already have an account?{" "}
//               <Link to="/login" style={{ color: "blue" }}>
//                 Log in
//               </Link>
//             </Typography>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default SignUp;
import { signUp } from "../../utils/userApi";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { signUp } from "../../utils/userApi";
import { useNavigate } from "react-router-dom";

import {
    Avatar,
    Box,
    Container,
    Paper,
    TextField,
    Typography,
    Button,
    FormControl,
    IconButton,
    FilledInput,
    InputLabel,
    InputAdornment,
    Tabs,
    Tab,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

// TypeScript types for form inputs
interface VolunteerForm {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    city: string;
    age: string;
}

interface OrganizationForm {
    organizationName: string;
    password: string;
    confirmPassword: string;
    email: string;
    phone: string;
    city: string;
}

const SignUp = () => {
    const dispatch = useDispatch(); //redux
    const navigate = useNavigate(); // Initialize navigation

    const [tabIndex, setTabIndex] = useState(0);

    // State for form inputs
    const [volunteerForm, setVolunteerForm] = useState<VolunteerForm>({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        city: "",
        age: "",
    });

    const [organizationForm, setOrganizationForm] = useState<OrganizationForm>({
        organizationName: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        city: "",
    });

    // State for errors
    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
        city: false,
        age: false,
        organizationName: false,
        phone: false,
    });

    // State for password visibility
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent) =>
        event.preventDefault();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleVolunteerChange = (
        field: keyof VolunteerForm,
        value: string
    ) => {
        setVolunteerForm({ ...volunteerForm, [field]: value });
    };

    const handleOrganizationChange = (
        field: keyof OrganizationForm,
        value: string
    ) => {
        setOrganizationForm({ ...organizationForm, [field]: value });
    };

    const validateInputs = () => {
        let newErrors = {};
        if (tabIndex === 0) {
            // Validate Volunteer Form
            newErrors = {
                username: !volunteerForm.username.trim(),
                email: !/\S+@\S+\.\S+/.test(volunteerForm.email),
                password: !volunteerForm.password.trim(),
                confirmPassword:
                    volunteerForm.password !== volunteerForm.confirmPassword,
                city: !volunteerForm.city.trim(),
                age:
                    !volunteerForm.age.trim() ||
                    isNaN(Number(volunteerForm.age)),
            };
        } else {
            // Validate Organization Form
            newErrors = {
                organizationName: !organizationForm.organizationName.trim(),
                email: !/\S+@\S+\.\S+/.test(organizationForm.email),
                password: !organizationForm.password.trim(),
                confirmPassword:
                    organizationForm.password !==
                    organizationForm.confirmPassword,
                phone:
                    !organizationForm.phone.trim() ||
                    isNaN(Number(organizationForm.phone)),
                city: !organizationForm.city.trim(),
            };
        }
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({
            username: false,
            email: false,
            password: false,
            confirmPassword: false,
            city: false,
            age: false,
            organizationName: false,
            phone: false,
        });

        if (validateInputs()) {
            try {
                const payload =
                    tabIndex === 0
                        ? { ...volunteerForm }
                        : { ...organizationForm };

                const response = await signUp(payload);

                if (response.status === "success") {
                    dispatch(
                        tabIndex === 0
                            ? setUser(volunteerForm.username)
                            : setUser(organizationForm.organizationName)
                    );
                    alert("Sign-up successful!");
                    setTimeout(() => navigate("/login"), 1500); // Navigate to login
                } else {
                    // Optionally update specific error states based on response
                    if (response.errorField) {
                        setErrors((prev) => ({
                            ...prev,
                            [response.errorField]: true,
                        }));
                    }
                    alert("Sign-up failed: " + response.error);
                }
            } catch (error) {
                console.error("Error during sign-up:", error);
                alert("An error occurred. Please try again.");
            }
        } else {
            alert("Please fix the errors and try again.");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh", // Full viewport height
                width: "100%", // Full width
                display: "flex", // Flexbox for centering
                alignItems: "center", // Center vertically
                justifyContent: "center", // Center horizontally
                bgcolor: "hsl(198, 39.7%, 52.5%)", // Background color
            }}
        >
            {/* Wrapper to limit form width */}
            <Container
                sx={{
                    width: "100%", // Allow flexibility
                    maxWidth: 400, // Limit form width to 400px
                    px: 2, // Add padding for smaller screens
                }}
            >
                <Paper maxWidth="xs" sx={{ padding: 2 }}>
                    <Avatar sx={{ mx: "auto", bgcolor: "secondary.main" }}>
                        <CreateIcon />
                    </Avatar>

                    <Typography variant="h5" align="center" sx={{ mt: 1 }}>
                        Sign Up
                    </Typography>

                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            mt: 2,
                            justifyContent: "center",
                            display: "flex",
                            borderRight: 0,
                            borderLeft: 0,
                        }}
                    >
                        <Tabs
                            value={tabIndex}
                            onChange={handleTabChange}
                            aria-label="Sign-up tabs"
                        >
                            <Tab label="Volunteer" />
                            <Tab label="Organization" />
                        </Tabs>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        {tabIndex === 0 && (
                            <>
                                <TextField
                                    label="Username"
                                    fullWidth
                                    variant="filled"
                                    value={volunteerForm.username}
                                    onChange={(e) =>
                                        handleVolunteerChange(
                                            "username",
                                            e.target.value
                                        )
                                    }
                                    error={errors.username}
                                    helperText={
                                        errors.username
                                            ? "Username is required"
                                            : ""
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Email"
                                    fullWidth
                                    variant="filled"
                                    value={volunteerForm.email}
                                    onChange={(e) =>
                                        handleVolunteerChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    error={errors.email}
                                    helperText={
                                        errors.email ? "Invalid email" : ""
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="City"
                                    fullWidth
                                    variant="filled"
                                    value={volunteerForm.city}
                                    onChange={(e) =>
                                        handleVolunteerChange(
                                            "city",
                                            e.target.value
                                        )
                                    }
                                    error={errors.city}
                                    helperText={
                                        errors.city ? "City is required" : ""
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Age"
                                    fullWidth
                                    variant="filled"
                                    value={volunteerForm.age}
                                    onChange={(e) =>
                                        handleVolunteerChange(
                                            "age",
                                            e.target.value
                                        )
                                    }
                                    error={errors.age}
                                    helperText={
                                        errors.age
                                            ? "Valid age is required"
                                            : ""
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <FormControl
                                    fullWidth
                                    variant="filled"
                                    sx={{ mb: 2 }}
                                >
                                    <InputLabel>Password</InputLabel>
                                    <FilledInput
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={volunteerForm.password}
                                        onChange={(e) =>
                                            handleVolunteerChange(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    variant="filled"
                                    sx={{ mb: 2 }}
                                >
                                    <InputLabel>Confirm Password</InputLabel>
                                    <FilledInput
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={volunteerForm.confirmPassword}
                                        onChange={(e) =>
                                            handleVolunteerChange(
                                                "confirmPassword",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.confirmPassword && (
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            sx={{ mt: 1 }}
                                        >
                                            Passwords do not match
                                        </Typography>
                                    )}
                                </FormControl>
                            </>
                        )}

                        {tabIndex === 1 && (
                            <>
                                <TextField
                                    label="Organization Name"
                                    fullWidth
                                    variant="filled"
                                    value={organizationForm.organizationName}
                                    onChange={(e) =>
                                        handleOrganizationChange(
                                            "organizationName",
                                            e.target.value
                                        )
                                    }
                                    error={errors.organizationName}
                                    helperText={
                                        errors.organizationName
                                            ? "Organization name is required"
                                            : ""
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Email"
                                    fullWidth
                                    variant="filled"
                                    value={organizationForm.email}
                                    onChange={(e) =>
                                        handleOrganizationChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    error={errors.email}
                                    helperText={
                                        errors.email ? "Invalid email" : ""
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Phone"
                                    fullWidth
                                    variant="filled"
                                    value={organizationForm.phone}
                                    onChange={(e) =>
                                        handleOrganizationChange(
                                            "phone",
                                            e.target.value
                                        )
                                    }
                                    error={errors.phone}
                                    helperText={
                                        errors.phone
                                            ? "Valid phone number is required"
                                            : ""
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="City"
                                    fullWidth
                                    variant="filled"
                                    value={organizationForm.city}
                                    onChange={(e) =>
                                        handleOrganizationChange(
                                            "city",
                                            e.target.value
                                        )
                                    }
                                    error={errors.city}
                                    helperText={
                                        errors.city ? "City is required" : ""
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <FormControl
                                    fullWidth
                                    variant="filled"
                                    sx={{ mb: 2 }}
                                >
                                    <InputLabel>Password</InputLabel>
                                    <FilledInput
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={organizationForm.password}
                                        onChange={(e) =>
                                            handleOrganizationChange(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    variant="filled"
                                    sx={{ mb: 2 }}
                                >
                                    <InputLabel>Confirm Password</InputLabel>
                                    <FilledInput
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={organizationForm.confirmPassword}
                                        onChange={(e) =>
                                            handleOrganizationChange(
                                                "confirmPassword",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.confirmPassword && (
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            sx={{ mt: 1 }}
                                        >
                                            Passwords do not match
                                        </Typography>
                                    )}
                                </FormControl>
                            </>
                        )}

                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{ mt: 1 }}
                            startIcon={<CreateIcon />}
                        >
                            Sign Up
                        </Button>

                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Typography variant="body2">
                                Already have an account?{" "}
                                <Link to="/login" style={{ color: "blue" }}>
                                    Log in
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default SignUp;
