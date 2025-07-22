import React from 'react'
import { Link } from 'react-router'

const Carousel3 = () => {
  return (
     <div
  className="hero bg-cover bg-center text-white rounded-2xl"
  style={{
    backgroundImage: "url('https://i.ibb.co/1ts1GVBT/Screenshot-2.png')",
    backgroundBlendMode: "multiply",
    backgroundColor: "rgba(0,0,0,0.5)",
  }}
>
  <div className="hero-content text-center h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
    <div className="max-w-md  bg-opacity-70 k dark:bg-opacity-60 p-6 rounded-xl">
      <h1 className="text-5xl font-bold">Saint Marti</h1>
     <p className="text-lg md:text-xl mb-6">
          Explore the only coral island in Bangladesh — crystal-clear waters, white sandy beaches, and peaceful serenity await.
        </p>
        <Link
          to="/all-package"
          className="inline-block bg-white text-teal-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Explore All Packages
        </Link>
    </div>
  </div>
</div>
  )
}

export default Carousel3