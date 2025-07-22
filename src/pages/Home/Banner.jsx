import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";


import { Autoplay, Navigation,  Pagination,  Thumbs } from "swiper/modules";


import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import Carousel1 from "../../components/carousel/Carousel1";
import Carousel2 from "../../components/carousel/Carousel2";
import Carousel3 from "../../components/carousel/Carousel3";
import Carousel4 from "../../components/carousel/Carousel4";



const Banner = () => {
  const [thumbsSwiper, serThumbsSwiper] = useState(null);

  return (
    <div className="my-10">
      <Swiper
      modules={[Thumbs, Autoplay, Navigation, Pagination]}
      thumbs={{swiper:thumbsSwiper}}
      autoplay={{delay:2000, disableOnInteraction:false}}
      loop={true}
      spaceBetween={20}
      navigation={true}
      pagination={{clickable:true}}

      
      >
        <SwiperSlide>
          <Carousel1 />
        </SwiperSlide>
        <SwiperSlide>
          <Carousel2 />
        </SwiperSlide>
        <SwiperSlide>
          <Carousel3 />
        </SwiperSlide>
        <SwiperSlide>
          <Carousel4 />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;