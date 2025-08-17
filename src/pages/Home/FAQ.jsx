import React from "react";

const FAQ = () => {
  const faqs = [
    {
      q: "How do I apply for insurance?",
      a: "You can apply online through our secure portal.",
    },
    {
      q: "Can I cancel my policy anytime?",
      a: "Yes, you can cancel anytime with full support.",
    },
    {
      q: "Do you provide emergency support?",
      a: "Absolutely! We are available 24/7.",
    },
  ];

  return (
    <section className="container mx-auto my-20">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="p-6  shadow-lg rounded-2xl"
          >
            <h3 className="text-lg font-semibold">{faq.q}</h3>
            <p className="text-gray-500 mt-2">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
