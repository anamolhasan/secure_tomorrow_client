import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

const QuotePage = () => {
  const [form, setForm] = useState({
    age: "",
    gender: "male",
    coverage: "",
    duration: "",
    smoker: "no",
  });
  const [quote, setQuote] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const quoteMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post("/get-quote", form);
      return res.data;
    },
    onSuccess: (data) => setQuote(data),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">Get a Quote</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Age</label>
          <input
            name="age"
            type="number"
            placeholder="Enter your age"
            onChange={handleChange}
            value={form.age}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Gender</label>
          <select
            name="gender"
            onChange={handleChange}
            value={form.gender}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Coverage Amount</label>
          <input
            name="coverage"
            type="number"
            placeholder="Amount in BDT"
            onChange={handleChange}
            value={form.coverage}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Duration (Years)</label>
          <input
            name="duration"
            type="number"
            placeholder="Policy duration"
            onChange={handleChange}
            value={form.duration}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Smoker</label>
          <select
            name="smoker"
            onChange={handleChange}
            value={form.smoker}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="no">Non-smoker</option>
            <option value="yes">Smoker</option>
          </select>
        </div>

        <button
          onClick={() => quoteMutation.mutate()}
          disabled={quoteMutation.isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition duration-300 disabled:opacity-50"
        >
          {quoteMutation.isLoading ? "Calculating..." : "Estimate Premium"}
        </button>
      </div>
 
      {quote && (
        <div className="mt-8 bg-indigo-50 border border-indigo-300 p-6 rounded-md text-center">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Estimated Premium</h3>
          <p className="text-lg mb-2">
            Monthly Premium: <span className="font-bold">{quote.monthly} BDT</span>
          </p>
          <p className="text-lg mb-4">
            Annual Premium: <span className="font-bold">{quote.annual} BDT</span>
          </p>
          <button
            onClick={() => navigate("/application-form", { 
              state: { 
                form ,
                quote,
              } 
            })}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Apply for Policy
          </button>
        </div>
      )}
    </div>
  );
};

export default QuotePage;
