import React, { useContext, useEffect, useState } from "react";
import { register } from "../services/authServices";
import { useNavigate,Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import "../../../App.css";
import { AuthContext } from "../../../context/authContext";

const FormRegister = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {user} = useContext(AuthContext)

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user,navigate])

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(userName, email, password);
      alert("Registration Successfull...");
      navigate("/login");
    } catch (error) {
      setError("Registration failed.");
    }
  };

  return (
    <Box className="register-container">
      <Card className="register-card">
        <CardContent>
          <Typography sx={{mb:2}} color="success" variant="h5" component="h1" className="register-title">
            REGISTER
          </Typography>
          {error && (
            <Typography color="error" className="error-message">
              {error}
            </Typography>
          )}
          <form onSubmit={handleRegister}>
            
            <TextField
              type="text"
              id="userName"
              label="Name"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              fullWidth
              className="input-field"
              sx={{mb:2}}
            />

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
              sx={{mb:2}}
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
              sx={{mb:2}}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="register-button"
            >
              Register
            </Button>
            
           
          </form>
          <Typography variant="body2" align="center" sx={{mt:2}}>
            Already Registered?{" "}
            <Link to="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
            Click here to login
            </Link>
            </Typography>
        </CardContent>
       
      </Card>
    </Box>
  );
};

export default FormRegister;
