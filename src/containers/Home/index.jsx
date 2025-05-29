import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ModalMovies from "../../components/ModalMovies";
import Slider from "../../components/Slider";
import {
	getMovies,
	getTopAnimes,
	getTopMovies,
	getTopSeries,
} from "../../services/getData";
import { getImages } from "../../utils/getImages";
import {
	Background,
	Container,
	ContainerButtons,
	Info,
	Poster,
} from "./styles";

function Home() {
	const [showModal, setShowModal] = useState(false);
	const [movie, setmovie] = useState();
	const [topMovies, setTopMovies] = useState();
	const [topSeries, setTopSeries] = useState();
	const [topAnimes, setTopAnimes] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		async function getAllData() {
			Promise.all([
				getMovies(0),
				getTopMovies(),
				getTopSeries(),
				getTopAnimes(),
			])
				.then(([movie, topMovies, topSeries, topAnimes]) => {
					setmovie(movie);
					setTopMovies(topMovies);
					setTopSeries(topSeries);
					setTopAnimes(topAnimes);
				})
				.catch((error) => console.error(error));
		}

		getAllData();
	}, []);

	return (
		<>
			{movie && (
				<Background img={getImages(movie.backdrop_path)}>
					{showModal && movie?.id && (
						<ModalMovies
							movieId={movie.id}
							type="movie"
							setShowModal={setShowModal}
						/>
					)}

					<Container>
						<Info>
							<h1>{movie.title}</h1>
							<p>{movie.overview}</p>
							<ContainerButtons>
								<Button red onClick={() => navigate(`/detalhe/movie/${movie.id}`)}>
									Assista Agora
								</Button>
								<Button onClick={() => setShowModal(true)}>
									Assista o Trailer
								</Button>
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
