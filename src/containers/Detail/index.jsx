import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getMovieById,
	getMovieCredits,
	getMovieSimilar,
	getMovieVideos,
} from "../../services/getData";
import { getImages } from "../../utils/getImages";
import { Background, Container, Cover, Info } from "./styles";

function Detail() {
	const { id } = useParams();
	const [movie, setMovie] = useState();
	const [movieVideos, setMovieVideos] = useState();
	const [MovieCredits, setMovieCredits] = useState();
	const [movieSimilar, setMovieSimilar] = useState();

	useEffect(() => {
		async function getAllData() {
			Promise.all([
				getMovieById(id),
				getMovieVideos(id),
				getMovieCredits(id),
				getMovieSimilar(id),
			])
				.then(([movie, videos, credits, similar]) => {
					console.log({ movie, videos, similar, credits });
					setMovie(movie);
					setMovieVideos(videos);
					setMovieCredits(credits);
					setMovieSimilar(similar);
				})
				.catch((error) => console.error(error));
		}

		getAllData();
	}, []);

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
							<di>Generos</di>
							<p>{movie.overview}</p>
							<div>
								Credits
							</div>
						</Info>
					</Container>
				</>
			)}
		</>
	);
}

export default Detail;
