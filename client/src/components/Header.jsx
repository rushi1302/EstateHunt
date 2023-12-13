import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <header className="bg-[#eb2632] shadow-md">
      <div className="flex justify-between items-center w-full mx-auto p-3 sm:max-w-6xl">
        <NavLink to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Rush's</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </NavLink>
        <form className="bg-slate-100 p-3 rounded-lg sm:flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 p-1 rounded-lg relative"
          />
          <button className="mx-2 sm:mx-4">
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className={"flex gap-3 font-medium"}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "underline" : undefined)}>
            <li className="hidden sm:inline">Home</li>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "underline " : undefined)}>
            <li className="hidden sm:inline">About</li>
          </NavLink>
          <NavLink
            to="/signin"
            className={({ isActive }) => (isActive ? "underline" : undefined)}>
            <li className="hidden sm:inline">signin</li>
          </NavLink>
        </ul>
      </div>
    </header>
  );
}

export default Header;
