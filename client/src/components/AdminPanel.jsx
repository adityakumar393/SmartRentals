// src/components/AdminPanel.jsx
import React from "react";
import axios from "axios";

const AdminPanel = ({ complaints, setComplaints }) => {
  const handleResolve = async (id) => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/complaints/${id}`);

      // Update status in UI after resolving
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint._id === id ? { ...complaint, status: "Resolved" } : complaint
        )
      );
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">🛠️ Admin Panel</h2>

      {complaints.length === 0 ? (
        <p className="text-gray-500 text-center">No complaints available.</p>
      ) : (
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="border border-gray-200 p-4 rounded shadow-sm bg-gray-50"
            >
              <p><strong>User:</strong> {complaint.user}</p>
              <p><strong>Description:</strong> {complaint.text}</p>
              {complaint.imageUrl && (
                <img
                  src={complaint.imageUrl}
                  alt="Complaint"
                  className="w-48 h-32 object-cover mt-2 border rounded"
                />
              )}
              <p className="mt-2">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    complaint.status === "Resolved"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }
                >
                  {complaint.status}
                </span>
              </p>
              {complaint.status !== "Resolved" && (
                <button
                  onClick={() => handleResolve(complaint._id)}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
