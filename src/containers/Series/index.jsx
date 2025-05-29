import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Slider from "../../components/Slider";
import { getSeriesWithHighlight, getTopSeries } from "../../services/getData";
import { getImages } from "../../utils/getImages";
import {
  Background,
  Container,
  ContainerButtons,
  Info,
  Poster,
} from "./styles";
import ModalSeries from "../../components/ModalSeries";

function Series() {
  const [showModal, setShowModal] = useState(false);
  const [series, setSeries] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [mainSerie, setMainSerie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllData() {
      try {
        const [{ series, highlight }, topSeriesData] = await Promise.all([
          getSeriesWithHighlight(),
          getTopSeries(),
        ]);

        setSeries(series);
        setMainSerie(highlight);
        setTopSeries(topSeriesData);
      } catch (error) {
        console.error("Erro ao carregar séries:", error);
      }
    }

    getAllData();
  }, []);

  return (
    <>
      {mainSerie && (
        <Background img={getImages(mainSerie.backdrop_path)}>
          {showModal && (
            <ModalSeries seriesId={mainSerie.id} type="tv" setShowModal={setShowModal} />
          )}
          <Container>
            <Info>
              <h1>{mainSerie.name}</h1>
              <p>{mainSerie.overview}</p>
              <ContainerButtons>
                <Button red onClick={() => navigate(`/detalhe/serie/${mainSerie.id}`)}>
                  Assista Agora
                </Button>
                <Button onClick={() => setShowModal(true)}>
                  Assista o Trailer
                </Button>
              </ContainerButtons>
            </Info>
            <Poster>
              <img
                alt="capa-da-serie"
                src={getImages(mainSerie.poster_path)}
              />
            </Poster>
          </Container>
        </Background>
      )}

      {series.length > 0 && <Slider info={series} title={"Séries Populares"} />}
      {topSeries.length > 0 && <Slider info={topSeries} title={"Top Séries"} />}
    </>
  );
}

export default Series;
