export const setToken = (token)=>{
    console.log("Setting token:", token);
    localStorage.setItem('authToken',token)
}

export const getToken =()=>{
    const token = localStorage.getItem("authToken");
  console.log("Getting token:", token);
  return token;
    
}

export const removeToken =()=>{
    console.log("Removing token");
    localStorage.removeItem('authToken')
    
}