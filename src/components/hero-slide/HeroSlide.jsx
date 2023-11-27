import React, { useEffect, useRef, useState } from "react";
// import SwiperCore, { Autoplay } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";

import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./Hero-slide.scss";
import { useNavigate } from "react-router-dom";

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
        // autoplay={{ delay: 3000 }}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {movieItems.map((movie, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSildeMovie
                movie={movie}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((movie, i) => (
        <TrailerModel key={i} movie={movie} />
      ))}
    </div>
  );
};

const HeroSildeMovie = (props) => {
  let navigate = useNavigate();

  const movie = props.movie;
  const background = apiConfig.originalImage(
    movie.backdrop_path ? movie.backdrop_path : movie.poster_path
  );

  const setModalActive = async () => {
    console.log("clicked");
    const modal = document.querySelector(`#modal_${movie.id}`);

    const videos = await tmdbApi.getVideos(category.movie, movie.id);
    console.log(videos.results);
    if (videos.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videoSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }
    modal.classList.toggle("active");
  };
  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{movie.title}</h2>
          <div className="overview">{movie.overview}</div>
          <div className="btns">
            <Button
              onclick={() => console.log("clicked")}
              // onclick={() => navigate("/movie/" + movie.id)}
            >
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(movie.poster_path)} alt=""></img>
        </div>
      </div>
    </div>
  );
};

const TrailerModel = (props) => {
  const movie = props.movie;
  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${movie.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
