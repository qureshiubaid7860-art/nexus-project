import React, { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";

type TransactionStatus = "Completed" | "Pending" | "Failed";
type TransactionType = "Deposit" | "Withdraw" | "Transfer" | "Funding";

interface Transaction {
  id: number;
  date: string;
  type: TransactionType;
  amount: number;
  sender: string;
  receiver: string;
  status: TransactionStatus;
}

const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: "2026-03-20",
    type: "Deposit",
    amount: 5000,
    sender: "Bank Account",
    receiver: "Nexus Wallet",
    status: "Completed",
  },
  {
    id: 2,
    date: "2026-03-19",
    type: "Transfer",
    amount: 1200,
    sender: "Investor Wallet",
    receiver: "Startup Alpha",
    status: "Pending",
  },
  {
    id: 3,
    date: "2026-03-18",
    type: "Withdraw",
    amount: 700,
    sender: "Nexus Wallet",
    receiver: "Personal Account",
    status: "Completed",
  },
];

const PaymentsPanel: React.FC = () => {
  const [balance, setBalance] = useState(24500);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [activeAction, setActiveAction] = useState<"Deposit" | "Withdraw" | "Transfer">("Deposit");
  const [amount, setAmount] = useState("");
  const [partyName, setPartyName] = useState("");
  const [dealTitle, setDealTitle] = useState("Seed Round Support");
  const [entrepreneurName, setEntrepreneurName] = useState("");

  const totalReceived = useMemo(() => {
    return transactions
      .filter((item) => item.type === "Deposit" || item.type === "Funding")
      .reduce((sum, item) => sum + item.amount, 0);
  }, [transactions]);

  const totalSent = useMemo(() => {
    return transactions
      .filter((item) => item.type === "Withdraw" || item.type === "Transfer")
      .reduce((sum, item) => sum + item.amount, 0);
  }, [transactions]);

  const resetActionForm = () => {
    setAmount("");
    setPartyName("");
  };

  const addTransaction = (type: "Deposit" | "Withdraw" | "Transfer") => {
    const parsedAmount = Number(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if ((type === "Withdraw" || type === "Transfer") && parsedAmount > balance) {
      alert("Insufficient wallet balance");
      return;
    }

    const today = new Date().toLocaleDateString("en-CA");

    let newTransaction: Transaction = {
      id: Date.now(),
      date: today,
      type,
      amount: parsedAmount,
      sender: "Nexus Wallet",
      receiver: "Nexus Wallet",
      status: "Completed",
    };

    if (type === "Deposit") {
      newTransaction = {
        ...newTransaction,
        sender: partyName || "Bank Account",
        receiver: "Nexus Wallet",
      };
      setBalance((prev) => prev + parsedAmount);
    }

    if (type === "Withdraw") {
      newTransaction = {
        ...newTransaction,
        sender: "Nexus Wallet",
        receiver: partyName || "Personal Account",
      };
      setBalance((prev) => prev - parsedAmount);
    }

    if (type === "Transfer") {
      newTransaction = {
        ...newTransaction,
        sender: "Nexus Wallet",
        receiver: partyName || "Another User",
      };
      setBalance((prev) => prev - parsedAmount);
    }

    setTransactions((prev) => [newTransaction, ...prev]);
    resetActionForm();
  };

  const handleFundingDeal = () => {
    const parsedAmount = Number(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      alert("Please enter a valid funding amount");
      return;
    }

    if (parsedAmount > balance) {
      alert("Insufficient wallet balance for funding");
      return;
    }

    const fundingTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-CA"),
      type: "Funding",
      amount: parsedAmount,
      sender: "Investor Wallet",
      receiver: entrepreneurName || "Entrepreneur",
      status: "Completed",
    };

    setTransactions((prev) => [fundingTransaction, ...prev]);
    setBalance((prev) => prev - parsedAmount);
    setAmount("");
    setEntrepreneurName("");
    alert(`Deal funded successfully for "${dealTitle}"`);
  };

  const getStatusClasses = (status: TransactionStatus) => {
    if (status === "Completed") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow rounded-xl">
          <CardBody>
            <p className="text-sm text-gray-500">Wallet Balance</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">${balance.toLocaleString()}</h2>
            <p className="mt-2 text-sm text-gray-500">Updated from mock payment activity</p>
          </CardBody>
        </Card>

        <Card className="shadow rounded-xl">
          <CardBody>
            <p className="text-sm text-gray-500">Total Received</p>
            <h3 className="mt-2 text-2xl font-semibold text-gray-900">${totalReceived.toLocaleString()}</h3>
            <p className="mt-2 text-sm text-gray-500">Deposits and funded deals</p>
          </CardBody>
        </Card>

        <Card className="shadow rounded-xl">
          <CardBody>
            <p className="text-sm text-gray-500">Total Sent</p>
            <h3 className="mt-2 text-2xl font-semibold text-gray-900">${totalSent.toLocaleString()}</h3>
            <p className="mt-2 text-sm text-gray-500">Withdrawals and transfers</p>
          </CardBody>
        </Card>
      </div>

      <Card className="shadow rounded-xl">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Payment Actions</h2>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap gap-3 mb-5">
            {(["Deposit", "Withdraw", "Transfer"] as const).map((action) => (
              <button
                key={action}
                onClick={() => setActiveAction(action)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeAction === action
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {action}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeAction === "Deposit"
                  ? "Deposit From"
                  : activeAction === "Withdraw"
                  ? "Withdraw To"
                  : "Transfer To"}
              </label>
              <input
                type="text"
                placeholder="Enter name"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </div>

          <div className="mt-5">
            <Button onClick={() => addTransaction(activeAction)}>
              Confirm {activeAction}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="shadow rounded-xl">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Fund a Deal</h2>
          <p className="text-sm text-gray-500">Mock investor to entrepreneur funding flow</p>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deal Title</label>
              <input
                type="text"
                value={dealTitle}
                onChange={(e) => setDealTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Entrepreneur</label>
              <input
                type="text"
                placeholder="Enter entrepreneur name"
                value={entrepreneurName}
                onChange={(e) => setEntrepreneurName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Funding Amount</label>
              <input
                type="number"
                placeholder="Enter funding amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </div>

          <div className="mt-5">
            <button
              onClick={handleFundingDeal}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition"
            >
              Fund Deal
            </button>
          </div>
        </CardBody>
      </Card>

      <Card className="shadow rounded-xl">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Sender</th>
                  <th className="py-3 px-3">Receiver</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id} className="border-b last:border-b-0">
                    <td className="py-3 px-3">{item.date}</td>
                    <td className="py-3 px-3">{item.type}</td>
                    <td className="py-3 px-3">${item.amount.toLocaleString()}</td>
                    <td className="py-3 px-3">{item.sender}</td>
                    <td className="py-3 px-3">{item.receiver}</td>
                    <td className="py-3 px-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PaymentsPanel;