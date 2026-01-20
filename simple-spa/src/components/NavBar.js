import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#333" }}>
      <Link to="/" style={{ color: "white", marginRight: "15px" }}>
        Home
      </Link>
      <Link to="/about" style={{ color: "white", marginRight: "15px" }}>
        About
      </Link>
      <Link to="/contact" style={{ color: "white" }}>
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;
