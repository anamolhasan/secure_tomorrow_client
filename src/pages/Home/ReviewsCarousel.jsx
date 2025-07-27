import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ReviewsCarousel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/reviews`).then((res) => {
      setReviews(res.data.slice(0, 5)); // সর্বোচ্চ ৫টা রিভিউ নেবে
    });
  }, []);
console.log(reviews)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Customers Say</h2>
      <Slider {...settings}>
        {reviews.map((r) => (
          <div key={r._id} className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg shadow-md">
            <img src={r.userImage} alt={r.userName} className="w-20 h-20 mx-auto rounded-full object-cover" />
            <h3 className="text-lg font-semibold">{r.userName}</h3>
            <p className="text-yellow-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
            <p className="text-gray-600 italic">{r.feedback}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewsCarousel;
