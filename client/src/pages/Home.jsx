import React from "react";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
function Home() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <>
      <div>Welcome to Home</div>;
      <Loading />
    </>
  );
}

export default Home;
