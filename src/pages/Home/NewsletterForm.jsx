import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const NewsletterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const axiosPublic = useAxiosPublic();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosPublic.post('/newsletter', formData);
      if (res.data.insertedId) {
        Swal.fire('Subscribed!', 'Thank you for subscribing.', 'success');
        setFormData({ name: '', email: '' });
      }
    } catch (err) {
      Swal.fire('Error', 'Something went wrong. Try again.', 'error');
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-300 via-white to-blue-300 py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          📬 Join Our Newsletter
        </h2>
        <p className="text-gray-600 mb-8">
          Subscribe to receive the latest updates, articles, and insights.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
            className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-semibold transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterForm;
