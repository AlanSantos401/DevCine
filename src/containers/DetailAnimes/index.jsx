import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Credits from "../../components/Credits";
import Slider from "../../components/Slider";
import SpanGenres from "../../components/SpanGenres";
import {
  getAnimeById,
  getAnimeCredits,
  getAnimeSimilar,
  getAnimeVideos,
} from "../../services/getData";
import { getImages } from "../../utils/getImages";
import { Background, Container, ContainerMovies, Cover, Info } from "./styles";

function DetailAnimes() {
  const { id } = useParams();

  const [anime, setAnime] = useState(null);
  const [animeVideo, setAnimeVideo] = useState(null);
  const [animeCredits, setAnimeCredits] = useState([]);
  const [animeSimilar, setAnimeSimilar] = useState([]);

  useEffect(() => {
    async function getAllData() {
      try {
        const [animeData, video, credits, similar] = await Promise.all([
          getAnimeById(id),
          getAnimeVideos(id),
          getAnimeCredits(id),
          getAnimeSimilar(id),
        ]);

        setAnime(animeData);
        setAnimeVideo(video);
        setAnimeCredits(credits);
        setAnimeSimilar(similar);
      } catch (error) {
        console.error("Erro ao buscar dados do anime:", error);
      }
    }

    getAllData();
  }, [id]);

  if (!anime) return <p>Carregando detalhes do anime...</p>;

  return (
    <>
      <Background image={getImages(anime.backdrop_path)} />
      <Container>
        <Cover>
          <img src={getImages(anime.poster_path)} alt={`Poster de ${anime.name}`} />
        </Cover>
        <Info>
          <h2>{anime.name}</h2>
          <SpanGenres genres={anime.genres} />
          <p>{anime.overview}</p>

          <div>
            <h3>Créditos principais</h3>
            <Credits credits={animeCredits} />
          </div>
        </Info>
      </Container>

      <ContainerMovies>
        {animeVideo ? (
          <div key={animeVideo.id}>
            <h4>{animeVideo.name}</h4>
            <iframe
              src={`https://www.youtube.com/embed/${animeVideo.key}`}
              title={animeVideo.name}
              height="500px"
              width="100%"
              allowFullScreen
            />
          </div>
        ) : (
          <p>Trailer não disponível para esse anime.</p>
        )}
      </ContainerMovies>

      {animeSimilar && animeSimilar.length > 0 && (
        <Slider info={animeSimilar} title="Animes Similares" />
      )}
    </>
  );
}

export default DetailAnimes;

