import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PolicyTable from "./PolicyTable";
import AddNewPolicy from "./AddNewPolicy";
import Swal from "sweetalert2";
import { axiosSecure } from "../../../../hooks/useAxiosSecure";
import EditPolicyModal from "./EditPolicyModal";

const AdminPolicyPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
const [selectedPolicy, setSelectedPolicy] = useState(null);

  // 🔁 Fetch policies using TanStack Query
  const { data: policies = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['policies'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/policies`);
      return res.data;
    }
  });

  // ❌ Delete policy
 const handleDeletePolicy = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
     await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/policies/${id}`);
      refetch();
      Swal.fire("Deleted!", "The policy has been deleted.", "success");
    } catch (error) {
     Swal.fire("Error!", "Failed to delete the policy.", "error");
    }
  }
};

const handleEditPolicy = (policy) => {
  setSelectedPolicy(policy);
  setEditModalOpen(true);
};

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 🔘 Header & Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Policies</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Policy
        </button>
      </div>

      {/* 🔄 Loading/Error States */}
      {isLoading && <p className="text-center text-gray-500">Loading policies...</p>}
      {isError && <p className="text-center text-red-500">Failed to load policies.</p>}

      {/* ✅ Show Table */}
      {!isLoading && !isError && (
        <PolicyTable 
        policies={Array.isArray(policies?.policies) ? policies.policies : []} 
        onDelete={handleDeletePolicy} 
        onEdit={handleEditPolicy}
        />
      )}

      {/* ➕ Add New Policy Modal */}
      <AddNewPolicy
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        refetch={refetch}
      />

      {/* Edit Policy Modal */}
      <EditPolicyModal 
        modalOpen={editModalOpen}
        closeModal={() => setEditModalOpen(false)}
        policy={selectedPolicy}
        refetch={refetch}
        axiosSecure={axiosSecure}
      />
    </div>
  );
};

export default AdminPolicyPage;
