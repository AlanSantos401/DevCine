import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Slider from '../../components/slider';
import api from '../../services/api';
import { GetImages } from '../../utils/getImages';
import { Background, Info, Poster, Container, ContainerButtons } from './styles';
import { useState, useEffect } from 'react';

function Home() {
	const [showModal, setShowModal] = useState();
	const [movie, setMovie] = useState();
	const [topMovies, setTopMovies] = useState();
	const [topSeries, setTopSeries] = useState();
	const [popularSeries, setPopularSeries] = useState();


   useEffect( () => {
	async	function getMovies() {
		const {data: {results}
	    } = await api.get('/movie/popular')
	
		setMovie(results[7])
	  }

	async function getTopMovies() {
		const {data: {results}
	    } = await api.get('/movie/top_rated')
	
		console.log(results)
		setTopMovies(results)
	}

   async	function getTopSeries() {
	const {data: {results}
	} = await api.get('/tv/top_rated')

	 console.log(results)
	 setTopSeries(results)
   }

   async	function getPopularSeries() {
	const {data: {results}
	} = await api.get('/tv/popular')

	 console.log(results)
	 setPopularSeries(results)
   }

	getMovies()
	getTopMovies()
	getTopSeries()
	getPopularSeries()

   }, [])


	return (
		<>
		 {movie && ( 
		   <Background img={GetImages(movie.backdrop_path)}>
           {showModal && <Modal movieId={movie.id} setShowModal={setShowModal}/>}
		<Container>
			<Info>
			<h1>{movie.title}</h1>
			<p>{movie.overview}</p>
			<ContainerButtons>
				<Button red>Assista Agora</Button>
				<Button onClick={() => setShowModal(true)}>Assista o Trailer</Button>
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
		</>
	);
}

export default Home;
