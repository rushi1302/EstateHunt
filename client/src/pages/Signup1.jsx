import React from "react";
import {
  Form,
  Link,
  json,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
function Signup1() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="max-w-[350px] sm:max-w-lg mx-auto ">
      <h1 className="font-semibold text-2xl uppercase text-center m-12">
        Sign Up
      </h1>
      <Form method="post" className="flex flex-col flex-wrap gap-5">
        <input
          className="p-3 bg-headerTwo rounded-lg text-lg focus:outline-none"
          type="text"
          placeholder="username"
          id="username"
          name="username"
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
        <button
          type="submit"
          className="bg-headerThree p-3 rounded-lg text-lg uppercase hover:opacity-80">
          {isSubmitting ? "submitting" : "SignUp"}
        </button>
      </Form>
      <div className="flex gap-3 mt-5 justify-center">
        <p>already have an account</p>
        <Link to="/signin">
          <span className="text-headerThree hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const newData = {
    username: data.get("username"),
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log(newData);

  const response = fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...newData }),
  });
  if (response.status === 200) {
    return redirect("/signin");
  }
  if (!response.ok) {
    throw json(
      { message: "please provide unique username and eamil" },
      { status: 500 }
    );
  }

  return response;
}

export default Signup1;
