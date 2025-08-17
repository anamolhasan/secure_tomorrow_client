import React from "react";

const InsurancePlans = () => {
  const plans = ["Life Insurance", "Health Insurance", "Travel Insurance"];

  return (
    <section className="container mx-auto text-center my-20">
      <h2 className="text-3xl font-bold mb-6">Our Insurance Plans</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="p-6  shadow-lg rounded-2xl"
          >
            <h3 className="text-xl font-semibold">{plan}</h3>
            <p className=" mt-2">
              Secure your future with our {plan.toLowerCase()}.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InsurancePlans;
