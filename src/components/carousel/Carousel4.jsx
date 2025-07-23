import React from "react";
import { Link } from "react-router";

const Carousel4 = () => {
  return (
    <div
      className="hero bg-cover bg-center text-white rounded-2xl"
      style={{
        backgroundImage: "url('https://i.ibb.co/FLb6rhJL/630.jpg')",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="hero-content text-center h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
        <div className="max-w-md  bg-opacity-70 k dark:bg-opacity-60 p-6 rounded-xl">
          <h1 className="text-5xl font-bold">Your Future, Our Priority</h1>
          <p className="text-lg md:text-xl mb-6">
            Get expert coverage tailored for you and your loved ones.
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

export default Carousel4;
