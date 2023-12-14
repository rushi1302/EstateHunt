import React from "react";
import { useRouteError, redirect, Link } from "react-router-dom";
function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  let title = "An error occured";
  let message = "something went wrong";
  if (error.status === 500) {
    message = "something went wrong";
  }
  if (error.status === 404) {
    title = "not found";
    message = "could not find page";
  }
  return (
    <>
      <main className="flex flex-col font-bold text-error items-center text-2xl mt-10">
        <h1>{title}</h1>
        <p>{message}</p>
        <Link to="/signup">Back to Sign In</Link>
      </main>
    </>
  );
}

export default ErrorPage;
