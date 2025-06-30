import axios from "axios";
import { setToken,getToken,removeToken } from "../../../shared/utils/tokenUtils";

const API_URL = "http://localhost:5000/api/auth/";

export const login = async(email,password)=>{
    const response = await axios.post(API_URL+"login",{email,password});
    console.log("login response:", response.data);
    setToken(response.data.token)
    return response.data;
}


export const register = async(userName,email,password)=>{
    const response = await axios.post(API_URL+"register",{userName,email,password})
    console.log("isAdmin response:", response.data);
    return response.data
}

export const logout = ()=>{
    removeToken();
}


export const isAdmin = async(email,password)=>{
    const response = await axios.post(API_URL+"admin-login",{email,password});
    setToken(response.data.token);
    return response.data;
}


export const getUserData = async(token)=>{
    try {
        const response = await axios.get(`${API_URL}user`,{
            headers:{Authorization: `Bearer ${token}`},
        })
        console.log("getUserData response:", response.data);
        return response.data
    } catch (error) {
        throw new Error("Failed to fetch user data");
    }
}