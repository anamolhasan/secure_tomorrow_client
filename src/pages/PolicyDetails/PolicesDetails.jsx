import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseModal from '../../components/Modal/PurchaseModal'

import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Shared/Container";

const PolicesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const { data: policy, isLoading, isError } = useQuery({
    queryKey: ['policy', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/policies/${id}`);
      return res.data;
    }
  });
  const handleGetQuote = () => {
    navigate(`/get-quote/${id}`); // 🔹 রিডাইরেক্ট টু কোয়োট পেইজ
  };

  if (isLoading) return <p className='text-center'>Loading...</p>;
  if (isError || !policy) return <p className='text-center text-red-500'>Policy not found</p>;

  return (
    <Container>
      <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12'>
        {/* Image Section */}
        <div className='flex flex-col gap-6 flex-1'>
          <div className='w-full overflow-hidden rounded-xl'>
            <img
              className='object-cover w-full'
              src={policy.image}
              alt={policy.title}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className='md:gap-10 flex-1'>
          <Heading
            title={policy.title}
            subtitle={`Category: ${policy.category}`}
          />
          <hr className='my-6' />

          <div className='text-lg font-light text-neutral-600'>
            {policy.description}
          </div>
          <hr className='my-6' />

          <div className='text-md text-neutral-500 space-y-2'>
            <p><strong>Eligible Age:</strong> {policy.minAge} - {policy.maxAge} years</p>
            <p><strong>Duration:</strong> {policy.duration} years</p>
            <p><strong>Coverage Amount:</strong> ৳{policy.coverageRange}</p>
            <p><strong>Base Rate:</strong> {policy.baseRate} BDT per 10,000 coverage</p>
            <p><strong>Created By:</strong> {policy?.createdBy?.name || "Unknown"}</p>
          </div>

          <hr className='my-6' />

          <div className='flex justify-between items-center'>
            <p className='font-bold text-3xl text-gray-600'>Trusted Policy</p>
             <Button onClick={handleGetQuote} label='Get Quote' /> 
          </div>
          <hr className='my-6' />

          <PurchaseModal closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </Container>
  )
}

export default PolicesDetails;
