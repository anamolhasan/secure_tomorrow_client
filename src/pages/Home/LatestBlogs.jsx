import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const LatestBlogs = () => {
  const axiosPublic = useAxiosPublic();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['latestBlogs'],
    queryFn: async () => {
      const res = await axiosPublic.get('/blogs-public');
      return res.data.slice(-4).reverse(); // সর্বশেষ ৪টি
    }
  });

  if (isLoading) return <p className="text-center text-lg">Loading latest blogs...</p>;

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Latest Blog & Articles</h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {blogs.map(blog => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-4">{blog.details?.slice(0, 120)}...</p>
                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-sm text-blue-600 font-semibold hover:underline inline-flex items-center"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition duration-300"
          >
            All Blog/Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
