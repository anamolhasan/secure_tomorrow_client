import { FaEdit, FaTrash } from 'react-icons/fa';

const PolicyTable = ({ policies, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Age Range</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Coverage</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Duration</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Premium</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {policies?.map((policy, index) => (
            <tr key={policy._id} className="hover:bg-gray-50 transition duration-200">
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">
                <img
                  src={policy.image}
                  alt={policy.title}
                  className="w-12 h-12 object-cover rounded border"
                />
              </td>
              <td className="px-4 py-3">{policy.title}</td>
              <td className="px-4 py-3">{policy.category}</td>
              <td className="px-4 py-3">{policy.minAge} - {policy.maxAge}</td>
              <td className="px-4 py-3">{policy.coverageRange}</td>
              <td className="px-4 py-3">{policy.duration}</td>
              <td className="px-4 py-3">${policy.baseRate}</td>
              <td className="px-4 py-3 flex justify-center gap-4">
                <button
                  onClick={() => onEdit(policy)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => onDelete(policy._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!policies?.length && (
        <p className="text-center py-8 text-gray-400">No policies found.</p>
      )}
    </div>
  );
};

export default PolicyTable;
