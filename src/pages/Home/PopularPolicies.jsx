import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // custom hook if you're using axios interceptor

const PopularPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const axiosSecure = useAxiosSecure(); // or simply use axios if not using interceptor

  useEffect(() => {
    const fetchPopularPolicies = async () => {
      try {
        const res = await axiosSecure.get("/policies/popular"); // Make sure this route exists
        setPolicies(res.data || []);
      } catch (err) {
        console.error("Failed to fetch popular policies", err);
      }
    };

    fetchPopularPolicies();
  }, [axiosSecure]);

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Policies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <div
              key={policy._id}
              className="bg-white shadow-md hover:shadow-xl transition duration-300 rounded-xl overflow-hidden"
            >
              <img
                src={policy.image}
                alt={policy.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">{policy.title}</h3>
                <p><span className="font-medium">Coverage:</span> {policy.coverageRange}</p>
                <p><span className="font-medium">Term:</span> {policy.duration}</p>
                <p><span className="font-medium">Popularity:</span> {policy.popularity || 0} purchases</p>
                <Link
                  to={`/policy/${policy._id}`}
                  className="inline-block mt-3 text-sm text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
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
