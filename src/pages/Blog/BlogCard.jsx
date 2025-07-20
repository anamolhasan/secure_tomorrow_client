import { Link } from "react-router";

const BlogCard = ({ blog, onDelete, isOwner }) => {
  const { _id, title, image, details, author, date, visits } = blog;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">{details?.slice(0, 100)}...</p>
        <p className="text-sm text-gray-500">
          By <span className="font-medium">{author.name}</span> | {date}
        </p>
        <p className="text-sm text-gray-400">Visited: {visits}</p>
        <div className="flex justify-between mt-3">
          <Link to={`/blogs/${_id}`} className="text-blue-600 hover:underline">
            Read More
          </Link>
          {isOwner && (
            <div className="space-x-2">
              <Link
                to={`/dashboard/edit-blog/${_id}`}
                className="text-green-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(_id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
