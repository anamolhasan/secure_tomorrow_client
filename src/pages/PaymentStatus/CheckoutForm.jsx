import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
// import axiosSecure from "../utils/axiosSecure";
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
const axiosSecure = useAxiosSecure()

  const applicationId = searchParams.get("applicationId");
  const policyId = searchParams.get("policyId");
  const premium = parseFloat(searchParams.get("premium") || 0);

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get Payment Intent from Backend
  useEffect(() => {
    if (premium > 0) {
      axiosSecure
        .post("/api/create-payment-intent", { premium })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [premium]);

  const updatePayment = useMutation({
    mutationFn: (paymentData) =>
      axiosSecure.patch(`/api/applications/payment/${applicationId}`, paymentData),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your policy is now active!",
      });
      navigate("/dashboard/my-policies");
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Something went wrong. Please contact support.",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setError("");

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (pmError) {
      setError(pmError.message);
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      setError(confirmError.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      updatePayment.mutate({
        transactionId: paymentIntent.id,
        policyId,
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-gray-700 text-center font-medium">
        Total Premium: <span className="font-bold text-green-600">${premium}</span>
      </p>

      <div className="p-3 border rounded-md bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || !clientSecret || loading}
        className="w-full py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
