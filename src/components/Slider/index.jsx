import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import Card from "../Card";
import { Container } from "./styles";

function Slider({ info, title }) {
  const navigate = useNavigate();
  

  function handleClick(item) {
    let type = "movie"; // default

    if (title.toLowerCase().includes("anime")) {
      type = "anime";
    } else if (item.media_type === "tv" || title.toLowerCase().includes("série") || title.toLowerCase().includes("series")) {
      type = "serie";
    }

    navigate(`/detalhe/${type}/${item.id}`);
  }

  return (
    <Container>
      <h2>{title}</h2>
     <Swiper
  slidesPerView={4}
  spaceBetween={20}
  breakpoints={{
    0: {
      slidesPerView: 2, // celulares
    },
    768: {
      slidesPerView: 3, // tablet
    },
    1024: {
      slidesPerView: 4, // desktop
    },
  }}
>
        {info.map((item) => (
          <SwiperSlide key={item.id} onClick={() => handleClick(item)}>
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

export default Slider;

