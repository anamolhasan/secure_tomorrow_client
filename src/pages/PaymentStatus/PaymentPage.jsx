// PaymentPage.jsx
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import PaymentForm from "./PaymentForm";

const PaymentPage = () => {
  // const { id } = useParams();
  // const axiosSecure = useAxiosSecure();

  // console.log("Policy ID from URL:", id); // debug

  // const { data: policy, isLoading, isError } = useQuery({
  //   queryKey: ['policy', id],
  //   queryFn: async () => {
  //     if (!id) throw new Error("No ID provided");
  //     const res = await axiosSecure.get(`/policies/${id}`);
  //     return res.data;
  //   },
  //   enabled: !!id,
  // });

  // if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  // if (isError || !policy) return <p className="text-center mt-10 text-red-500">Failed to load policy data.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* <h2 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h2>
      <PaymentForm policy={policy} /> */}
    </div>
  );
};

export default PaymentPage;
