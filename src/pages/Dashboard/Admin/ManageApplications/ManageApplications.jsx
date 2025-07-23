// pages/Admin/ManageApplications.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState(null);

  // Load Applications
  const { data: applications = [] } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  // Load Agents
  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents");
      return res.data;
    },
  });

  // Assign Agent or Reject Application
  const mutation = useMutation({
    mutationFn: async ({ id, status, agentEmail }) => {
      return await axiosSecure.patch(`/applications/${id}/status`, {
        status,
        agentEmail,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
      Swal.fire("Updated!", "Status updated successfully.", "success");
    },
  });

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Reject this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, status: "Rejected" });
      }
    });
  };

  const handleAssignAgent = (id, agentEmail) => {
    mutation.mutate({ id, status: "Approved", agentEmail });
  };

  return (
   <>
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Applications</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant</th>
              <th>Policy Info</th>
              <th>Date</th>
              <th>Status</th>
              <th>Assign Agent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>
                  <div>{app.fullName}</div>
                  <div className="text-sm text-gray-500">{app.email}</div>
                </td>
                <td>
                  {app.coverage}$ / {app.duration} yrs
                </td>
                <td>{new Date(app.submittedAt).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      app.status === "Pending"
                        ? "badge-warning"
                        : app.status === "Rejected"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  <select
                    defaultValue=""
                    className="select select-sm"
                    onChange={(e) =>
                      handleAssignAgent(app._id, e.target.value)
                    }
                    disabled={app.status !== "Pending"}
                  >
                    <option disabled value="">
                      Select Agent
                    </option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent.email}>
                        {agent.name || agent.email}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleReject(app._id)}
                    className="btn btn-xs btn-error"
                    disabled={app.status !== "Pending"}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => setSelectedApp(app)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Viewing Details */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[400px]">
            <h3 className="text-lg font-bold mb-3">Application Details</h3>
            <p><strong>Name:</strong> {selectedApp.fullName}</p>
            <p><strong>NID:</strong> {selectedApp.nid}</p>
            <p><strong>Coverage:</strong> ${selectedApp.coverage}</p>
            <p><strong>Duration:</strong> {selectedApp.duration} Years</p>
            <p><strong>Smoker:</strong> {selectedApp.smoker}</p>
            <p><strong>Nominee:</strong> {selectedApp.nomineeName} ({selectedApp.nomineeRelation})</p>
            <button
              onClick={() => setSelectedApp(null)}
              className="mt-4 btn btn-sm btn-neutral"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
   
   </>
  );
};

export default ManageApplications;
