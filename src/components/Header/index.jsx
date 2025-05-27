import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Container, Li, Menu } from "./styles";

function Header() {
	const { pathname } = useLocation();

	return (
		<Container>
			<Link to={"/"}>
				<img src={Logo} alt="image-logo" />
			</Link>

			<Menu>
				<Li isActive={pathname.includes("filmes")}>
					<Link to={"/filmes"}>Filmes</Link>
				</Li>
				<Li isActive={pathname.includes("series")}>
					<Link to={"/series"}>Séries</Link>
				</Li>
				<Li isActive={pathname.includes("animes")}>
					<Link to={"/animes"}>Animes</Link>
				</Li>
			</Menu>
		</Container>
	);
}
export default Header;
