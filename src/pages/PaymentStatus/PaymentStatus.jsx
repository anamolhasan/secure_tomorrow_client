import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const PaymentStatus = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    data: policies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approvedPolicies"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/approved-policies`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">লোড হচ্ছে...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">ডেটা লোড করতে ব্যর্থ।</p>
    );

  const handlePay = (policy) => {
    setSelectedPolicy(policy);
    setShowModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        পেমেন্ট স্ট্যাটাস
      </h1>

      {policies.length === 0 && <p>No approved policies found.</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-2 text-left">Policy Name</th>
              <th className="border p-2 text-left">Premium</th>
              <th className="border p-2 text-left">Frequency</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => {
              const status = policy.paymentStatus || "Due";
              const statusColor =
                status === "Paid" ? "bg-green-600" : "bg-red-600";

              return (
                <tr key={policy._id} className="hover:bg-gray-50">
                  <td className="border p-2">{policy.policyName || "N/A"}</td>
                  <td className="border p-2">{policy.monthly || "-"}</td>
                  <td className="border p-2">
                    {policy.paymentFrequency || "Monthly"}
                  </td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${statusColor}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="border p-2">
                    {status === "Due" && (
                      <button
                        onClick={() => handlePay(policy)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedPolicy && (
       <div className="fixed inset-0 z-50 flex items-center justify-center ">
  <div className="bg-gradient-to-r from-gray-400 via-white to-amber-200 rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fade-in">
    <h2 className="text-xl font-semibold text-center mb-4 text-blue-700">
      {selectedPolicy.policyName} - Pay = ${selectedPolicy.monthly}
    </h2>

    <Elements stripe={stripePromise}>
      <PaymentForm
        policy={selectedPolicy}
  
        close={() => setShowModal(false)}
        
      />
    </Elements>
  </div>
</div>

      )}
    </div>
  );
};

export default PaymentStatus;
