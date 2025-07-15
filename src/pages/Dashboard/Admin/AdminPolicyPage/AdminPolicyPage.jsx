import { useEffect, useState } from "react";
import axios from "axios";
import PolicyTable from "./PolicyTable";
import AddNewPolicy from "./AddNewPolicy";


const AdminPolicyPage = () => {
  const [policies, setPolicies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

console.log(policies)
  // Load all policies
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/policies`).then((res) => {
      setPolicies(res.data);
    });
  }, []);

  const closeModal = () => {
    setModalOpen(false)
  };



  const handleDeletePolicy = async (id) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    await axios.delete(`${import.meta.env.VITE_API_URL}/policies/${id}`);
    setPolicies((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Policies</h2>
        <button
          onClick={() => {
         
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          + Add New Policy
        </button>
      </div>

      <PolicyTable
  policies={policies}
  onDelete={handleDeletePolicy}
  // onEdit={handleEditPolicy}
/>

     <AddNewPolicy closeModal={closeModal} modalOpen={modalOpen}/>
    </div>
  );
};

export default AdminPolicyPage;
