import React from "react";

const Partners = () => {
  const partners = ["🏦", "🏥", "💼", "💳"];

  return (
    <section className="container mx-auto text-center my-20">
      <h2 className="text-3xl font-bold mb-6">Our Partners</h2>
      <div className="flex justify-center gap-10 flex-wrap">
        {partners.map((icon, i) => (
          <div
            key={i}
            className="p-6  shadow-lg rounded-2xl text-5xl"
          >
            {icon}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
