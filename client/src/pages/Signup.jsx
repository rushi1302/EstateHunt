import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="max-w-[350px] sm:max-w-lg mx-auto ">
      <h1 className="font-semibold text-2xl uppercase text-center m-12">
        Sign Up
      </h1>
      <form method="post" className="flex flex-col flex-wrap gap-5">
        <input
          className="p-3 bg-headerTwo rounded-lg text-lg focus:outline-none"
          type="text"
          placeholder="username"
          id="username"
          name="username"
          onChange={handleChange}
        />
        <input
          className="p-3 bg-headerTwo rounded-lg text-lg focus:outline-none"
          type="email"
          placeholder="email"
          id="email"
          name="email"
          onChange={handleChange}
        />
        <input
          className="p-3 bg-headerTwo rounded-lg text-lg focus:outline-none"
          type="password"
          placeholder="password"
          id="password"
          name="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-headerThree p-3 rounded-lg text-lg uppercase hover:opacity-80">
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
