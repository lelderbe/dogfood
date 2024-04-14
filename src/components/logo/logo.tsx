import logo from './assets/logo.svg';
import s from './logo.module.css';

function Logo() {
	return <img className={s.logo} src={logo} alt='DogFood' />;
}

export default Logo;
