import React from "react";

const SuccessStats = () => {
  const stats = [
    { number: "10K+", label: "Happy Clients" },
    { number: "5K+", label: "Active Policies" },
    { number: "2K+", label: "Approved Claims" },
  ];

  return (
    <section className="container mx-auto text-center my-20">
      <h2 className="text-3xl font-bold mb-6">Our Success Stats</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-6  shadow-lg rounded-2xl"
          >
            <h3 className="text-4xl font-bold text-blue-600">{stat.number}</h3>
            <p className="text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStats;
