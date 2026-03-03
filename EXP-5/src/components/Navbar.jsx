import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { theme } = useContext(AppContext);

  return (
    <nav className={`navbar ${theme}`}>
      <h2>Task Dashboard</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/reports">Reports</Link>
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;