import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slices/userSlice"; // Redux
import { useNavigate } from "react-router-dom";
import { signIn } from "@/api/userAPI";
import { signInOrganization } from "@/api/organizationAPI";
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
import { Link } from "react-router-dom";

// Define types for the error state
interface Errors {
  email: boolean;
  password: boolean;
  orgName: boolean;
}

const Login: React.FC = () => {
  const user = useSelector((state) => state.user);

  const [emailInput, setEmailInput] = useState<string>("");
  const [orgNameInput, setOrgNameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [isOrg, setIsOrg] = useState<boolean>(false); // Toggle between User and Organization
  const [errors, setErrors] = useState<Errors>({
    email: false,
    password: false,
    orgName: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>("Sign In");
  const [msgText, setMsgText] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent) =>
    event.preventDefault();

  // Validate inputs
  const validateInputs = (): boolean => {
    const newErrors: Errors = {
      email: !emailInput.trim() && !orgNameInput.trim(),
      password: !passwordInput.trim(),
      orgName: isOrg && !orgNameInput.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsOrg(event.target.value === "Organization");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setMsgText("");
    setErrors({ email: false, password: false, orgName: false });

    if (validateInputs()) {
      setBtnText("Loading...");
      try {
        let response;

        if (isOrg) {
          response = await signInOrganization({
            email: orgNameInput, // You can change this if needed, depending on your data
            password: passwordInput,
          });
        } else {
          response = await signIn({
            email: emailInput, // Changed to emailInput
            password: passwordInput,
          });
        }

        if (response.message === "Authentication successful") {
          // Dispatch user or organization info to Redux

          dispatch(
            setUser({
              userId: response._id,
              username: response.username || response.orgName,
              userType: isOrg ? "organization" : "user",
            })
          );

          setMsgText("Login successful!");
          setTimeout(() => navigate("/Volunteer-home"), 1500);
        } else {
          setMsgText(
            (response.error as string) || "Login failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Error during login:", error);
        setMsgText("An unexpected error occurred. Please try again.");
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

        <div>
          <select onChange={handleChange}>
            <option value="User">User</option>
            <option value="Organization">Organization</option>
          </select>
          <p>Selected: {isOrg ? "Organization" : "User"}</p>
        </div>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {isOrg ? (
            <TextField
              label="Enter Organization Name or Email"
              fullWidth
              variant="filled"
              value={orgNameInput}
              onChange={(e) => setOrgNameInput(e.target.value)}
              autoFocus
              sx={{
                input: { color: "white" },
                label: { color: "hsl(0, 0%, 66%)" },
                mb: 2,
                bgcolor: "hsl(0, 0%, 7%)",
                border: 1,
              }}
              error={errors.orgName}
              helperText={errors.orgName ? "Organization Name is required" : ""}
            />
          ) : (
            <TextField
              label="Enter email"
              fullWidth
              variant="filled"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              autoFocus
              sx={{
                input: { color: "white" },
                label: { color: "hsl(0, 0%, 66%)" },
                mb: 2,
                bgcolor: "hsl(0, 0%, 7%)",
                border: 1,
              }}
              error={errors.email}
              helperText={errors.email ? "Email is required" : ""}
            />
          )}

          <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
            <InputLabel>Password</InputLabel>
            <FilledInput
              type={showPassword ? "text" : "password"}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {btnText}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Sign Up here
            </Link>
          </Typography>
        </Box>
        <Button onClick={() => console.log(user)}>click me</Button>
      </Container>
    </Container>
  );
};

export default Login;
