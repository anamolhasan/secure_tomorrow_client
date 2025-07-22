import React from 'react'
import { Link } from 'react-router'

const Carousel1 = () => {
  return (
  <div
  className="hero bg-cover bg-center text-white rounded-2xl"
  style={{
    backgroundImage: "url('https://i.ibb.co/SSCPjYT/Screenshot-4.png')",
    backgroundBlendMode: "multiply",
    backgroundColor: "rgba(0,0,0,0.5)",
  }}
>
  <div className="hero-content text-center h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
    <div className="max-w-xl  bg-opacity-70  dark:bg-opacity-60 p-6 rounded-xl">
      <h1 className="text-5xl font-bold">Sundarban</h1>
       <p className="text-lg md:text-xl mb-6">
          Discover the world’s largest mangrove forest — home of the Royal Bengal Tiger and mysterious beauty.
        </p>
        <Link
          to="/all-package"
          className="inline-block bg-white text-green-800 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Explore All Packages
        </Link>
    </div>
  </div>
</div>

  )
}

export default Carousel1