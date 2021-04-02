	import { useState } from 'react';
	import  SideBar  from './components/SideBar';
	import  Content  from './components/Content';
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

	export function App () {
	
	const [selectedGenreId, setSelectedGenreId] = useState(1);

	function handleClickButton(id: number) {
		setSelectedGenreId(id);
	}



	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
		
		<SideBar onClickButton={handleClickButton} selected={selectedGenreId} />

		<div className="container">
			<Content />
		
		</div>
		</div>
	)
	}