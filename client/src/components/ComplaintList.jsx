import React from "react";
import axios from "axios";

const ComplaintList = ({ complaints, setComplaints }) => {
  const handleResolve = async (id) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/complaints/${id}`
      );
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: res.data.status } : c))
      );
    } catch (err) {
      console.error("Error updating complaint:", err);
    }
  };

  if (complaints.length === 0) {
    return (
      <p className="text-center text-gray-600">No complaints submitted yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {complaints.map((complaint) => (
        <div key={complaint._id} className="bg-white shadow-md p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-blue-700">
              {complaint.user}
            </h3>

            <span
              className={`px-2 py-1 text-sm font-semibold rounded-full
              ${complaint.urgency === "High" ? "bg-red-100 text-red-800" : ""}
              ${complaint.urgency === "Medium" ? "bg-yellow-100 text-yellow-800" : ""}
              ${complaint.urgency === "Low" ? "bg-green-100 text-green-800" : ""}
            `}
            >
              Urgency: {complaint.urgency}
            </span>
          </div>

          <p className="text-gray-800">{complaint.text}</p>

          {complaint.imageUrl && (
            <img
              src={complaint.imageUrl}
              alt="Complaint"
              className="w-full h-[180px] object-cover mt-3 rounded-md"
            />
          )}

          <div className="mt-3 flex justify-between items-center">
            <span
              className={`px-3 py-1 text-sm rounded font-semibold text-white ${
                complaint.status === "Resolved" ? "bg-green-600" : "bg-yellow-600"
              }`}
            >
              {complaint.status}
            </span>

            {complaint.status === "Pending" && (
              <button
                onClick={() => handleResolve(complaint._id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
              >
                Mark Resolved
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
