// src/pages/Home/PopularPolicies.jsx
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

const PopularPolicies = () => {
  // const axiosPublic = useAxiosPublic();

  // const { data: policies = [], isLoading, isError } = useQuery({
  //   queryKey: ["popularPolicies"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get("/policies/popular");
  //     return res.data;
  //   },
  // });

  // if (isLoading) return <p className="text-center py-10">Loading popular policies...</p>;
  // if (isError) return <p className="text-center py-10 text-red-600">Failed to load policies</p>;

  return (
    <section className="py-10 bg-gradient-to-r from-gray-100 to-yellow-100">
      {/* <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">🔥 Popular Policies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map(policy => (
            <div key={policy._id} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={policy.image} alt={policy.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
                <p><strong>Coverage:</strong> {policy.coverageAmount}</p>
                <p><strong>Term:</strong> {policy.term}</p>
                <p><strong>Popularity:</strong> {policy.popularity} purchases</p>
                <Link
                  to={`/policy/${policy._id}`}
                  className="mt-4 inline-block text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default PopularPolicies;
