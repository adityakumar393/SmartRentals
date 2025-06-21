import React, { useState, useEffect } from "react";
import axios from "axios";

import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import AgreementForm from "./components/AgreementForm";
import AgreementDashboard from "./components/AgreementDashboard";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";

const App = () => {
  const [activeTab, setActiveTab] = useState("complaints");
  const [complaints, setComplaints] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, [user]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints`);
        setComplaints(res.data);
      } catch (err) {
        console.error("Error loading complaints:", err);
      }
    };

    fetchComplaints();
  }, []);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">🏡 SmartRentals</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-3">
        {["complaints", "agreements", "dashboard"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab === "complaints" && "📣 Complaints"}
            {tab === "agreements" && "📝 Agreement"}
            {tab === "dashboard" && "📊 Dashboard"}
          </button>
        ))}

        {role === "admin" && (
          <button
            onClick={() => setActiveTab("admin")}
            className={`px-4 py-2 rounded ${
              activeTab === "admin" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            🛠️ Admin
          </button>
        )}
      </div>

      {/* Views */}
      {activeTab === "complaints" && (
        <>
          <ComplaintForm setComplaints={setComplaints} />
          <ComplaintList complaints={complaints} setComplaints={setComplaints} />
        </>
      )}

      {activeTab === "agreements" && <AgreementForm />}
      {activeTab === "dashboard" && <AgreementDashboard />}
      {activeTab === "admin" && <AdminPanel />}
    </div>
  );
};

export default App;
