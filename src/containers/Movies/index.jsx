import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ModalMovies from "../../components/ModalMovies";
import Slider from "../../components/Slider";
import { getMovies, getMoviesOne, getTopMovies } from "../../services/getData";
import { getImages } from "../../utils/getImages";
import {
	Background,
	Container,
	ContainerButtons,
	Info,
	Poster,
} from "./styles";

function Movies() {
	const [showModal, setShowModal] = useState(false);
	const [movie, setmovie] = useState();
	const [moviesOne, setMoviesOne] = useState();
	const [topMovies, setTopMovies] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		async function getAllData() {
			console.log({ getMoviesOne });
			Promise.all([getMovies(1), getMoviesOne(), getTopMovies()])
				.then(([movie, moviesOne, topMovies]) => {
					setmovie(movie);
					setMoviesOne(moviesOne);
					setTopMovies(topMovies);
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
			{moviesOne && <Slider info={moviesOne} title={"Filmes"} />}
			{topMovies && <Slider info={topMovies} title={"Top Filmes"} />}
		</>
	);
}

export default Movies;
