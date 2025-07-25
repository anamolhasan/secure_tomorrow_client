import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

const PaymentStatus = () => {
  const navigate = useNavigate();

  const { data: policies = [], isLoading, isError } = useQuery({
    queryKey: ["approvedPolicies"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/approved-policies`, {
        withCredentials: true,
      });
      return res.data;
    },
  });
console.log(policies)
  if (isLoading) return <p className="text-center mt-10">Loading approved policies...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load policies.</p>;

  const handlePay = (policyId) => {
    navigate(`/payment/${policyId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Payment Status</h1>

      {policies.length === 0 && <p>No approved policies found.</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Policy Name</th>
            <th className="border border-gray-300 p-2 text-left">Premium Amount</th>
            <th className="border border-gray-300 p-2 text-left">Payment Frequency</th>
            <th className="border border-gray-300 p-2 text-left">Payment Status</th>
            <th className="border border-gray-300 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => {
            const status = policy.paymentStatus || "Due";
            const statusColor = status === "Paid" ? "bg-green-600" : "bg-red-600";

            return (
              <tr key={policy._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{policy.policyName || "N/A"}</td>
                <td className="border border-gray-300 p-2">{policy.monthly || "-"}</td>
                <td className="border border-gray-300 p-2">{policy.paymentFrequency || "Monthly"}</td>
                <td className="border border-gray-300 p-2">
                  <span className={`px-2 py-1 rounded text-white ${statusColor}`}>
                    {status}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">
                  {status === "Due" && (
                    <button
                      onClick={() => handlePay(policy._id)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentStatus;
