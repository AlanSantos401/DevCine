import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Container, Li, Menu } from "./styles";

function Header() {
	const [changeBackground, setChangeBacground] = useState(false);
	const { pathname } = useLocation();

	window.onscroll = () => {
		if (!changeBackground && window.pageYOffset > 150) {
			setChangeBacground(true);
		}	
		if(changeBackground && window.pageYOffset <= 150) {
			setChangeBacground(false)
		}
	};

	return (
		<Container changeBackground={changeBackground}>
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
