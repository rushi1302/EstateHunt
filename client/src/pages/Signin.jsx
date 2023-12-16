import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinStart, signinFail, signinSuccess } from "../../redux/userSlice";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../util/http";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user.currentUser);

  dispatch(signinStart());
  const { mutate, data, isError, error } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log(data);
      dispatch(signinSuccess(data));
      navigate("/");
    },
    onError: (error) => {
      console.log(error.message);
      dispatch(signinFail(error.message));
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    mutate(data);
  }

  // console.log(user);
  console.log(isError);
  if (isError) {
    console.log(error.message);
  }
  return (
    <div className="max-w-[350px] sm:max-w-lg mx-auto ">
      <h1 className="font-semibold text-2xl uppercase text-center m-12">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-5">
        <input
          className="p-3 bg-headerTwo rounded-lg text-lg focus:outline-none"
          type="email"
          placeholder="email"
          id="email"
          name="email"
        />
        <input
          className="p-3 bg-headerTwo rounded-lg text-lg focus:outline-none"
          type="password"
          placeholder="password"
          id="password"
          name="password"
        />
        <button
          type="submit"
          className="bg-headerThree p-3 rounded-lg text-lg uppercase hover:opacity-80">
          Signin
        </button>
        <GoogleAuth />
      </form>
      <div className="flex gap-3 mt-5 justify-center">
        <p>Don't have an account</p>
        <Link to="/signup">
          <span className="text-headerThree hover:underline">Sign in</span>
        </Link>
      </div>
      {isError && (
        <p className="text-center font-extrabold text-xl text-error mt-3 bg-headerTwo">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default Signin;
