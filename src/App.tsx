import { useEffect, useState } from 'react';

import { Button } from './components/Button';
import { MovieCard } from './components/MovieCard';

// import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
console.log(selectedGenreId)

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
// 0: {id: 1, name: "action", title: "Ação"}
// 1: {id: 2, name: "comedy", title: "Comédia"}
// 2: {id: 3, name: "documentary", title: "Documentário"}
// 3: {id: 4, name: "drama", title: "Drama"}
// 4: {id: 5, name: "horror", title: "Terror"}
// 5: {id: 6, name: "family", title: "Família"}



  const [movies, setMovies] = useState<MovieProps[]>([]);
// 0: {Genre_id: 3, Title: "Apollo 11", Year: "2019", Rated: "G", }
// 1: {Genre_id: 3, Title: "Kiss the Ground", Year: "2020", Rated: "N/A"}
// 2: {Genre_id: 3, Title: "The Game Changers", Year: "2018", Rated: "N/A"}
// 3: {Genre_id: 3, Title: "American Factory", Year: "2019", Rated: "TV-14"}



  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
    // {
    // id: 2,
    // name: "comedy",
    // title: "Comédia",
    // }

  //GENRES
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);



  useEffect(() => {
    //MOVIES
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });


    //SELECTEDGENRE
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  console.log(selectedGenre)
  console.log(selectedGenreId)

  // Função que seta o generoId pelo id
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
     
      {/* SIDEBAR */}
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>

      <div className="container">

        {/* MAIN */}
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}