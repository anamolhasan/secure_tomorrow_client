import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const BlogCard = ({ blog }) => {
  const { _id, title, image, details, authorName, authorImage, date, visitCount, author } = blog;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleReadMore = async () => {
  try {
    const res = await axiosSecure.patch(`/blogs/${_id}/visit`);
    console.log('Visit count update response:', res.data);
    navigate(`/blogs/${_id}`);
  } catch (err) {
    console.error("Visit count update failed:", err);
    Swal.fire('Error', 'Failed to update visit count', 'error');
  }
};


  return (
    <div className="border rounded-lg shadow p-4">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="mt-2 text-gray-600">{details?.slice(0, 100)}...</p>
      <div className="flex items-center mt-3 gap-3">
  {author?.photo && (
    <img
      src={author.photo}
      alt={author.name}
      className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow-sm"
    />
  )}
  <div className="text-sm">
    <p className="font-semibold text-gray-800">{author?.name}</p>
    <p className="text-gray-500">{author?.email}</p>
  </div>
</div>

      <div className="text-sm text-gray-500 mt-1">
        Published: {new Date(date).toLocaleDateString()}
      </div>
      <div className="text-sm text-gray-500">Visits: {visitCount?visitCount:'0'}</div>

      <button
        onClick={handleReadMore}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
      >
        Read More
      </button>
    </div>
  );
};

export default BlogCard;
