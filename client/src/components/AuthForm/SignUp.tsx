import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Create as CreateIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signUp } from "@/api/userAPI";
import { signUpOrganization } from "@/api/organizationAPI";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({
    username: "",
    email: "",
    city: "",
    phone: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const [organizationForm, setOrganizationForm] = useState({
    orgName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    city: false,
    phone: false,
    age: false,
    password: false,
    confirmPassword: false,
    orgName: false,
  });
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent) =>
    event.preventDefault();

  const handleVolunteerChange = (field: string, value: string) => {
    setVolunteerForm({ ...volunteerForm, [field]: value });
  };

  const handleOrganizationChange = (field: string, value: string) => {
    setOrganizationForm({ ...organizationForm, [field]: value });
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { ...errors };

    const fields = tabIndex === 0 ? volunteerForm : organizationForm;

    Object.keys(fields).forEach((key) => {
      if (!fields[key as keyof typeof fields]) {
        newErrors[key as keyof typeof errors] = true;
        isValid = false;
      } else {
        newErrors[key as keyof typeof errors] = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      const formData = tabIndex === 0 ? volunteerForm : organizationForm;

      try {
        // Sign Up either Volunteer or Organization
        if (tabIndex === 0) {
          await signUp(formData); // For volunteer
        } else {
          // Create new organization object and send it to signUpOrganization function
          const newOrganization = {
            orgName: formData.orgName,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          };
          await signUpOrganization(newOrganization); // For organization
        }

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        console.error("Error during sign up:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "hsl(198, 39.7%, 52.5%)",
      }}
    >
      <Container
        sx={{
          width: "100%",
          maxWidth: 400,
          px: 2,
        }}
      >
        <Paper sx={{ padding: 2 }}>
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
              display: "flex",
              justifyContent: "center",
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

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {tabIndex === 0 && (
              <>
                <TextField
                  label="Username"
                  fullWidth
                  variant="filled"
                  value={volunteerForm.username}
                  onChange={(e) =>
                    handleVolunteerChange("username", e.target.value)
                  }
                  error={errors.username}
                  helperText={errors.username ? "Username is required" : ""}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  fullWidth
                  variant="filled"
                  value={volunteerForm.email}
                  onChange={(e) =>
                    handleVolunteerChange("email", e.target.value)
                  }
                  error={errors.email}
                  helperText={errors.email ? "Invalid email" : ""}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="City"
                  fullWidth
                  variant="filled"
                  value={volunteerForm.city}
                  onChange={(e) =>
                    handleVolunteerChange("city", e.target.value)
                  }
                  error={errors.city}
                  helperText={errors.city ? "City is required" : ""}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Phone"
                  fullWidth
                  variant="filled"
                  value={volunteerForm.phone}
                  onChange={(e) =>
                    handleVolunteerChange("phone", e.target.value)
                  }
                  error={errors.phone}
                  helperText={errors.phone ? "Phone number is required" : ""}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Age"
                  fullWidth
                  variant="filled"
                  value={volunteerForm.age}
                  onChange={(e) => handleVolunteerChange("age", e.target.value)}
                  error={errors.age}
                  helperText={errors.age ? "Valid age is required" : ""}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
                  <InputLabel>Password</InputLabel>
                  <FilledInput
                    type={showPassword ? "text" : "password"}
                    value={volunteerForm.password}
                    onChange={(e) =>
                      handleVolunteerChange("password", e.target.value)
                    }
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
                <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
                  <InputLabel>Confirm Password</InputLabel>
                  <FilledInput
                    type={showPassword ? "text" : "password"}
                    value={volunteerForm.confirmPassword}
                    onChange={(e) =>
                      handleVolunteerChange("confirmPassword", e.target.value)
                    }
                  />
                </FormControl>
              </>
            )}

            {tabIndex === 1 && (
              <>
                <TextField
                  label="Organization Name"
                  fullWidth
                  variant="filled"
                  value={organizationForm.orgName}
                  onChange={(e) =>
                    handleOrganizationChange("orgName", e.target.value)
                  }
                  error={errors.orgName}
                  helperText={
                    errors.orgName ? "Organization name is required" : ""
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  fullWidth
                  variant="filled"
                  value={organizationForm.email}
                  onChange={(e) =>
                    handleOrganizationChange("email", e.target.value)
                  }
                  error={errors.email}
                  helperText={errors.email ? "Invalid email" : ""}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Phone"
                  fullWidth
                  variant="filled"
                  value={organizationForm.phone}
                  onChange={(e) =>
                    handleOrganizationChange("phone", e.target.value)
                  }
                  error={errors.phone}
                  helperText={errors.phone ? "Phone number is required" : ""}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="City"
                  fullWidth
                  variant="filled"
                  value={organizationForm.city}
                  onChange={(e) =>
                    handleOrganizationChange("city", e.target.value)
                  }
                  error={errors.city}
                  helperText={errors.city ? "City is required" : ""}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
                  <InputLabel>Password</InputLabel>
                  <FilledInput
                    type={showPassword ? "text" : "password"}
                    value={organizationForm.password}
                    onChange={(e) =>
                      handleOrganizationChange("password", e.target.value)
                    }
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
                <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
                  <InputLabel>Confirm Password</InputLabel>
                  <FilledInput
                    type={showPassword ? "text" : "password"}
                    value={organizationForm.confirmPassword}
                    onChange={(e) =>
                      handleOrganizationChange("confirmPassword", e.target.value)
                    }
                  />
                </FormControl>
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2 }}
            >
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
