import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const BlogCard = ({ blog }) => {
  const { _id, title, image, details, authorName, authorImage, date, visitCount } = blog;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleReadMore = async () => {
    try {
      await axiosSecure.patch(`/blogs/visit/${_id}`);
      navigate(`/blogs/${_id}`);
    } catch (err) {
      Swal.fire('Error', 'Could not increase visit count', 'error');
    }
  };

  return (
    <div className="border rounded-lg shadow p-4">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="mt-2 text-gray-600">{details?.slice(0, 100)}...</p>
      <div className="flex items-center mt-3">
        {authorImage && <img src={authorImage} className="w-8 h-8 rounded-full mr-2" />}
        <span className="text-sm font-medium">{authorName}</span>
      </div>
      <div className="text-sm text-gray-500 mt-1">
        Published: {new Date(date).toLocaleDateString()}
      </div>
      <div className="text-sm text-gray-500">Visits: {visitCount}</div>

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
