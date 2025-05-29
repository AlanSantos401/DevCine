import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Credits from "../../components/Credits";
import SpanGenres from "../../components/SpanGenres";
import {
  getMovieById,
  getMovieCredits,
  getMovieSimilar,
  getMovieVideos,
} from "../../services/getData";
import { getImages } from "../../utils/getImages";
import { Background, Container, ContainerMovies, Cover, Info } from "./styles";
import Slider from "../../components/Slider";

function Detail() {
  const { id } = useParams();

  const [movie, setMovie] = useState();
  const [movieVideo, setMovieVideo] = useState(null); 
  const [MovieCredits, setMovieCredits] = useState();
  const [movieSimilar, setMovieSimilar] = useState();

  useEffect(() => {
    async function getAllData() {
      try {
        const [movie, video, credits, similar] = await Promise.all([
          getMovieById(id),
          getMovieVideos(id), 
          getMovieCredits(id),
          getMovieSimilar(id),
        ]);

        console.log({ movie, video, similar, credits });

        setMovie(movie);
        setMovieVideo(video); 
        setMovieCredits(credits);
        setMovieSimilar(similar);
      } catch (error) {
        console.error(error);
      }
    }

    getAllData();
  }, [id]);

  return (
    <>
      {movie && (
        <>
          <Background image={getImages(movie.backdrop_path)} />
          <Container>
            <Cover>
              <img src={getImages(movie.poster_path)} alt="image-poster" />
            </Cover>
            <Info>
              <h2>{movie.title}</h2>
              <SpanGenres genres={movie.genres} />
              <p>{movie.overview}</p>
              <div>
                <Credits credits={MovieCredits} />
              </div>
            </Info>
          </Container>

          <ContainerMovies>
            {movieVideo && (
              <div key={movieVideo.id}>
                <h4>{movieVideo.name}</h4>
                <iframe
                  src={`https://www.youtube.com/embed/${movieVideo.key}`}
                  title={movieVideo.name}
                  height="500px"
                  width="100%"
                  allowFullScreen
                />
              </div>
            )}
          </ContainerMovies>
		  {movieSimilar && <Slider info={movieSimilar} title={"Filmes Similares"} />}
        </>
      )}
    </>
  );
}

export default Detail;
