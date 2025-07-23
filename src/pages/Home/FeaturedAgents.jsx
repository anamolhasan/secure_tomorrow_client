import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../hooks/useAxiosSecure";
// import axiosSecure from "../hooks/axiosSecure";

const FeaturedAgents = () => {
  const { data: agents = [], isLoading, isError } = useQuery({
    queryKey: ["featured-agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-agents");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading agents...</p>;
  if (isError) return <p>Failed to load agents.</p>;

  return (
    <section className="py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">
        Meet Our Agents
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {agents.map((agent) => (
          <div key={agent._id} className="bg-white p-6 rounded-2xl shadow-md text-center">
            <img
              src={agent.photoURL || "https://i.ibb.co/2kR1Bcg/default-user.png"}
              alt={agent.name}
              className="w-28 h-28 rounded-full mx-auto object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{agent.name}</h3>
            <p className="text-gray-600">{agent.experience || "Experience info not provided"}</p>
            <p className="text-gray-500 text-sm mt-2">
              {agent.specialties?.join(", ") || "Specialties not specified"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedAgents;
