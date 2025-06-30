import React, {  createContext, useEffect, useState } from "react";

import { getToken,removeToken, setToken } from "../shared/utils/tokenUtils";
import { getUserData } from "../features/auth/services/authServices";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);


    

    useEffect(()=>{
        const token = getToken();
        if(token && !isInitialized ){
            const fetchUserData = async()=>{
                try {
                    const data = await getUserData(token);
                    console.log("Fetched user data on mount:", data)
                    setUser(data);
                } catch (error) {
                    console.log("Failed to fetch user data:", error);
                    removeToken();
                    setUser(null);
                }finally {
                    setIsInitialized(true);
                  }
            };
            fetchUserData()
           
        }else {
            setIsInitialized(true);
          }
    },[isInitialized]);

    const loginUser = (userData)=>{
        if(!userData || !userData.token){
             console.warn("Invalid login data", userData);
        return;
        }
        console.log("loginUser userData:", userData)
        setUser(userData);
        setToken(userData.token)
    }

    const loginOut = ()=>{
        console.log("Logging out, clearing user and token");
        removeToken();
        setUser(null);
        // localStorage.clear()
        removeToken();
    }

    return (
        <AuthContext.Provider value={{ user, loginUser, loginOut,isInitialized }}>
          {children}
        </AuthContext.Provider>
      );
}