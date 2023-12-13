import { Outlet } from "react-router-dom";

import React from "react";
import Header from "../components/Header";

function Root() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
