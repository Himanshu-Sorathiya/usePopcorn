import { useState } from 'react';

import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useMovies } from '../hooks/useMovies';
import { Box, Main } from './Main';
import { MovieDetails } from './MovieDetails';
import { MovieList } from './MovieList';
import { Logo, NavBar, NumResults, SearchBar } from './NavBar';
import { ErrorMessage } from './utilities/ErrorMessage';
import { Loader } from './utilities/Loader';
import { WatchedMoviesList } from './WatchedMoviesList';
import { WatchedSummery } from './WatchedSummery';

export const KEY = '9898cffd';

export interface MovieList {
	imdbId: string;
	title: string;
	year: string;
	poster: string;
}

export interface WatchedMovie {
	imdbId: string;
	title: string;
	year: string;
	poster: string;
	runtime: number;
	imdbRating: number;
	userRating: number;
}

export function average(arr: number[]): number {
	const sum = arr.reduce((acc, cur) => acc + cur, 0);
	return sum / arr.length;
}

export default function App() {
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState('');

	const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

	const [watched, setWatched] = useLocalStorageState<WatchedMovie[]>([], 'watched');

	function handleSelectMovie(id: string) {
		setSelectedId((curr) => (id === curr ? '' : id));
	}

	function handleCloseMovie() {
		setSelectedId('');
	}

	function handleAddWatched(movie: WatchedMovie) {
		setWatched((watched) => [...watched, movie]);
	}

	function handleDeleteWatched(id: string) {
		setWatched(watched.filter((movie) => movie.imdbId !== id));
	}

	return (
		<>
			<NavBar>
				<Logo />

				<SearchBar
					query={query}
					setQuery={setQuery}
				/>

				<NumResults movies={movies} />
			</NavBar>

			<Main>
				<Box>
					{isLoading && <Loader />}

					{error && <ErrorMessage message={error} />}

					{!isLoading && !error && (
						<MovieList
							movies={movies}
							onSelectMovie={handleSelectMovie}
						/>
					)}
				</Box>

				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							watched={watched}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatched}
						/>
					) : (
						<>
							<WatchedSummery watched={watched} />

							<WatchedMoviesList
								watched={watched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
