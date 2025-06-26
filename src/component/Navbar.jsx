// //component Navbar.jsx

// import { Link } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <h2 className="logo">TriviaZone</h2>
//       <div className="nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <a href="#features">Features</a>
//         <Link to="/result">Result</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <nav className="navbar">
      <h2 className="logo">TriviaZone</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <a href="#features">Features</a>
        <Link to="/result">Result</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {isLoggedIn && (
          <button onClick={handleLogout} style={{ marginLeft: '1rem', background: '#e74c3c', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;