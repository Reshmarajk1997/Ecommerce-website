import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/authContext";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import Navigation from "./shared/components/Navigation";
import HomePage from "./features/user/pages/HomePage";

// import ProductOverview from './components/ProductOverview';
import { AdminPage } from "./features/admin/pages/AdminPage";
import ProtectedRoute from "./app/ProtectedRoute";
import AddProductPage from "./features/product/pages/admin/AddProductPage";
import ProductListPage from './features/product/pages/admin/ProductListPage';
import EditProductPage  from './features/product/pages/admin/EditProductPage';

import { Navigate } from "react-router-dom";

function App() {
  console.log("App component is rendering...");
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<LoginPage />} />

          <Route path="/admin" element={<ProtectedRoute adminOnly />}>
            <Route index element={<AdminPage />} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="products" element={<ProductListPage />} />
             <Route path="products/edit/:id" element={<EditProductPage />} />
          </Route>

          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<HomePage />} />
          </Route>

          {/* <Route path='/product/:id' element={<ProductOverview/>}/> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
