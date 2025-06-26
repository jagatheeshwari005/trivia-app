// // src/component/AuthPage.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import './AuthPage.css';
// import { useNavigate } from 'react-router-dom';

// const AuthPage = () => {
//   const [isSignup, setIsSignup] = useState(true);
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const toggleMode = () => {
//     setIsSignup(prev => !prev);
//     setFormData({ email: '', password: '' });
//   };

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);

//     const endpoint = isSignup
//       ? 'http://localhost:5000/api/auth/signup'
//       : 'http://localhost:5000/api/auth/login';

//     try {
//       const res = await axios.post(endpoint, formData);

//       if (res.data.token) {
//         localStorage.setItem('token', res.data.token);
//         alert(res.data.message || `${isSignup ? 'Signup' : 'Login'} successful`);
//         navigate('/quiz-setup');
//       } else {
//         throw new Error('Token missing in response');
//       }
//     } catch (err) {
//       const message =
//         err.response?.data?.message ||
//         err.message ||
//         'Something went wrong!';
//       alert(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form onSubmit={handleSubmit} className="auth-form">
//         <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           required
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           required
//           minLength={6}
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Login'}
//         </button>
//         <p onClick={toggleMode} className="toggle-link">
//           {isSignup
//             ? 'Already have an account? Login'
//             : "Don't have an account? Sign Up"}
//         </p>
//       </form>
//     </div>
//   );
// };

// export default AuthPage;
import React, { useState } from 'react';
import axios from 'axios';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const toggleMode = () => setIsSignup(prev => !prev);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const endpoint = isSignup
      ? 'http://localhost:5000/api/auth/signup'
      : 'http://localhost:5000/api/auth/login';

    try {
      const res = await axios.post(endpoint, formData);
      alert(res.data.message);
      localStorage.setItem('token', res.data.token);
      navigate('/quiz-setup');
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        {isSignup && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        <p onClick={toggleMode} className="toggle-link">
          {isSignup
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
