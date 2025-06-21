// src/components/Login.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("tenant"); // New: default role
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

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

      localStorage.setItem("role", role); // Save role locally
      setUser(res.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("role");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto mt-6">
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

        {!isLogin && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border px-3 py-2 rounded text-gray-700"
          >
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
            <option value="admin">Admin</option>
          </select>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        {isLogin ? "Don't have an account?" : "Already registered?"} {" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>

      <button
        onClick={handleLogout}
        className="mt-4 text-red-500 underline block mx-auto"
      >
        Logout
      </button>
    </div>
  );
};

export default Login;
