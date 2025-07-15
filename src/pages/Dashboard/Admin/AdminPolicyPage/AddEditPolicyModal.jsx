import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
// import useAuth from "../../../hooks/useAuth";

const AddEditPolicyModal = ({ closeModal, onAdd, onEdit, editingPolicy }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    minAge: "",
    maxAge: "",
    coverage: "",
    duration: "",
    basePremium: "",
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (editingPolicy) {
      setFormData({
        ...editingPolicy,
        image: null, // New upload not selected yet
      });
      setPreviewUrl(editingPolicy.image);
    }
  }, [editingPolicy]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = previewUrl;

      // If a new image is selected
      if (formData.image) {
        const imageData = new FormData();
        imageData.append("image", formData.image);

        const imgbbRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          imageData
        );
        imageUrl = imgbbRes.data.data.display_url;
      }

      const policyData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        minAge: parseInt(formData.minAge),
        maxAge: parseInt(formData.maxAge),
        coverage: parseInt(formData.coverage),
        duration: formData.duration,
        basePremium: parseFloat(formData.basePremium),
        image: imageUrl,
        createdBy: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        },
      };

      if (editingPolicy) {
        // Update
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/policies/${editingPolicy._id}`,
          policyData
        );
        toast.success("✅ Policy updated");
        onEdit({ ...res.data, _id: editingPolicy._id });
      } else {
        // Add new
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/add-policies`,
          policyData , { withCredentials: true, }
        );
        toast.success("✅ Policy added");
        onAdd(res.data);
      }

      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl relative">
        <h2 className="text-xl font-semibold mb-4">
          {editingPolicy ? "Edit Policy" : "Add New Policy"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Policy Title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="minAge"
              placeholder="Minimum Age"
              value={formData.minAge}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="maxAge"
              placeholder="Maximum Age"
              value={formData.maxAge}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="coverage"
              placeholder="Coverage Amount"
              value={formData.coverage}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g. 10 years)"
              value={formData.duration}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="basePremium"
              placeholder="Base Premium"
              value={formData.basePremium}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
            required
          />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded"
            />
          )}

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {editingPolicy ? "Update Policy" : "Add Policy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditPolicyModal;
