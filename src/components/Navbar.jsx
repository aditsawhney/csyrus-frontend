import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        Csyrus Approvals
      </Link>
      {user && (
        <div className="navbar__user">
          <span>{user.name}</span>
          <span className="navbar__role">{user.role}</span>
        </div>
      )}
    </nav>
  );
}
