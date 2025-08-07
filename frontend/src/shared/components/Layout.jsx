import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Navigation />
      <main className="overflow-auto w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
