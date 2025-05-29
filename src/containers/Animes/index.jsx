import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ModalAnimes from "../../components/ModalAnimes";
import Slider from "../../components/Slider";
import { getTopAnimes, getTrendingAnimes } from "../../services/getData";
import { getImages } from "../../utils/getImages";
import {
  Background,
  Container,
  ContainerButtons,
  Info,
  Poster,
} from "./styles";

function Animes() {
  const [showModal, setShowModal] = useState(false);
  const [animes, setAnimes] = useState([]);
  const [topAnimes, setTopAnimes] = useState([]);
  const [highlightAnime, setHighlightAnime] = useState(null);
  const highlightIndexRef = useRef(0); // guarda o índice atual do destaque

  const navigate = useNavigate();

  useEffect(() => {
    let intervalId;

    async function fetchData() {
      try {
        const [trending, top] = await Promise.all([
          getTrendingAnimes(),
          getTopAnimes(),
        ]);

        setAnimes(trending);
        setTopAnimes(top);

        if (top.length > 0) {
          // Define índice inicial aleatório
          const randomIndex = Math.floor(Math.random() * top.length);
          highlightIndexRef.current = randomIndex;
          setHighlightAnime(top[randomIndex]);

          // Atualiza o destaque a cada 30 minutos
          intervalId = setInterval(() => {
            highlightIndexRef.current =
              (highlightIndexRef.current + 1) % top.length; // próximo índice (ciclo)
            setHighlightAnime(top[highlightIndexRef.current]);
          }, 1800000); // 30 minutos
        }
      } catch (error) {
        console.error("Erro ao buscar animes:", error);
      }
    }

    fetchData();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {highlightAnime && (
        <Background img={getImages(highlightAnime.backdrop_path)}>
          {showModal && highlightAnime?.id && (
            <ModalAnimes animeId={highlightAnime.id} setShowModal={setShowModal} />
          )}

          <Container>
            <Info>
              <h1>{highlightAnime.name || highlightAnime.title}</h1>
              <p>{highlightAnime.overview}</p>
              <ContainerButtons>
                <Button red type="anime" onClick={() => navigate(`/detalhe/anime/${highlightAnime.id}`)}>
                  Assista Agora
                </Button>
                <Button onClick={() => setShowModal(true)}>Assista o Trailer</Button>
              </ContainerButtons>
            </Info>
            <Poster>
              <img alt="capa-do-Anime" src={getImages(highlightAnime.poster_path)} />
            </Poster>
          </Container>
        </Background>
      )}

      {animes.length > 0 && <Slider info={animes} title={"Animes em Alta"} />}
      {topAnimes.length > 0 && <Slider info={topAnimes} title={"Top Animes"} />}
    </>
  );
}

export default Animes;
