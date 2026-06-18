import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <span>Csyrus</span> Approvals
      </Link>
      {user && (
        <div className="navbar__user">
          <span className="navbar__user-name">{user.name}</span>
          <span className="navbar__role">{user.role}</span>
        </div>
      )}
    </nav>
  );
}
