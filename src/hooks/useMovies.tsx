import { useEffect, useState } from 'react';
import type { MovieList } from '../components/App';

const KEY = '9898cffd';

function convertData(
	arr: { imdbID: string; Title: string; Year: string; Poster: string }[]
): MovieList[] {
	return arr.map(({ imdbID, Title, Year, Poster }) => ({
		imdbId: imdbID,
		title: Title,
		year: Year,
		poster: Poster,
	}));
}

export function useMovies(query: string, handleCloseMovie?: () => void) {
	const [movies, setMovies] = useState<MovieList[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>('');

	useEffect(
		function () {
			const controller = new AbortController();

			async function getMovies() {
				try {
					setIsLoading(true);
					setError('');

					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
						{ signal: controller.signal }
					);
					if (!res.ok) throw new Error('Something went wrong with fetching movies');

					const data = await res.json();
					if (data.Response === 'False') throw new Error('Movie not found');

					const finalData = convertData(data.Search);

					setMovies(finalData);
					setError('');
				} catch (err) {
					if (err instanceof Error && err.name !== 'AbortError')
						setError(err.message);
					else setError('An unknown error occurred');
				} finally {
					setIsLoading(false);
				}
			}

			if (query.length < 3) {
				setMovies([]);
				setError('');
				return;
			}

			handleCloseMovie?.();
			getMovies();

			return function () {
				controller.abort();
			};
		},
		[query]
	);

	return {
		movies,
		isLoading,
		error,
	};
}
