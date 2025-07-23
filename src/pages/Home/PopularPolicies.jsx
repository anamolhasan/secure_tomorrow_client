// src/pages/Home/PopularPolicies.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

const PopularPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const axiosPublic = useAxiosSecure();

  useEffect(() => {
    axiosPublic.get("/policies/popular")
      .then(res => setPolicies(res.data))
      .catch(err => console.error(err));
  }, [axiosPublic]);

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Popular Policies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map(policy => (
            <div key={policy._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={policy.image} alt={policy.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
                <p><strong>Coverage:</strong> {policy.coverageAmount}</p>
                <p><strong>Term:</strong> {policy.term}</p>
                <p><strong>Popularity:</strong> {policy.popularity} purchases</p>
                <Link
                  to={`/policy/${policy._id}`}
                  className="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPolicies;
