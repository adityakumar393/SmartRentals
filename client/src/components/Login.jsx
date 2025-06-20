// src/components/Login.jsx
import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let res;
      if (isLogin) {
        res = await signInWithEmailAndPassword(auth, email, password);
      } else {
        res = await createUserWithEmailAndPassword(auth, email, password);
      }
      setUser(res.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto mt-6">
      {user ? (
        <>
          <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">
            Welcome, {user.email}
          </h2>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
