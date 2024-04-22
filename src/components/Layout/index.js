import React from "react";
import Home from "../../pages/Home";
import Login from "../../pages/Login";

const Layout = () => {
  const user = localStorage.getItem("soical_user");
  // const user = false;

  return <div>{user ? <Home /> : <Login />}</div>;
};

export default Layout;
