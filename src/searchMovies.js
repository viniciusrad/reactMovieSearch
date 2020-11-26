import React, { useState } from "react";

export default function SearchMovies() {
  //states-> input query, movies
  const [query, setQuery] = useState("");
  //Cria o estado e atualiza o estado
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=pt-BR&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      console.log(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Nome do filme
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="ex. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Buscar
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <div className="card" key={movie.id}>
              <img
                className="card--image"
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title + " poster"}
              />
              <div className="card--content">
                <h3 className="card--title"> {movie.title} </h3>
                <p>
                  <small> RELEASE DATE: {movie.release_date} </small>
                </p>
                <p>
                  <small> RATING: {movie.vote_average} </small>
                </p>
                <p className="card--desc"> {movie.overview} </p>
              </div>
            </div>
          ))}
      </div>
      <p className="info">
        Desenvolvido por Vinicius Ribeiro, utilizando react e a api fech do
        javascript
      </p>
      <p className="info">Hosting fornecido pela plataforma fleek</p>
    </>
  );
}
