import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const MyPolicies = () => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const {user} = useAuth()

  // Fetch user policies
  const { data: policies = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["myPolicies"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-policies`, { withCredentials: true });
      return res.data;
    },
  });
console.log(policies)
  // Open review modal with selected policy
  const openReviewModal = (policy) => {
    setSelectedPolicy(policy);
    setRating(0);
    setFeedback("");
    setReviewModalOpen(true);
  };

  // Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      Swal.fire("Error", "Please select a star rating", "error");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews`,
        {
          policyId: selectedPolicy._id,
          rating,
          feedback,
          userEmail: user?.email,
        },
        { withCredentials: true }
      );
      Swal.fire("Success", "Review submitted successfully", "success");
      setReviewModalOpen(false);
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading policies...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load policies.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Policies</h1>

      {policies.length === 0 && <p>No policies applied yet.</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Policy Name</th>
            <th className="border border-gray-300 p-2 text-left">Status</th>
            <th className="border border-gray-300 p-2 text-left">Coverage</th>
            <th className="border border-gray-300 p-2 text-left">Duration</th>
            <th className="border border-gray-300 p-2 text-left">Premium</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{policy.policyName || "N/A"}</td>
              <td className="border border-gray-300 p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    policy.status === "Approved"
                      ? "bg-green-600"
                      : policy.status === "Rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {policy.status}
                </span>
              </td>
              <td className="border border-gray-300 p-2">{policy.coverage || "-"}</td>
              <td className="border border-gray-300 p-2">{policy.duration || "-"}</td>
              <td className="border border-gray-300 p-2">{policy.monthly || "-"}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => openReviewModal(policy)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Give Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Submit Review</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Star Rating:</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      filled={star <= rating}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="feedback">
                  Feedback:
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={4}
                  placeholder="Write your feedback here..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple star icon component
const Star = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className={`h-8 w-8 cursor-pointer ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.455a1 1 0 00-.364 1.118l1.287 3.973c.3.92-.755 1.688-1.54 1.118l-3.388-2.455a1 1 0 00-1.175 0l-3.388 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.973a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
  </svg>
);

export default MyPolicies;
