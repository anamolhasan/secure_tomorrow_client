import { Link } from 'react-router';

const Card = ({ policy }) => {
  const { image, title, description, _id, category } = policy;
// console.log(category)
  return (
    <div className="col-span-1 group rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition duration-300 bg-white">

    <div className="relative w-full h-36 overflow-hidden bg-amber-300 flex justify-center items-center">
  <p className="text-2xl md:text-4xl font-bold text-center z-10">
    {category}
  </p>
  <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
    {category}
  </div>
</div>


      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
          {title}
        </h2>

        <p className="text-gray-600 text-sm">
          {description.length > 80 ? description.slice(0, 80) + '...' : description}
        </p>

        <div className="flex items-center justify-between pt-3">
          <span className="text-sm font-semibold text-green-600">Booking: 15</span>
          <Link
            to={`/policy/${_id}`}
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
