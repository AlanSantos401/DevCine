import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Slider from '../../components/Slider';
import { getMovies, getPopularSeries, getTopMovies, getTopSeries } from '../../services/getData';
import { GetImages } from '../../utils/getImages';
import { Pai, Background, Info, Poster, Container, ContainerButtons } from './styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const [showModal, setShowModal] = useState();
	const [movie, setMovie] = useState();
	const [topMovies, setTopMovies] = useState();
	const [topSeries, setTopSeries] = useState();
	const [popularSeries, setPopularSeries] = useState();
	const navigate = useNavigate();


   useEffect( () => {
	async function getAllData() {
		Promise.all([
			getMovies(),
			getTopMovies(),
			getTopSeries(),
			getPopularSeries()
		])
		 .then( ([movie, topMovies, topSeries, popularSeries]) => {
			setMovie (movie)
		    setTopMovies(topMovies)
		    setTopSeries(topSeries)
		    setPopularSeries(popularSeries)
		 })
		 .catch( error => console.error(error))
	    }
	  getAllData()
   }, [])


	return (
		<Pai>
		 {movie && ( 
		   <Background img={GetImages(movie.backdrop_path)}>
           {showModal && <Modal movieId={movie.id} setShowModal={setShowModal}/>}
		<Container>
			<Info>
			<h1>{movie.title}</h1>
			<p>{movie.overview}</p>
			<ContainerButtons>
				<Button red onClick={() => navigate(`/detalhe/${movie.id}`)}>
					Assista Agora
				</Button>
				<Button onClick={() => setShowModal(true)}>
					Assista o Trailer
				</Button>
			</ContainerButtons>
			</Info>
			<Poster>
				<img alt='capa-do-filme' src={GetImages(movie.poster_path)}/>
			</Poster>
		</Container>	
		   </Background>
		  )}
		    {topMovies && <Slider info={topMovies} title={'Top Filmes'}/>}
			{topSeries && <Slider info={topSeries} title={'Top Séries'}/>}
			{popularSeries && <Slider info={popularSeries} title={'Séries Populares'}/>}
		</Pai>
	);
}

export default Home;
