// import React from 'react';

// export default function App() {
//   return (
//     <div className="container">
//       <h1>Gym App</h1>
//       <p>If you see this, the frontend is working.</p>
//     </div>
//   );
// }
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

// Optional: Bootstrap import if not already loaded via index.html
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  // Read saved user from localStorage
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  return (
    <>
      {/* Navigation bar */}
      <Navbar user={user} setUser={setUser} />

      <main className="container mt-5 pt-4">
        {!user ? (
          <div className="row">
            <div className="col-md-6 mb-4">
              <Login setUser={setUser} />
            </div>
            <div className="col-md-6 mb-4">
              <Register />
            </div>
          </div>
        ) : (
          <Dashboard user={user} />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
