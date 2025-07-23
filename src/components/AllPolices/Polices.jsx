import React, { useState } from 'react';
import Container from '../Shared/Container';
import Card from '../card/Card';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Polices = () => {
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [keyword, setKeyword] = useState('');
  const limit = 9;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['policies', category, page, keyword],
    queryFn: async () => {
      // ✅ query string ডাইনামিকভাবে তৈরি
      let query = `/policies?page=${page}&limit=${limit}`;
      if (category) query += `&category=${category}`;
      if (keyword) query += `&keyword=${keyword}`;
    
      const res = await axiosSecure.get(query);
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleSearch = () => {
    setKeyword(searchTerm.trim());
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (isLoading) return <div className="text-center">লোড হচ্ছে...</div>;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <Container>
      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="p-2 border rounded w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="Term Life">Term Life</option>
          <option value="Whole Life">Whole Life</option>
          <option value="Senior">Senior Plan</option>
          <option value="Child">Child Plan</option>
        </select>

        <div className="flex gap-2 w-full md:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search policy..."
            className="p-2 border rounded w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* Policies Grid */}
      {data?.policies?.length === 0 ? (
        <div className="text-center text-red-500">কোনো পলিসি পাওয়া যায়নি।</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.policies?.map((policy) => (
            <Card key={policy._id} policy={policy} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {data?.totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {[...Array(data.totalPages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p + 1)}
              className={`px-3 py-1 border rounded ${
                page === p + 1 ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {p + 1}
            </button>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Polices;
