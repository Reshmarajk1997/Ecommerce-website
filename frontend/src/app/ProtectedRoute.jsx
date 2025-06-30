import { useContext } from "react";
import { Navigate,Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";



const ProtectedRoute = ({adminOnly=false}) => {
    const {user,isInitialized } = useContext(AuthContext)
   

    if (!isInitialized) {
    return <div>Loading...</div>; 
  }

      if (!user) {
    return <Navigate to={adminOnly ? "/admin/login" : "/login"} replace />;
  }


    if(adminOnly&&!user.isAdmin) return <Navigate to='/'/>

  return (
    <Outlet/>
  )
}

export default ProtectedRoute