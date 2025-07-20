// import { useLocation } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const ApplicationForm = () => {
  const { state } = useLocation();
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const fullData = { ...state?.form, ...data };
      const res = await axiosSecure.post("/submit-application", fullData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Your application has been submitted!", "success");
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Application Form</h2>

      <input {...register("fullName")} className="input" placeholder="Full Name" />
      <input {...register("address")} className="input" placeholder="Address" />
      <input {...register("nid") } className="input" placeholder="NID Number" />

      <h3 className="font-semibold">Nominee Info</h3>
      <input {...register("nomineeName")} className="input" placeholder="Nominee Name" />
      <input {...register("nomineeRelation")} className="input" placeholder="Relationship" />

      <h3 className="font-semibold">Health Info</h3>
      <label><input type="checkbox" value="diabetes" {...register("healthInfo")} /> Diabetes</label>
      <label><input type="checkbox" value="heart" {...register("healthInfo")} /> Heart Issue</label>

      <button className="btn" type="submit">Submit Application</button>
    </form>
  );
};

export default ApplicationForm;
