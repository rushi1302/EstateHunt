import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Profile() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  if (user) {
    return (
      <div className="max-w-[350px] sm:max-w-lg mx-auto  ">
        <h2 className="text-center font-medium text-2xl uppercase m-5">
          Profile
        </h2>
        <form className="flex flex-col gap-4 ">
          <div className="flex items-center justify-center">
            <img
              src={user.photo}
              alt="img"
              className="h-24 w-24 rounded-full object-cover outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg flex-grow-1 "
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
          />
          <button
            type="submit"
            className=" bg-[#192655] text-[#fff] p-3 rounded-lg text-lg uppercase hover:opacity-80">
            Update
          </button>
        </form>
        <div className="flex justify-between mt-3 text-red text-xl">
          <span>Delete Account</span>
          <span>Sign Out</span>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}

export default Profile;
