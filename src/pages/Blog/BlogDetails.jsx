import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`http://localhost:3000/blogs/${id}`, {
        method: "PATCH", // increment visit
      });
      const data = await res.json();
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover" />
      <div className="text-gray-700">
        <p>{blog.details}</p>
        <p className="text-sm mt-4">
          Author: <strong>{blog.author?.name}</strong> | Date: {blog.date}
        </p>
        <p className="text-sm text-gray-400">Total Visits: {blog.visits}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
