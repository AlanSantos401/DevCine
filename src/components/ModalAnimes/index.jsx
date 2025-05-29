import { useEffect, useState } from "react";
import { Background, Container } from "./styles";
import { getAnimeVideos } from "../../services/getData";

function ModalAnimes({ animeId, setShowModal }) {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      const v = await getAnimeVideos(animeId);
      setVideo(v);
    }
    if (animeId) fetchVideo();
  }, [animeId]);

  return (
    <Background onClick={() => setShowModal(false)}>
      <button type="button" onClick={() => setShowModal(false)}>X</button>
      <Container onClick={e => e.stopPropagation()}>
        {video ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.key}`}
            title="Trailer"
            height="500px"
            width="100%"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <p>Trailer não disponível</p>
        )}
      </Container>
    </Background>
  );
}

export default ModalAnimes;
