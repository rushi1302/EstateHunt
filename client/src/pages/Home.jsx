import React from "react";
import { useSelector } from "react-redux";
function Home() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return <div>Welcome to Home</div>;
}

export default Home;
