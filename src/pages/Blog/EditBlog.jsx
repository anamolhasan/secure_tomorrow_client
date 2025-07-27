import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const EditBlog = () => {
  const blog = useLoaderData();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: blog?.title || "",
      image: blog?.image || "",
      details: blog?.details || "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${blog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire("Updated!", result.message || "Blog updated successfully", "success");
        navigate("/dashboard/manage-blogs");
      } else {
        Swal.fire("Error", result.message || "Update failed", "error");
      }
    } catch (error) {
      console.error("Update Error:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          className="w-full border p-2 rounded"
          placeholder="Blog Title"
        />
        <input
          {...register("image", { required: true })}
          className="w-full border p-2 rounded"
          placeholder="Image URL"
        />
        <textarea
          {...register("details", { required: true })}
          className="w-full border p-2 rounded h-40"
          placeholder="Blog Details"
        />
        <button type="submit" className="btn btn-success">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
