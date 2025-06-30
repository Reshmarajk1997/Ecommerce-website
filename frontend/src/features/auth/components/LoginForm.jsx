import React, { useContext, useEffect, useState } from "react";

import { login,isAdmin } from "../services/authServices";

import { AuthContext } from "../../../context/authContext";
import { Checkbox,FormControlLabel} from '@mui/material'
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { user,loginUser,isInitialized } = useContext(AuthContext);
  
 
  const isAdminLogin = location.pathname === '/admin/login';
  console.log("Navigation user:", user, "isInitialized:", isInitialized);




  useEffect(() => {
    
  if (isInitialized) {
    if (user) {
      const redirectPath = user.isAdmin ? "/admin" : "/";
      if (location.pathname !== redirectPath) {
        navigate(redirectPath, { replace: true });
      }
    } else if (!user && isAdminLogin && location.pathname !== "/admin/login") {
      navigate("/admin/login", { replace: true });
    }
  }
}, [user, isInitialized, navigate, location.pathname, isAdminLogin]);





// useEffect(() => {
//   if (!isInitialized) return;

//   if (user) {
//     const redirectPath = user.isAdmin ? "/admin" : "/";

//     if (!user.isAdmin && location.pathname.startsWith("/admin")) {
//       navigate("/", { replace: true });
//       return;
//     }

//     if (!user.isAdmin && location.pathname === "/admin/login") {
//       navigate("/", { replace: true });
//       return;
//     }

//     if (user.isAdmin && location.pathname === "/") {
//       navigate("/admin", { replace: true });
//       return;
//     }

//     if (
//       location.pathname === "/login" ||
//       location.pathname === "/admin/login"
//     ) {
//       navigate(redirectPath, { replace: true });
//       return;
//     }
//   } else {
//     if (isAdminLogin && location.pathname !== "/admin/login") {
//       navigate("/admin/login", { replace: true });
//       return;
//     }
//   }
// }, [user, isInitialized, navigate, location.pathname, isAdminLogin]);







  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const userData =   await (isAdminLogin?isAdmin(email,password):login(email,password));
      console.log("Login userData:", userData);
      loginUser(userData);
      setSuccess("Login successful!");

      

      navigate(userData.isAdmin ? "/admin" : "/", { replace: true });
      
    } catch (err) {
      
      setError(err.response?.data?.message || "Login failed...");
    }finally {
      setLoading(false);
    }
  };


 

  if (!isInitialized ||(user && isAdminLogin)) {
    return null;
  }

  return (
    <Box className="register-container">
      <Card className="register-card">
        <CardContent>
          <Typography
            sx={{ mb: 2 }}
            color="success"
            variant="h5"
            component="h1"
            className="register-title"
          >
            {isAdminLogin ? "Admin Login" : "Login"}
          </Typography>
          {error && (
            <Typography color="error" className="error-message">
              {error}
            </Typography>
          )}
          <form onSubmit={handleLogin}>
            <TextField
              type="text"
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              className="input-field"
              sx={{ mb: 2 }}
            />

            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              className="input-field"
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="register-button"
            >
              {loading ? "Logging in..." : "Login"}
              
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have account?{" "}
            <Link
              to="/register"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Click here to Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>

    
  );
};

export default LoginForm;
