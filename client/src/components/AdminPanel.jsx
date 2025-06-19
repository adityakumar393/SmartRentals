import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints`);
      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to fetch complaints", err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/complaints/${id}/status`, {
        status: newStatus,
      });
      fetchComplaints(); // Refresh
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Admin Panel – Manage Complaints</h2>
      <div className="grid gap-6">
        {complaints.length === 0 ? (
          <p>No complaints to display.</p>
        ) : (
          complaints.map((c) => (
            <div key={c._id} className="p-4 bg-gray-800 rounded-lg shadow">
              <img
                src={c.imageUrl}
                alt="Complaint"
                className="w-64 h-64 object-contain mb-2 rounded border"
              />
              <p><strong>User:</strong> {c.user}</p>
              <p><strong>Text:</strong> {c.text}</p>
              <p><strong>Status:</strong> {c.status}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
                onClick={() =>
                  updateStatus(c._id, c.status === "Pending" ? "Resolved" : "Pending")
                }
              >
                Mark as {c.status === "Pending" ? "Resolved" : "Pending"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
