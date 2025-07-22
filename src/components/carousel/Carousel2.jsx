import React from 'react'
import { Link } from 'react-router'

const Carousel2 = () => {
  return (
    <div
  className="hero bg-cover bg-center text-white rounded-2xl"
  style={{
    backgroundImage: "url('https://i.ibb.co/hFwC9fXR/Screenshot-1.png')",
    backgroundBlendMode: "multiply",
    backgroundColor: "rgba(0,0,0,0.5)",
  }}
>
  <div className="hero-content text-center h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
    <div className="max-w-lg  bg-opacity-70 k dark:bg-opacity-60 p-6 rounded-xl">
      <h1 className="text-5xl font-bold">Sylhet</h1>
       <p className="text-lg md:text-xl mb-6">
          Discover green tea gardens, rolling hills, and magical waterfalls in the heart of nature.
        </p>
        <Link
          to="/all-package"
          className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Explore All Packages
        </Link>
    </div>
  </div>
</div>
  )
}

export default Carousel2