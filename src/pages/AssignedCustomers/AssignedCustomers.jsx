import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const AssignedCustomers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [updatingId, setUpdatingId] = useState(null);

  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ["assignedApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/agent");
      return res.data;
    },
  });

  const handleStatusChange = async (appId, newStatus, policyId) => {
    setUpdatingId(appId);
    try {
      const res = await axiosSecure.patch(`/application-status/${appId}`, {
        status: newStatus,
        policyId,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Status updated successfully", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Assigned Customers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Policy Name</th>
              <th>Application Status</th>
              <th>Change Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.policyName}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      app.status === "Approved"
                        ? "bg-green-500"
                        : app.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  <select
                    className="border px-2 py-1 rounded"
                    value={app.status}
                    disabled={updatingId === app._id}
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value, app.policyId)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  {/* Optional: View Details Modal Button */}
                  <button className="btn btn-sm btn-info text-white">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-4">
                  No assigned applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedCustomers;
