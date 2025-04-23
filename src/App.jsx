import{useState, useEffect} from "react";
import React from "react";
import Header from "./components/header";
import Banner from "./components/Banner";
import ListMovie from "./components/ListMovie";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {

  const [movieList, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US&page=1");
        const data = await response.json();
        setMovie(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);



  return (
    <main>
      <Header/>
      <Banner/>
      <ListMovie/>
    </main>
  );
}

export default App;
