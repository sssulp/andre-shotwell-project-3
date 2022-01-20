import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';

function App() {

  // de-structure what useState function will return
  const [ anime, setAnime ] = useState([]);
  const [ userInput, setUserInput ] = useState("");
  const [ searchTerm, setSearchTerm ] = useState("");

  // make an API call to Jikan API
  useEffect( () => {
    axios({
      url: 'https://api.jikan.moe/v3/search/anime?',
      method: "GET",
      dataResponse: "json",
      params: {
        q: searchTerm,
        order_by: 'title',
        sort: 'dsc',
        format: 'json',
      },
    }).then( (res) => {
      setAnime(res.data.results);
    }).catch( (error) => {
      if (error.message) {
        alert('Sorry, that anime does not exist! Please look up another one')
      } else {
        alert('The hamsters powering my computer ate through my code. I will get things fixed shortly. No worries, the hamsters are not in trouble..')
      }
    });
  }, [searchTerm]);

  // create function that tracks the user's input on the searchbar
  const handleInput = (event) => {
    setUserInput(event.target.value);
  }

  // create function that handles user's SUBMITTION of their input in the search bar
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput);
    setUserInput("");
  } 

  return (
    <div className="App">
      <Header />
      <main>
        <div className='wrapper'>
          <form onSubmit={ handleSubmit }>
            <input type="text" id="search" placeholder="Violet Evergarden" alt="Search your anime here" onChange={ handleInput } value={ userInput }/>
            <button>Search</button>
          </form>

          <section>
            {anime.map((show) => {
              return (
                <div className='main-display' key={show.mal_id}>
                  <img src={show.image_url}/>
                  <h2>{show.title}</h2>
                  <p className="anime-synopsis">About: {show.synopsis}</p>
                </div>
              )
            })}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
