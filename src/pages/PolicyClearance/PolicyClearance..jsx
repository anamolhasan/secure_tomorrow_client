import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AgentPolicyClearance = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // Fetch all pending claims
  const { data: claims = [], refetch, isLoading } = useQuery({
    queryKey: ["pendingClaims"],
    queryFn: async () => {
      const res = await axiosSecure.get("/claims?status=pending");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/claims/${id}`, {
        status: "approved",
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Claim approved successfully!");
        setSelectedPolicy(null);
        refetch();
      }
    } catch (err) {
      toast.error("Failed to approve claim");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Policy Clearance</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : claims.length === 0 ? (
        <p className="text-gray-500">No pending claims found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Policy Name</th>
                <th className="p-3">Customer Email</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((policy, index) => (
                <tr key={policy._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{policy.policyName}</td>
                  <td className="p-3">{policy.customerEmail}</td>
                  <td className="p-3">${policy.claimAmount}</td>
                  <td className="p-3 capitalize">{policy.status}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedPolicy(policy)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg relative">
            <button
              onClick={() => setSelectedPolicy(null)}
              className="absolute top-2 right-3 text-gray-500 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-3">
              {selectedPolicy.policyName}
            </h3>
            <p>
              <strong>Customer:</strong> {selectedPolicy.customerEmail}
            </p>
            <p>
              <strong>Amount:</strong> ${selectedPolicy.claimAmount}
            </p>
            <p>
              <strong>Description:</strong> {selectedPolicy.reason}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{selectedPolicy.status}</span>
            </p>

            <button
              onClick={() => handleApprove(selectedPolicy._id)}
              className="mt-5 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Approve
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentPolicyClearance;
