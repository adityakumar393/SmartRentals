import React, { useState } from "react";
import axios from "axios";

const ComplaintForm = () => {
  const [user, setUser] = useState("");
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
    setStatus("Submitting...");

    const formData = new FormData();
    formData.append("user", user);
    formData.append("text", text);
    formData.append("image", image);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/complaints`, formData);

      setStatus("✅ Complaint submitted successfully!");
      setUser("");
      setText("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setStatus("❌ Failed to submit complaint");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Submit a Complaint
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Your Name"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe the issue"
            rows={4}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />

          {preview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Image preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded border"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
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
