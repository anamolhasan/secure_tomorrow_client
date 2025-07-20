// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import { useNavigate } from "react-router-dom";

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
    <div className="max-w-xl mx-auto space-y-4 p-4">
      <h2 className="text-xl font-bold">Get a Quote</h2>
      <input name="age" placeholder="Age" type="number" onChange={handleChange} className="input" />
      <select name="gender" onChange={handleChange} className="input">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input name="coverage" placeholder="Coverage Amount" type="number" onChange={handleChange} className="input" />
      <input name="duration" placeholder="Duration (Years)" type="number" onChange={handleChange} className="input" />
      <select name="smoker" onChange={handleChange} className="input">
        <option value="no">Non-smoker</option>
        <option value="yes">Smoker</option>
      </select>
      <button className="btn" onClick={() => quoteMutation.mutate()}>Estimate Premium</button>

      {quote && (
        <div className="bg-gray-100 p-4 rounded">
          <p>Monthly Premium: <strong>{quote.monthly} BDT</strong></p>
          <p>Annual Premium: <strong>{quote.annual} BDT</strong></p>
          <button className="btn mt-2" onClick={() => navigate("/application-form", { state: { form } })}>
            Apply for Policy
          </button>
        </div>
      )}
    </div>
  );
};

export default QuotePage;