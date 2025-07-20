import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditBlog = () => {
  const blog = useLoaderData();
  const { register, handleSubmit } = useForm({ defaultValues: blog });
  const navigate = useNavigate();

  const onSubmit = async (updatedData) => {
    const res = await fetch(`http://localhost:3000/blogs/${blog._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      Swal.fire("Updated!", "Blog updated successfully", "success");
      navigate("/dashboard/manage-blogs");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} className="w-full border p-2 rounded" />
        <input {...register("image")} className="w-full border p-2 rounded" />
        <textarea
          {...register("details")}
          className="w-full border p-2 rounded h-40"
        />
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default EditBlog;
