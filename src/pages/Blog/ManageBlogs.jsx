import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
// import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ManageBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: blogs = [], isLoading, refetch } = useQuery({
    queryKey: ["myBlogs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/blogs/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Blog has been deleted.", "success");
        refetch();
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading blogs...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <Link to="/dashboard/add-blog" className="btn btn-success btn-sm">
          + Add Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr key={blog._id}>
                  <td>{index + 1}</td>
                  <td>{blog.title}</td>
                  <td>{blog.category || "N/A"}</td>
                  <td>{blog.status || "Published"}</td>
                  <td className="text-center">
                    <Link
                      to={`/dashboard/edit-blog/${blog._id}`}
                      className="btn btn-sm btn-info mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
