import React from "react";
import PaymentsPanel from "../../components/payments/PaymentsPanel";

const Payments: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600">
          Manage wallet balance, payment actions, and funding deals.
        </p>
      </div>

      <PaymentsPanel />
    </div>
  );
};

export default Payments;