// import BlogCard from "../components/BlogCard";
// import useBlogs from "../hooks/useBlogs";
// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import useBlogs from "../../hooks/useBlogs";
import useAuth from "../../hooks/useAuth";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const { blogs, isLoading, refetch } = useBlogs();
  const { user, role } = useAuth();

  const myBlogs = role === 'admin'
    ? blogs
    : blogs.filter(blog => blog.author.email === user?.email);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "This blog will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`http://localhost:3000/blogs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
        refetch();
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myBlogs.map(blog => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onDelete={handleDelete}
            isOwner={role === 'admin' || blog.author.email === user?.email}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
