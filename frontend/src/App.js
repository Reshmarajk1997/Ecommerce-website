import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/authContext";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import Navigation from "./shared/components/Navigation";
import HomePage from "./features/user/pages/HomePage";

import { AdminPage } from "./features/admin/pages/AdminPage";
import ProtectedRoute from "./app/ProtectedRoute";
 import AddProductPage from "./features/product/pages/admin/AddProductPage";

import EditProductPage  from './features/product/pages/admin/EditProductPage';
import ProductListPage from './features/product/pages/admin/ProductListPage';
import UsersTablePage from './features/product/pages/admin/UsersTablePage';
import ProductOverviewPage from './features/product/pages/user/ProductOverviewPage'
import UserProductListPage from './features/product/pages/user/UserProductListPage'
import CartPage from './features/product/pages/user/CartPage'

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
            <Route path="users" element={<UsersTablePage/>}/>
            
             <Route path="products/:id/edit" element={<EditProductPage />} />
             <Route path="products" element={<ProductListPage />} />
          </Route>

          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<HomePage />} />
            <Route path="product/:id" element={<ProductOverviewPage/>}/>
            <Route path="products" element={< UserProductListPage/>} />
            <Route path="/cart" element={< CartPage/>} />
          </Route>

          {/* <Route path='/product/:id' element={<ProductOverview/>}/> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
