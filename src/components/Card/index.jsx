import { GetImages } from "../../utils/getImages";
import { Container } from './styles';

function Card({ item }) {
    return (
        <Container>
            <img src={GetImages(item.poster_path)} />
            <h3>{item.title || item.name}</h3>
        </Container>
    )
}

export default Card;