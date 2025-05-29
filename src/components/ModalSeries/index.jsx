import { useEffect, useState } from "react";

import { Background, Container } from "./styles";
import { getSeriesVideos } from "../../services/getData";

function ModalSeries({ seriesId, setShowModal }) {
  const [series, setSeries] = useState();

  useEffect(() => {
  console.log("seriesId recebido:", seriesId); // DEBUG
  async function getSeries() {
    const video = await getSeriesVideos(seriesId);
    console.log("Vídeo retornado:", video); // DEBUG
    setSeries(video);
  }
  getSeries();
}, [seriesId]);


  return (
    <Background onClick={() => setShowModal(false)}>
      <button type="button" onClick={() => setShowModal(false)}>
        X
      </button>
      {series && (
        <Container onClick={(e) => e.stopPropagation()}>
          <iframe
            src={`https://www.youtube.com/embed/${series.key}`}
            title="Youtube Video Player"
            height="500px"
            width="100%"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </Container>
      )}
    </Background>
  );
}

export default ModalSeries;