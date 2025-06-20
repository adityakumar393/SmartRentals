import React, { useEffect, useState } from "react";
import axios from "axios";

import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import AgreementForm from "./components/AgreementForm";
import AgreementDashboard from "./components/AgreementDashboard";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const [activeTab, setActiveTab] = useState("complaints");
  const [complaints, setComplaints] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints`);
        setComplaints(res.data);
      } catch (err) {
        console.error("Error loading complaints:", err);
      }
    };
    if (user) fetchComplaints();
  }, [user]);

  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        🏡 SmartRentals
      </h1>

      <div className="text-center mb-4 text-gray-700">
        👤 Logged in as <strong>{user.email}</strong>
      </div>

      {/* 🔁 Tabs */}
      <div className="flex justify-center mb-6 space-x-4">
        {["complaints", "agreements", "dashboard", "admin"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab === "complaints" && "📣 Complaints"}
            {tab === "agreements" && "📝 Agreements"}
            {tab === "dashboard" && "📊 My Dashboard"}
            {tab === "admin" && "🛠️ Admin"}
          </button>
        ))}
      </div>

      {/* 🔁 Views */}
      {activeTab === "complaints" && (
        <>
          <ComplaintForm setComplaints={setComplaints} user={user} />
          <ComplaintList complaints={complaints} setComplaints={setComplaints} />
        </>
      )}
      {activeTab === "agreements" && <AgreementForm user={user} />}
      {activeTab === "dashboard" && (
        <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 text-blue-600">👤 My Dashboard</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p className="mt-4 font-semibold text-gray-700">🧾 My Complaints:</p>
          <ul className="list-disc pl-5">
            {complaints.filter(c => c.user === user.email).map(c => (
              <li key={c._id}>{c.text} - <span className="text-sm text-gray-500">{c.status}</span></li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === "admin" && (
  <AdminPanel complaints={complaints} setComplaints={setComplaints} />
)}

    </div>
  );
};

export default App;
