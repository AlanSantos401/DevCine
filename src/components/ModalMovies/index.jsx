import { useEffect, useState } from "react";
import { Background, Container } from "./styles";
import { getMovieVideos } from "../../services/getData";

function ModalMovies({ movieId, setShowModal }) {
  const [movie, setMovie] = useState(null);

 useEffect(() => {
  async function getMovies() {
    const video = await getMovieVideos(movieId);
    setMovie(video);
  }

  if (movieId) {
    getMovies();
  }
}, [movieId]);

  return (
    <Background onClick={() => setShowModal(false)}>
      <button type="button" onClick={() => setShowModal(false)}>X</button>

      {movie ? (
        <Container onClick={(e) => e.stopPropagation()}>
          <iframe
            src={`https://www.youtube.com/embed/${movie.key}`}
            title="Youtube Video Player"
            height="500px"
            width="100%"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </Container>
      ) : (
        <Container onClick={(e) => e.stopPropagation()}>
          <p>Trailer não disponível</p>
        </Container>
      )}
    </Background>
  );
}

export default ModalMovies;


