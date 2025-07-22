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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9; // এক পেজে কতগুলো আইটেম দেখাবেন

  // 🔁 Fetch policies with pagination using TanStack Query
  const { data = {}, isLoading, isError, refetch } = useQuery({
    queryKey: ['policies', currentPage],  // currentPage এর ওপর ডিপেন্ড করে রিফ্রেশ হবে
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/policies?page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true, // পেজ চেঞ্জে পুরানো ডেটা দেখাবে যতক্ষণ না নতুন লোড হয়
  });

  const policies = Array.isArray(data?.policies) ? data.policies : [];
  const totalPages = data.totalPages || 1;

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
          policies={policies}
          onDelete={handleDeletePolicy}
          onEdit={handleEditPolicy}
        />
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-6 space-x-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold shadow ${
              currentPage === index + 1
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

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
