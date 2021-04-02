import { useState, useEffect } from "react";
import { Button } from '../components/Button';
import { api } from '../services/api';

interface GenreResponseProps {
	id: number;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
}

interface SideBar {
	onClickButton(id: number): void;
	selected: number;
}


// PROPS:  onClickButton  & selected
export default function SideBar(props: SideBar) {
const [genres, setGenres] = useState<GenreResponseProps[]>([]);

useEffect(() => {
	api.get<GenreResponseProps[]>('genres').then(response => {
	setGenres(response.data);
	});
}, []);

return (
	<nav className="sidebar">
	<span>Watch<p>Me</p></span>

	<div className="buttons-container">
		{genres.map(genre => (
		<Button
			id={String(genre.id)}
			key={genre.id}
			title={genre.title}
			iconName={genre.name}
			onClick={() => props.onClickButton(genre.id)}
			selected={props.selected === genre.id}
		/>
		))}
	</div>
	</nav>
)
}


