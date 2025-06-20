import React from "react";

const ComplaintList = ({ complaints = [], setComplaints }) => {
  if (!Array.isArray(complaints)) {
    console.error("Expected array but got:", complaints);
    return <p>Error loading complaints.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">📋 All Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="p-4 bg-white rounded shadow-md"
          >
            {complaint.imageUrl && (
              <img
                src={complaint.imageUrl}
                alt="Complaint"
                className="w-32 h-32 object-contain mb-2"
              />
            )}
            <p><strong>User:</strong> {complaint.user}</p>
            <p><strong>Text:</strong> {complaint.text}</p>
            <p><strong>Status:</strong> {complaint.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ComplaintList;
