import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const OtpVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    setError("");

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp === "123456") {
      navigate("/dashboard/entrepreneur");
    } else {
      setError("Invalid OTP. Use mock code 123456");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 text-center">2FA Verification</h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter the 6-digit OTP sent to your device
        </p>

        <div className="flex justify-center gap-3 mt-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}

        <button
          onClick={handleVerify}
          className="w-full mt-8 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-medium transition"
        >
          Verify OTP
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Mock OTP: 123456
        </p>
      </div>
    </div>
  );
};