import React from "react";
import { Link } from "react-router";

const Carousel2 = () => {
  return (
    <div
      className="hero bg-cover bg-center text-white rounded-2xl"
      style={{
        backgroundImage: "url('https://i.ibb.co/4RhtLJn4/1140-insurance.jpg')",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="hero-content text-center h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
        <div className="max-w-lg  bg-opacity-70 k dark:bg-opacity-60 p-6 rounded-xl">
          <h1 className="text-5xl font-bold">Life Insurance Made Easy</h1>
          <p className="text-lg md:text-xl mb-6">
            Affordable. Reliable. Trusted.
          </p>
          <Link to="/quote">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition-all">
              Get a Free Quote
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carousel2;
