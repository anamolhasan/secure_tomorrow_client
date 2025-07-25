import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
    }
  } catch (err) {
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
