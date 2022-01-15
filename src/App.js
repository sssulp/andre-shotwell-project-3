import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';

function App() {

  const [anime, setAnime] = useState([]);

  // useEffect to call API
  useEffect( () => {
    axios({
      url: 'https://api.jikan.moe/v3/top/anime',
      method: "GET",
      dataResponse: "json",
      params: {
        page: 1,
        subtype: "tv",
        format: "json" 
      }
    }).then( (response) => {
      console.log(response);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
