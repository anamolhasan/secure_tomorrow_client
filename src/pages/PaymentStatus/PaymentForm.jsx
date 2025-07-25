import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const PaymentForm = ({ close, policy }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  if (!stripe || !elements) return;

  const card = elements.getElement(CardElement);

  try {
    const res = await axiosSecure.post("/create-payment-intent", {
      amount: policy.monthly * 100,
    });
    const clientSecret = res.data.clientSecret;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card } }
    );

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      setSuccess(true);
      toast.success("✅ Payment Successful!");

      const paymentInfo = {
        paymentStatus: "Paid",
        transactionId: paymentIntent.id,
        paymentDate: dayjs().format("YYYY-MM-DD HH:mm:ss"), // দিন ও সময় সহ
        status: "Active", // এখন এই পলিসি Active হয়ে যাবে
      };

      const policyId = policy._id;

      axiosSecure.patch(`/applications/payment/${policyId}`, paymentInfo)
        .then(res => {
          if (res.data.modifiedCount > 0) {
            toast.success("🎉 Policy status updated successfully!");
          }
        })
        .catch(err => {
          console.error("❌ DB update failed:", err);
          toast.error("Failed to update policy status in DB.");
        });
    }
  } catch (err) {
    console.error(err);
    setError("Payment failed");
  }

  setLoading(false);
};



  if (success)
    return (
      <div className="text-green-600 text-center font-semibold">
        ✅ Payment Successful!
        <button
          onClick={close}
          className="block mx-auto mt-4 text-blue-600 underline"
        >
          Close
        </button>
      </div>
    );




  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className=" p-3 rounded bg-white" />
      {error && <div className="text-red-600">{error}</div>}

      <div className="flex justify-between gap-2 py-2">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <button
          type="button"
          onClick={close}
          className=" hover:text-red-600 bg-gray-400 text-white px-4 py-2 rounded"
        >
          ✖ Cancel
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
