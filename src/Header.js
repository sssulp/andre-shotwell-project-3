// Header component
import backgroundVideo from './assets/anime-header-bg.mp4';

const Header = () => {
    return (
        <header>
            <div className="wrapper">
                <div className="title-splash">
                    <h1 className="title-logo">Anime<span className="title-second">Seeker</span></h1>
                    <p className="title-slogan">seek your next binge</p>
                </div>
            </div>
            <video autoPlay loop muted id='video'>
                <source src={ backgroundVideo } type='video/mp4' />
            </video>
        </header>
    );
};

export default Header;