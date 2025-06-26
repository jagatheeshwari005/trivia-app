// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './component/Navbar';
// import Footer from './component/Footer';
// import Home from './component/Home';
// import About from './component/About';
// import AuthPage from './component/AuthPage';
// import QuizSetupPage from './component/QuizSetupPage';
// import QuizPage from './component/QuizPage';
// import Result from './component/Result';
// import ProtectedRoute from './component/ProtectedRoute';

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <main style={{ minHeight: '80vh', padding: '1rem' }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/auth" element={<AuthPage />} />
//           <Route
//             path="/quiz-setup"
//             element={
//               <ProtectedRoute>
//                 <QuizSetupPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/quiz"
//             element={
//               <ProtectedRoute>
//                 <QuizPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/result"
//             element={
//               <ProtectedRoute>
//                 <Result />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 - Not Found</h2>} />
//         </Routes>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './component/Home';
import About from './component/About';
import AuthPage from './component/AuthPage';
import QuizSetupPage from './component/QuizSetupPage';
import QuizPage from './component/QuizPage';
import Result from './component/Result';
import ProtectedRoute from './component/ProtectedRoute';
import Leaderboard from './component/Leaderboard';

const App = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/quiz-setup"
            element={
              <ProtectedRoute>
                <QuizSetupPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={<Leaderboard />}
          />
          <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 - Not Found</h2>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;