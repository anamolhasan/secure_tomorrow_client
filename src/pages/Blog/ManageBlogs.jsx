import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const ManageBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role, isLoading: roleLoading } = useRole();

  const [search, setSearch] = useState('');

  const {
    data: blogs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['blogs', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email && !roleLoading,
  });

  // 🔍 client-side search (title match case-insensitive)
  const filteredBlogs = useMemo(() => {
    if (!search.trim()) return blogs;
    const q = search.toLowerCase();
    return blogs.filter((b) => b?.title?.toLowerCase().includes(q));
  }, [blogs, search]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This blog will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/blogs/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
        refetch();
      }
    }
  };

  if (isLoading || roleLoading) {
    return (
      <div className="p-4 text-center">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold">
          Manage Blogs <span className="text-sm opacity-70">({role})</span>
        </h2>
        <div className="flex gap-2">
          <div className="relative">
            <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search title..."
              className="input input-sm input-bordered pl-7 w-44 sm:w-60"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link to="/dashboard/add-blog" className="btn btn-sm btn-success whitespace-nowrap">
            + Add Blog
          </Link>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow border max-h-[70vh]">
        <table className="table w-full">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th>#</th>
              <th className="min-w-[180px]">Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Author</th>
              <th>Date</th>
              <th>Visits</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog, index) => (
              <tr key={blog._id} className="hover">
                <td>{index + 1}</td>
                {/* Title w/ tooltip */}
                <td title={blog.title} className="max-w-[220px] truncate">
                  {blog.title || 'Untitled'}
                </td>
                <td>
                  <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs">
                    {blog.category || 'N/A'}
                  </span>
                </td>
                <td>
                  <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs">
                    {blog.status || 'Published'}
                  </span>
                </td>
                <td>
                  <AuthorCell author={blog.author} authorEmail={blog.authorEmail} />
                </td>
                <td className="text-sm text-gray-500">
                  {blog.date || '-'}
                </td>
                <td className="text-center">
                  {blog.visits ?? 0}
                </td>
                <td className="text-center space-x-2 whitespace-nowrap">
                  <Link
                    to={`/dashboard/edit-blog/${blog._id}`}
                    className="btn btn-xs btn-outline btn-info"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="btn btn-xs btn-outline btn-error"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredBlogs.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No blogs match “{search}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden grid gap-4">
        {filteredBlogs.length === 0 && (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
        {filteredBlogs.map((blog, index) => (
          <div
            key={blog._id}
            className="p-4 rounded-lg border shadow-sm bg-white space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-lg leading-snug">{blog.title}</h3>
              <span className="text-xs opacity-60">#{index + 1}</span>
            </div>
            <AuthorMini author={blog.author} email={blog.authorEmail} date={blog.date} />
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600">
                {blog.category || 'N/A'}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                {blog.status || 'Published'}
              </span>
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                {blog.visits ?? 0} visits
              </span>
            </div>
            <div className="flex gap-2 pt-2">
              <Link
                to={`/dashboard/edit-blog/${blog._id}`}
                className="btn btn-xs btn-info flex-1"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="btn btn-xs btn-error flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ManageBlogs;

/* ----------------- small helper components ------------------ */

const AuthorCell = ({ author, authorEmail }) => {
  const img = author?.photo;
  const name = author?.name || authorEmail || 'Unknown';
  const email = author?.email || authorEmail || '—';

  return (
    <div className="flex items-center gap-2 max-w-[180px] truncate">
      {img ? (
        <img
          src={img}
          alt={name}
          className="w-6 h-6 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="w-6 h-6 rounded-full bg-gray-300 text-[10px] flex items-center justify-center uppercase">
          {name?.charAt(0) || '?'}
        </span>
      )}
      <div className="truncate">
        <div className="text-sm font-medium leading-none truncate">{name}</div>
        <div className="text-xs opacity-60 truncate">{email}</div>
      </div>
    </div>
  );
};

const AuthorMini = ({ author, email, date }) => (
  <div className="flex items-center gap-2 text-sm">
    {author?.photo ? (
      <img
        src={author.photo}
        alt={author.name}
        className="w-6 h-6 rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
    ) : (
      <span className="w-6 h-6 rounded-full bg-gray-300 text-[10px] flex items-center justify-center uppercase">
        {(author?.name || email || '?')?.charAt(0)}
      </span>
    )}
    <span className="font-medium">{author?.name || email || 'Unknown'}</span>
    <span className="text-xs opacity-60">• {date || '-'}</span>
  </div>
);
