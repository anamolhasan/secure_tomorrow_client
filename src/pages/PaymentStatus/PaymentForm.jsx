// PaymentForm.jsx
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";

// const PaymentForm = ({ policy }) => {
//   const [clientSecret, setClientSecret] = useState("");
//   const [transactionId, setTransactionId] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = useAxiosSecure();

//   if (!policy) {
//     return <p className="text-center text-red-500 mt-10">No policy data available!</p>;
//   }

//   const { premium, _id } = policy;

//   useEffect(() => {
//     if (premium) {
//       axiosSecure
//         .post("/create-payment-intent", { premium })
//         .then((res) => setClientSecret(res.data.clientSecret))
//         .catch(() => toast.error("Failed to initialize payment"));
//     }
//   }, [premium, axiosSecure]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     const card = elements.getElement(CardElement);
//     if (!card) return;

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       toast.error(error.message);
//       return;
//     }

//     const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: paymentMethod.id,
//     });

//     if (confirmError) {
//       toast.error(confirmError.message);
//       return;
//     }

//     if (paymentIntent.status === "succeeded") {
//       setTransactionId(paymentIntent.id);

//       const res = await axiosSecure.patch(`/policies/payment/${_id}`, {
//         transactionId: paymentIntent.id,
//       });

//       if (res.data.modifiedCount > 0) {
//         toast.success("✅ Payment successful & policy activated!");
//       }
//     }
//   };

  // return (
    // <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
    //   <CardElement className="border p-3 rounded" />
    //   <button
    //     type="submit"
    //     disabled={!stripe || !clientSecret}
    //     className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
    //   >
    //     Pay ${premium}
    //   </button>
    //   {transactionId && <p className="text-green-500">Transaction ID: {transactionId}</p>}
    // </form>
//   );
// };

// export default PaymentForm;
