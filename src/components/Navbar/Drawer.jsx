import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Drawer = () => {
  const navLinks = (
    <>
      <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/players">Players</NavLink>
      </li>
      <li>
        <NavLink to="/addPlayer">Add Player</NavLink>
      </li>
    </>
    </>
  );

  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-gray-600">{navLinks}</ul>
    </div>
  );
};

export default Drawer;
