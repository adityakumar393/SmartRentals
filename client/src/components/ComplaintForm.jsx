import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ComplaintForm = ({ setComplaints }) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setStatus("Submitting...");

    const formData = new FormData();
    formData.append("user", user.email);
    formData.append("text", text);
    formData.append("image", image);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/complaints`, formData);
      setStatus("✅ Complaint submitted successfully!");
      setText("");
      setImage(null);
      setPreview(null);
      if (setComplaints) {
        setComplaints(prev => [res.data, ...prev]);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      setStatus("❌ Failed to submit complaint");
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white p-6 rounded-lg shadow max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">📣 Submit a Complaint</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe the issue"
            rows={4}
            className="w-full border px-3 py-2 rounded"
            required
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded border"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
          >
            Submit Complaint
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
        )}
      </div>
    </div>
  );
};

export default ComplaintForm;
