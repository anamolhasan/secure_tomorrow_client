import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const AddBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const blogData = {
      title: data.title,
      image: data.image,
      details: data.details,
      author: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
      date: new Date().toLocaleDateString(),
      visits: 0,
    };

    const res = await fetch("http://localhost:3000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    if (res.ok) {
      Swal.fire("Success!", "Blog posted successfully", "success");
      reset();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          placeholder="Blog Title"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("image", { required: true })}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />
        <textarea
          {...register("details", { required: true })}
          placeholder="Blog Content"
          className="w-full border p-2 rounded h-40"
        />
        <button type="submit" className="btn btn-primary">Publish</button>
      </form>
    </div>
  );
};

export default AddBlog;
