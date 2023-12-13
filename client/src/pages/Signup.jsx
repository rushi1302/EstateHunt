import React from "react";
import { Link } from "react-router-dom";
function Signup() {
  return (
    <div className="max-w-[350px] sm:max-w-lg mx-auto ">
      <h1 className="font-semibold text-2xl uppercase text-center m-12">
        Sign Up
      </h1>
      <form className="flex flex-col flex-wrap gap-5">
        <input
          className="p-3 bg-headerTwo rounded-lg text-lg focus:outline-none"
          type="text"
          placeholder="username"
          id="name"
          name="name"
        />
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
        <button className="bg-headerThree p-3 rounded-lg text-lg uppercase hover:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-3 mt-5 justify-center">
        <p>already have an account</p>
        <Link to="/signin">
          <span className="text-headerThree hover:underline">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
