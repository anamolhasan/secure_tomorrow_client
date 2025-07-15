// src/components/EditPolicyModal.jsx
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { imageUpload } from "../../../../api/utils";

const EditPolicyModal = ({ modalOpen, closeModal, policy, refetch, axiosSecure }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    minAge: 0,
    maxAge: 0,
    coverageRange: "",
    duration: "",
    baseRate: 0,
    image: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  // যখন modal খোলা হবে, তখন policy থেকে ডাটা বসিয়ে দেবে
  useEffect(() => {
    if (policy) {
      const { _id, ...rest } = policy; // _id বাদ দাও
      setFormData(rest);
    }
  }, [policy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // number ফিল্ডগুলো numeric করে ফেলি
    const numericFields = ["minAge", "maxAge", "baseRate"];
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imgUrl = await imageUpload(file);
      setFormData((prev) => ({
        ...prev,
        image: imgUrl,
      }));
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/policies/${policy._id}`,
        formData
      );
      toast.success("Policy updated successfully!");
      closeModal();
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update policy.");
    }
  };

  return (
    <>
      <Dialog open={modalOpen} onClose={closeModal} as="div" className="relative z-10 focus:outline-none">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
              <DialogTitle className="text-xl font-bold mb-4">Edit Policy</DialogTitle>
              <Description className="text-gray-600 mb-4">
                Modify the fields below and save changes.
              </Description>
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Title */}
                <div>
                  <label className="block font-medium">Policy Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                {/* Category */}
                <div>
                  <label className="block font-medium">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Category</option>
                    <option value="Term Life">Term Life</option>
                    <option value="Senior">Senior</option>
                    <option value="Child">Child</option>
                    <option value="Whole Life">Whole Life</option>
                  </select>
                </div>
                {/* Description */}
                <div>
                  <label className="block font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                {/* Min Age and Max Age */}
                <div className="flex gap-3">
                  <div className="w-1/2">
                    <label className="block font-medium">Min Age</label>
                    <input
                      type="number"
                      name="minAge"
                      value={formData.minAge}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block font-medium">Max Age</label>
                    <input
                      type="number"
                      name="maxAge"
                      value={formData.maxAge}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                {/* Coverage Range */}
                <div>
                  <label className="block font-medium">Coverage Range</label>
                  <input
                    type="text"
                    name="coverageRange"
                    value={formData.coverageRange}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                {/* Duration */}
                <div>
                  <label className="block font-medium">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                {/* Base Rate */}
                <div>
                  <label className="block font-medium">Base Premium Rate ($)</label>
                  <input
                    type="number"
                    name="baseRate"
                    value={formData.baseRate}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                {/* Image */}
                <div>
                  <label className="block font-medium">Policy Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 bg-gray-100 rounded"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mt-2 h-20 border rounded"
                    />
                  )}
                </div>
                {/* Actions */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isUploading ? "Uploading..." : "Update Policy"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
   
    </>
  );
};

export default EditPolicyModal;
