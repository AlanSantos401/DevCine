import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Slider from "../../components/Slider";
import api from "../../services/api";
import { getImages } from "../../utils/getImages";
import {
	Background,
	Container,
	ContainerButtons,
	Info,
	Poster,
} from "./styles";

function Home() {
	const [movie, setmovie] = useState();
	const [topMovies, setTopMovies] = useState();
	const [topSeries, setTopSeries] = useState();
	const [topAnimes, setTopAnimes] = useState();

	useEffect(() => {
		async function getMovies() {
			const {
				data: { results },
			} = await api.get("/movie/popular");

			setmovie(results[3]);
		}

		async function getTopMovies() {
			const {
				data: { results },
			} = await api.get("/movie/top_rated");

			console.log(results);
			setTopMovies(results);
		}

		async function getTopSeries() {
			const {
				data: { results },
			} = await api.get("/tv/top_rated");

			console.log(results);
			setTopSeries(results);
		}

		async function getTopAnimes() {
			try {
				const {
					data: { results },
				} = await api.get("/discover/tv", {
					params: {
						with_genres: 16,
						with_original_language: "ja",
						sort_by: "popularity.desc",
					},
				});

				console.log(results);
				setTopAnimes(results);
			} catch (error) {
				console.error("Erro ao buscar animes:", error);
			}
		}

		getMovies();
		getTopMovies();
		getTopSeries();
		getTopAnimes();
	}, []);

	return (
		<>
			{movie && (
				<Background img={getImages(movie.backdrop_path)}>
					<Container>
						<Info>
							<h1>{movie.title}</h1>
							<p>{movie.overview}</p>
							<ContainerButtons>
								<Button red={true}>Assista Agora</Button>
								<Button red={false}>Assista o Trailer</Button>
							</ContainerButtons>
						</Info>
						<Poster>
							<img alt="capa-do-filme" src={getImages(movie.poster_path)} />
						</Poster>
					</Container>
				</Background>
			)}
			{topMovies && <Slider info={topMovies} title={"Top Filmes"} />}
			{topSeries && <Slider info={topSeries} title={"Top Series"} />}
			{topAnimes && <Slider info={topAnimes} title={"Top Animes"} />}
		</>
	);
}

export default Home;
