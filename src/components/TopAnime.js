const TopAnime = ({ anime }) => {

    return(
        <section className="anime-section">
            <div className="wrapper">
                <p className="suggested-anime">Here's a list of the top anime to get you started!</p>

                <div className="top-anime">
                    {
                        anime.map((anime, index) => {
                            return(
                                <div className="main-display" key={index}>
                                    <img src={anime.animeImage} alt={anime.animeName}/>
                                    <h2>{anime.animeName}</h2>
                                    <p className="anime-synopsis">Synopsis: {anime.animeSynopsis}</p>
                                </div>
                            );
                        })
                    };
                </div>
            </div>
        </section>
    )
}

export default TopAnime;
