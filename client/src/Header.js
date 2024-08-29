import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "2px 16px 2px 16px",

        borderRadius: "30px",
        height: "5rem",
        marginBottom: "5rem",
      }}
    >
      <header>
        <div>
          <Link to="/" className="logo">
            Thoughts ?..
          </Link>
        </div>
        <nav>
          {username && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "200px",
                  fontFamily: "sans-serif",
                }}
              >
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "1rem",
                  }}
                >
                  <Link to="/create">Create +</Link>
                </div>
                <a
                  style={{
                    padding: "10px",
                    backgroundColor: "whitesmoke",
                    color: "black",
                    borderRadius: "10px",
                  }}
                  onClick={logout}
                >
                  Logout{" "}
                </a>
              </div>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}
