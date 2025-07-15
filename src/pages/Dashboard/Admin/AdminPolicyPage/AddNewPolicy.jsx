import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../../api/utils";
// import useAxiosSecure from "./path-to-utils/useAxiosSecure";
// import { imageUpload } from "./path-to-utils/imageUpload";
// import useAuth from "./path-to-utils/useAuth";

const AddNewPolicy = ({ closeModal, modalOpen }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    try {
      setImageUploadError(null);
      const imageUrl = await imageUpload(image);
      setUploadedImage(imageUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      setImageUploadError("Image Upload Failed");
      toast.error("Image Upload Failed");
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!uploadedImage) {
      toast.error("Please upload an image first!");
      return;
    }

    setIsUploading(true);
    const form = e.target;

    const policyData = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      minAge: parseInt(form.minAge.value),
      maxAge: parseInt(form.maxAge.value),
      coverageRange: form.coverageRange.value,
      duration: form.duration.value,
      baseRate: parseFloat(form.baseRate.value),
      image: uploadedImage,
      createdBy: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
    };

    try {
      const { data } = await axiosSecure.post(`${import.meta.env.VITE_API_URL}/add-policies`, policyData);
      toast.success("Policy added successfully!");
      form.reset();
      setUploadedImage(null);
      closeModal();
      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add policy. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Dialog open={modalOpen} onClose={closeModal} as="div" className="relative z-10 focus:outline-none">
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel className="w-full max-w-3/5 bg-gray-200 px-8 backdrop-blur-2xl duration-300 ease-out shadow-xl rounded-2xl">
            <DialogTitle
              as="h3"
              className="text-3xl font-bold py-10 text-center leading-6 text-gray-900"
            >
              Add New Policy
            </DialogTitle>
            <Description className="text-gray-600 mb-6">
              Fill out the form below to add a new insurance policy.
            </Description>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Policy Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Category</label>
                <select
                  name="category"
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

              <div>
                <label className="block font-medium">Description</label>
                <textarea
                  name="description"
                  required
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block font-medium">Minimum Age</label>
                  <input
                    type="number"
                    name="minAge"
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block font-medium">Maximum Age</label>
                  <input
                    type="number"
                    name="maxAge"
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium">Coverage Range</label>
                <input
                  type="text"
                  name="coverageRange"
                  required
                  placeholder="e.g., $10,000 - $500,000"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Duration Options</label>
                <input
                  type="text"
                  name="duration"
                  required
                  placeholder="e.g., 10 years, 20 years"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Base Premium Rate ($)</label>
                <input
                  type="number"
                  name="baseRate"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Policy Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                  className="w-full"
                />
                {imageUploadError && (
                  <p className="text-red-600 mt-1">{imageUploadError}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Add Policy"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
        </div>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default AddNewPolicy;
