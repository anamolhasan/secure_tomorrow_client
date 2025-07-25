import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const healthOptions = [
  { label: "Diabetes", value: "diabetes" },
  { label: "Heart Issue", value: "heart" },
  { label: "High Blood Pressure", value: "high_blood_pressure" },
  { label: "Asthma", value: "asthma" },
  { label: "Cancer", value: "cancer" },
  { label: "None", value: "none" },
];

const ApplicationForm = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.displayName || state?.form?.fullName || "",
      email: user?.email || state?.form?.email || "",
      address: "",
      nid: "",
      nomineeName: "",
      nomineeRelation: "",
      healthInfo: [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (!data.email && state?.form?.email) data.email = state.form.email;

      const fullData = {
        ...state?.form,
        ...data,
        status: "Pending",
        submittedAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/submit-application", fullData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Your application has been submitted!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to submit application.", "error");
    },
  });

  const selectedHealth = watch("healthInfo") || [];

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="max-w-xl mx-auto p-6 space-y-6 bg-white rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center">
        Application Form
      </h2>

      {/* Full Name */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="fullName">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          {...register("fullName", { required: "Full Name is required" })}
          placeholder="Full Name"
          className={`input w-full ${errors.fullName ? "input-error" : ""}`}
        />
        {errors.fullName && (
          <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email (readonly + required) */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          readOnly
          className={`input w-full bg-gray-100 cursor-not-allowed ${
            errors.email ? "input-error" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="address">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          {...register("address", { required: "Address is required" })}
          placeholder="Address"
          rows={3}
          className={`input w-full resize-none ${
            errors.address ? "input-error" : ""
          }`}
        />
        {errors.address && (
          <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* NID Number */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="nid">
          NID Number <span className="text-red-500">*</span>
        </label>
        <input
          id="nid"
          {...register("nid", {
            required: "NID Number is required (10 to 17) not space",
            pattern: {
              value: /^[0-9]{10,17}$/,
              message: "NID must be 10 to 17 digits",
            },
          })}
          placeholder="NID Number"
          className={`input w-full ${errors.nid ? "input-error" : ""}`}
        />
        {errors.nid && (
          <p className="text-red-600 text-sm mt-1">{errors.nid.message}</p>
        )}
      </div>

      {/* Nominee Info */}
      <div>
        <h3 className="font-semibold mb-2">Nominee Information</h3>

        <label className="block mb-1" htmlFor="nomineeName">
          Nominee Name <span className="text-red-500">*</span>
        </label>
        <input
          id="nomineeName"
          {...register("nomineeName", { required: "Nominee Name is required" })}
          placeholder="Nominee Name"
          className={`input w-full ${errors.nomineeName ? "input-error" : ""}`}
        />
        {errors.nomineeName && (
          <p className="text-red-600 text-sm mt-1">{errors.nomineeName.message}</p>
        )}

        <label className="block mt-4 mb-1" htmlFor="nomineeRelation">
          Relationship <span className="text-red-500">*</span>
        </label>
        <input
          id="nomineeRelation"
          {...register("nomineeRelation", { required: "Relationship is required" })}
          placeholder="Relationship"
          className={`input w-full ${
            errors.nomineeRelation ? "input-error" : ""
          }`}
        />
        {errors.nomineeRelation && (
          <p className="text-red-600 text-sm mt-1">{errors.nomineeRelation.message}</p>
        )}
      </div>

      {/* Health Disclosure */}
      <div>
        <h3 className="font-semibold mb-2">
          Health Disclosure <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {healthOptions.map(({ label, value }) => (
            <label key={value} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                value={value}
                {...register("healthInfo", {
                  validate: (val) =>
                    val.length > 0 || "Please select at least one health option",
                })}
                disabled={
                  value === "none" &&
                  selectedHealth.length > 0 &&
                  !selectedHealth.includes("none")
                }
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {errors.healthInfo && (
          <p className="text-red-600 text-sm mt-1">{errors.healthInfo.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="btn btn-primary w-full mt-6"
      >
        {mutation.isLoading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
};

export default ApplicationForm;
