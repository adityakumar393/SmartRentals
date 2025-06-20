import React, { useEffect, useState } from "react";
import axios from "axios";

const AgreementDashboard = () => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    fetchAgreements();
  }, []);

  const fetchAgreements = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/agreements`);
      setAgreements(res.data);
    } catch (err) {
      console.error("Error fetching agreements:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this agreement?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/agreements/${id}`);
      setAgreements(agreements.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">📚 All Agreements</h2>
      {agreements.length === 0 ? (
        <p className="text-gray-500">No agreements found.</p>
      ) : (
        agreements.map((a) => (
          <div key={a._id} className="p-4 border rounded mb-4 bg-gray-50">
            <p><strong>Landlord:</strong> {a.landlord}</p>
            <p><strong>Tenant:</strong> {a.tenant}</p>
            <p><strong>Property:</strong> {a.property}</p>
            <p><strong>Rent:</strong> ₹{a.rent}</p>
            <p><strong>From:</strong> {a.startDate}</p>
            <p><strong>To:</strong> {a.endDate}</p>
            <div className="mt-2 flex gap-3">
              {/* We'll wire up edit later */}
              <button className="px-3 py-1 text-sm bg-red-600 text-white rounded" onClick={() => handleDelete(a._id)}>
                Delete
              </button>
              {/* Future: Add Edit here */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AgreementDashboard;
