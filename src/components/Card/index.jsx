import { Container } from "./styles";
import { getImages } from "../../utils/getImages";

function Card({ item }) {
	return (
		<Container>
			<img src={getImages(item.poster_path)} alt="poster_image" />
			<h3>{item.title || item.name || ''}</h3>
		</Container>
	);
}

export default Card;
