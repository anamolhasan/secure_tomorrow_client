import { useParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useEffect } from 'react';

const BlogDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 📌 ভিজিট কাউন্ট বাড়ানোর useEffect
  useEffect(() => {
    const increaseVisit = async () => {
      try {
        await axiosSecure.patch(`/blogs/visit/${id}`);
        // ✅ ক্যাশ রিফ্রেশ
        queryClient.invalidateQueries(['blogs']);
      } catch (error) {
        console.error("Visit count update failed", error);
      }
    };

    increaseVisit();
  }, [id, axiosSecure, queryClient]);

  // 📌 Blog Details লোড করা
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blogDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center py-10">Loading blog...</p>;
  if (!blog) return <p className="text-center text-red-500">Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
        <span>By: {blog.author?.name}</span>
        <span> | Published: {new Date(blog.date).toLocaleDateString()}</span>
        <span> | Visits: {blog.visitCount}</span>
      </div>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-[400px] object-cover rounded-lg mb-6"
      />
      <div className="text-lg leading-relaxed text-gray-800">
        {blog.details}
      </div>
    </div>
  );
};

export default BlogDetails;
