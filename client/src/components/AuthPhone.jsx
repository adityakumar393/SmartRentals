// // src/components/AuthPhone.jsx
// import React, { useState } from "react";
// import { auth } from "../firebase";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// const AuthPhone = ({ onLogin }) => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirm, setConfirm] = useState(null);
//   const [error, setError] = useState("");

//   const setupRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
//       size: "invisible",
//       callback: () => handleSendOTP(),
//     }, auth);
//   };

//   const handleSendOTP = async () => {
//     setError("");
//     if (!phone.startsWith("+91")) {
//       setError("Phone must be in +91XXXXXXXXXX format.");
//       return;
//     }

//     setupRecaptcha();
//     try {
//       const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
//       setConfirm(confirmation);
//     } catch (err) {
//       setError("OTP send failed: " + err.message);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     try {
//       const res = await confirm.confirm(otp);
//       onLogin(res.user);
//     } catch (err) {
//       setError("OTP verification failed: " + err.message);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded shadow max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4 text-blue-700">🔐 Phone Login</h2>
//       <input
//         type="tel"
//         placeholder="+91XXXXXXXXXX"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         className="border p-2 w-full mb-3 rounded"
//       />
//       <div id="recaptcha-container"></div>
//       <button onClick={handleSendOTP} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//         Send OTP
//       </button>

//       {confirm && (
//         <>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="border p-2 w-full mt-4 rounded"
//           />
//           <button onClick={handleVerifyOTP} className="bg-green-600 text-white px-4 py-2 rounded w-full mt-2">
//             Verify OTP
//           </button>
//         </>
//       )}
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// };

// export default AuthPhone;
