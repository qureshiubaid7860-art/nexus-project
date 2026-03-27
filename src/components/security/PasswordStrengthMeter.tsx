import React from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const getStrength = () => {
    let score = 0;

    if (password.length >= 6) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (password.length === 0) {
      return {
        label: "Enter a password",
        width: "0%",
        color: "bg-gray-200",
        textColor: "text-gray-500",
      };
    }

    if (score <= 1) {
      return {
        label: "Weak",
        width: "33%",
        color: "bg-red-500",
        textColor: "text-red-600",
      };
    }

    if (score <= 3) {
      return {
        label: "Medium",
        width: "66%",
        color: "bg-yellow-500",
        textColor: "text-yellow-600",
      };
    }

    return {
      label: "Strong",
      width: "100%",
      color: "bg-green-500",
      textColor: "text-green-600",
    };
  };

  const strength = getStrength();

  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${strength.color} transition-all duration-300`}
          style={{ width: strength.width }}
        />
      </div>
      <p className={`text-sm mt-2 font-medium ${strength.textColor}`}>
        Password Strength: {strength.label}
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;