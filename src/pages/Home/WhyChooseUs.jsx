import React from "react";

const WhyChooseUs = () => {
  const items = [
    { title: "Trusted by Thousands", desc: "Over 10,000 happy clients." },
    { title: "24/7 Support", desc: "We’re always here for you." },
    { title: "Affordable Plans", desc: "Plans that fit your budget." },
  ];

  return (
    <section className="container mx-auto text-center my-20">
      <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-6 shadow-lg rounded-2xl"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-500 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
