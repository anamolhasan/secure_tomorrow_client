const PolicyTable = ({ policies, onEdit, onDelete }) => {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th>Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Age</th>
          <th>Coverage</th>
          <th>Duration</th>
          <th>Premium</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {policies.map((policy) => (
          <tr key={policy._id} className="text-center border-t">
            <td>
              <img src={policy.image} alt="" className="w-12 h-12 mx-auto" />
            </td>
            <td>{policy.title}</td>
            <td>{policy.category}</td>
            <td>
              {policy.minAge} - {policy.maxAge}
            </td>
            <td>{policy.coverage}</td>
            <td>{policy.duration}</td>
            <td>${policy.basePremium}</td>
            <td>
              <button
                className="text-blue-500 hover:underline mr-2"
                onClick={() => onEdit(policy)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => onDelete(policy._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default PolicyTable;
