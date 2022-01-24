import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

Modal.setAppElement('#root');

function App() {

  // de-structure what useState function will return
  const [ anime, setAnime ] = useState([]);
  const [ userInput, setUserInput ] = useState("");
  const [ searchTerm, setSearchTerm ] = useState("");

  // font awesome button icon
  const questionMark = <FontAwesomeIcon icon={ faQuestionCircle }/>
  const [ openModal, setOpenModal ] = useState(false);

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
            <input type="text" id="search" placeholder="Violet Evergarden" label="" alt="Search your anime here" onChange={ handleInput } value={ userInput }/>

            <button className="search-button">Search</button>
          </form>

          <button className='how-to' onClick={ () => setOpenModal(true) } aria-label="Click to see how the site works!">{ questionMark }</button>
            <Modal 
              transparent={true}
              isOpen={ openModal } 
              onRequestClose={ () => setOpenModal(false)}
              style={
                {
                  content: {
                    textAlign: 'center',
                    height: '250px',
                  }
                }
              }>
              <h2>How to use the search</h2>
              <p>Enter the title of the anime you want to look up in the search bar. And hit search. Animes will populate below the header splash page by descending order. Powered by the Jikan API.</p>
              <div>
                <button className='close-button' onClick={ () => setOpenModal(false) }>Close</button>
              </div>
            </Modal>

          <section>
            {anime.map((show) => {
              return (
                <div className='main-display' key={show.mal_id}>
                  <img src={show.image_url} alt={show.title}/>
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
