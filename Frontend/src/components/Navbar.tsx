import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user }: { user: { name: string; avatar: string } }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">Kanban Board</h1>
      </div>

      <div className="navbar-right">
        <div className="navbar-user">
          <img src={user.avatar} alt="avatar" className="navbar-avatar" />
          <span className="navbar-username">{user.name}</span>
        </div>

        
        <button className="navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
