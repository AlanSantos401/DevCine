import Logo from '../../assets/logo.png';

function Header() {
	return (
		<div>
			<img src={Logo} alt="logo-dev-novies" style={{ width: 150 }} />
		</div>
	);
}

export default Header;
