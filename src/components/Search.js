import { Component } from "react";
import axios from 'axios';

class Search extends Component {
    constructor () {
        super();
        this.state = {
            animeSearch: " ",
            searchedAnime: [],
        }
    }

    handleChange = (e) => {
        this.setState({
            animeSearch: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.userSearch()

        this.setState({
            animeSearch: ""
        })
    }

    userSearch = () => {
        axios({
            method: "GET",
            url: "https://api.jikan.moe/v4/anime?",
            dataResponse: "json",
            params: {
                q: this.state.animeSearch,
                order_by: 'title',
                sort: 'dsc',
                format: "json"
            },
        }).then((response) => {

            const animeResults = response.data.data
            const newState = []
            console.log(response.data.data);

            animeResults.map((results) => {
                return newState.push({
                    title: results.title,
                    image: results.images.jpg.image_url,
                    synopsis: results.synopsis,
                    rating: results.rating,
                })
            })

            this.setState({
                searchedAnime: newState,
            });
        });

        // useEffect( () => {
        // axios({
        //     url: 'https://api.jikan.moe/v4/anime',
        //     method: "GET",
        //     dataResponse: "json",
        //     params: {
        //         q: searchTerm,
        //         order_by: 'title',
        //         sort: 'dsc',
        //         format: 'json',
        //         },
        //     }).then( (res) => {
        //         setAnime(res.data);
        //         // console.log(res.data);
        //     }).catch( (error) => {
        //         if (error.message) {
        //             alert('Sorry, that anime does not exist! Please look up another one')
        //         } else {
        //             alert('The hamsters powering my computer ate through my code. I will get things fixed shortly. No worries, the hamsters are not in trouble..')
        //         }
        //     });
        // }, [searchTerm]);
    };


    render() {
        return (
            <div className="anime-section">
                <div className="wrapper">
                    <form action="#" onSubmit={this.handleSubmit}>
                        <input type="text" id="search" placeholder="Demon Slayer" label="" alt="Search your anime here" onChange={this.handleChange}></input>
                        <button className="search-button">Search</button>
                    </form>
                </div>

                <div className="top-anime"> 
                    {
                        this.state.searchedAnime.map((results, index) => {
                            return (
                                <div className="main-display" key={index}>
                                    <img src={results.image} alt= {results.title} />
                                    <h2>{results.title}</h2>
                                    <p className="anime-synopsis">{results.synopsis}</p>
                                    <p className="anime-rating">Rated: {results.rating}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Search;