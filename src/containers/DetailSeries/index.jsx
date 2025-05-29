import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Credits from "../../components/Credits";
import Slider from "../../components/Slider";
import SpanGenres from "../../components/SpanGenres";
import {
	getSeriesById,
	getSeriesCredits,
	getSeriesSimilar,
	getSeriesVideos,
} from "../../services/getData";
import { getImages } from "../../utils/getImages";
import { Background, Container, ContainerMovies, Cover, Info } from "./styles";

function DetailSeries() {
	const { id } = useParams();

	const [series, setSeries] = useState(null);
	const [seriesVideo, setSeriesVideo] = useState(null);
	const [seriesCredits, setSeriesCredits] = useState([]); // array direto
	const [seriesSimilar, setSeriesSimilar] = useState(null);

	useEffect(() => {
		async function getAllData() {
			try {
				const [seriesData, video, credits, similar] = await Promise.all([
					getSeriesById(id),
					getSeriesVideos(id),
					getSeriesCredits(id), // já retorna o cast (array)
					getSeriesSimilar(id),
				]);

				setSeries(seriesData);
				setSeriesVideo(video);
				setSeriesCredits(credits);
				setSeriesSimilar(similar);
			} catch (error) {
				console.error("Erro ao buscar dados da série:", error);
			}
		}

		getAllData();
	}, [id]);

	return (
		<>
			{series ? (
				<>
					<Background image={getImages(series.backdrop_path)} />
					<Container>
						<Cover>
							<img
								src={getImages(series.poster_path)}
								alt={`Poster de ${series.name}`}
							/>
						</Cover>
						<Info>
							<h2>{series.name}</h2>
							<SpanGenres genres={series.genres} />
							<p>{series.overview}</p>

							<div>
								<h3>Créditos principais</h3>
								<Credits credits={seriesCredits} />
							</div>
						</Info>
					</Container>

					<ContainerMovies>
						{seriesVideo ? (
							<div key={seriesVideo.id}>
								<h4>{seriesVideo.name}</h4>
								<iframe
									src={`https://www.youtube.com/embed/${seriesVideo.key}`}
									title={seriesVideo.name}
									height="500px"
									width="100%"
									allowFullScreen
								/>
							</div>
						) : (
							<p>Trailer não disponível para essa série.</p>
						)}
					</ContainerMovies>

					{seriesSimilar && (
						<Slider info={seriesSimilar} title="Séries Similares" />
					)}
				</>
			) : (
				<p>Carregando detalhes da série...</p>
			)}
		</>
	);
}

export default DetailSeries;
