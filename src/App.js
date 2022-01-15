import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';

function App() {

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
      setAnime(res.data.top);
    });
  }, [searchTerm]);

  // create function that tracks the user's input on the searchbar
  const handleInput = (event) => {
    console.log('is this working?', event.target.value);
    setUserInput(event.target.value);
  }

  // create function that handles user's SUBMITTION of their input in the search bar
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput);
  }

  return (
    <div className="App">
      <Header />
      <main>
        <form onSubmit={ handleSubmit }>
          <input type="text" id="search" placeholder="Naruto" onChange={ handleInput } value={ userInput }/>
          <button>Search</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default App;
