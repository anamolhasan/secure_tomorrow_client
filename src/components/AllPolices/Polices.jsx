import React, { useState } from 'react'
import Container from '../Shared/Container'
import Card from '../card/Card'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const Polices = () => {
    const axiosSecure = useAxiosSecure();

  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;
 
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["policies", category, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/policies?category=${category}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center">লোড হচ্ছে...</div>;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  return (
     <Container>
      {/* Filter Dropdown */}
      <div className="mb-6">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1); // category change করলে পেজ reset
          }}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Term">Term Life</option>
          <option value="Senior">Senior Plan</option>
          <option value="Child">Child Plan</option>
        </select>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.policies?.map((policy) => (
          <Card key={policy._id} policy={policy} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(data.totalPages).keys()].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p + 1)}
            className={`px-3 py-1 border rounded ${
              page === p + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {p + 1}
          </button>
        ))}
      </div>
    </Container>
  )
}

export default Polices