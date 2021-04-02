import { useState, useEffect } from "react";
import { api } from '../services/api';
import { MovieCard } from '../components/MovieCard';

interface Content {
	selected: number;
}
interface GenreResponseProps {
	id: number;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
}

interface MovieProps {
	Title: string;
	Poster: string;
	Ratings: Array<{
	Source: string;
	Value: string;
	}>;
	Runtime: string;
}


// PROPS:  selected
export default function Content (props: Content) {
	
	const [movies, setMovies] = useState<MovieProps[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

	useEffect(() => {
		api.get<MovieProps[]>(`movies/?Genre_id=${props.selected}`).then(response => {
		setMovies(response.data);
	});

		api.get<GenreResponseProps>(`genres/${props.selected}`).then(response => {
		setSelectedGenre(response.data);
	})
	}, [props.selected]);


	return (
		<>
			<header>
				<span className="category">Categoria:<span> { selectedGenre.title }</span>
				</span>
			</header>

			<main>
				<div className="movies-list">
					{movies.map(movie => (
					<MovieCard key ={movie.Title} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
					))}
				</div>
			</main>
		</>
	)
	}