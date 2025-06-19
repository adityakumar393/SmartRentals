import React, { useEffect, useState } from "react";
import axios from "axios";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import AdminPanel from "./components/AdminPanel";

const App = () => {
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState("user"); // 'user' or 'admin'

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints`);
        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">🏡 RentSmart Complaints</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-l ${
            activeTab === "user" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("user")}
        >
          User View
        </button>
        <button
          className={`px-4 py-2 rounded-r ${
            activeTab === "admin" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("admin")}
        >
          Admin Panel
        </button>
      </div>

      {/* Conditional View */}
      {activeTab === "user" ? (
        <>
          <ComplaintForm setComplaints={setComplaints} />
          <hr className="my-6" />
          <ComplaintList complaints={complaints} setComplaints={setComplaints} />
        </>
      ) : (
        <AdminPanel />
      )}
    </div>
  );
};

export default App;
