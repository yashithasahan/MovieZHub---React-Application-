import React, { useEffect, useState } from "react";
// import SwiperCore, { Autoplay } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./Hero-slide.scss";

const HeroSlide = () => {
  const [movieItems, setMovieItens] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItens(response.results.slice(0, 5));
        console.log(response);
      } catch (e) {
        console.log(`Error > getMoveeList> ${e}`);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {movieItems.map((movie, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <img src={apiConfig.originalImage(movie.backdrop_path)} alt="" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlide;
