import React, { useState } from "react";

export default function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Set user from email (can be improved with real authentication)
    setUser({ name: email.split("@")[0] }); // Show name from email
    setShowLogin(false);
    setEmail("");
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
    setShowLogout(false);
  };

  const loginInputStyle = {
    padding: "0.8rem 1rem",
    border: "1px solid #ccc",
    borderRadius: 10,
    fontSize: "1rem",
  };

  const loginBtnStyle = {
    background: "#007bff",
    color: "white",
    padding: "1rem 2rem",
    border: "none",
    borderRadius: 12,
    fontSize: "1.1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const popupStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  return (
    <div>
      {/* Top Navbar or Header */}
      <div style={{ padding: "1rem", display: "flex", justifyContent: "flex-end" }}>
        {user ? (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowLogout(!showLogout)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "1rem",
                cursor: "pointer",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              {user.name}
            </button>
            {showLogout && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  background: "#fff",
                  border: "1px solid #ccc",
                  padding: "0.5rem 1rem",
                  borderRadius: 8,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)} style={{ padding: "0.5rem 1rem" }}>
            Login
          </button>
        )}
      </div>

      {/* Login Popup */}
      {showLogin && (
        <div className="popup" style={popupStyle}>
          <div
            className="login-popup"
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: 15,
              maxWidth: 400,
              margin: "2rem",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#333" }}>
              Login to Your Account
            </h2>
            <form
              className="login-form"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              onSubmit={handleLogin}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                placeholder="Email Address"
                required
                style={loginInputStyle}
              />
              <input
                type="password"
                className="login-input"
                placeholder="Password"
                required
                style={loginInputStyle}
              />
              <button type="submit" className="btn btn-primary" style={loginBtnStyle}>
                Login
              </button>
              <button
                type="button"
                className="btn"
                style={{
                  background: "#6c757d",
                  color: "white",
                  padding: "1rem 2rem",
                  border: "none",
                  borderRadius: 12,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  marginTop: 5,
                }}
                onClick={() => setShowLogin(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

