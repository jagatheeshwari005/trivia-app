// //Footer.jsx

// import React from 'react';
// import './Footer.css';
// import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="footer fade-in">
//       <div className="footer-content">
//         <h3>TriviaZone</h3>
//         <p>Challenge your mind. Play. Learn. Win!</p>
//         <div className="social-icons">
//           <a href="#"><FaFacebook /></a>
//           <a href="#"><FaTwitter /></a>
//           <a href="#"><FaInstagram /></a>
//           <a href="#"><FaGithub /></a>
//         </div>
//       </div>
//       <div className="footer-bottom">
//         <p>&copy; 2025 TriviaZone | All Rights Reserved</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer fade-in">
      <div className="footer-content">
        <h3>TriviaZone</h3>
        <p>Challenge your mind. Play. Learn. Win!</p>
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaGithub /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 TriviaZone | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
