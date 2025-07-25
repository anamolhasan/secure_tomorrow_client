// import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
// import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";

const PaymentPage = ({ stripePromise }) => {
  // const [isOpen, setIsOpen] = useState(false); // ডায়ালগ খোলা থাকবে শুরুতেই

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl">
              <DialogTitle className="text-3xl font-bold text-center text-gray-900 mb-4">
                পেমেন্ট করুন
              </DialogTitle>
              <Description className="text-center text-gray-600 mb-6">
                আপনার প্রিমিয়াম প্রদানের জন্য নিচের ফর্মটি পূরণ করুন।
              </Description> */}

              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            {/* </DialogPanel> */}
          {/* </div>
        </div> */}
      {/* </Dialog> */}
    </div>
  );
};

export default PaymentPage;
