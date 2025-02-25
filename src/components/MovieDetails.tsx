import { useState, useRef, useEffect } from 'react';

import { WatchedMovie, KEY } from './App';
import { Loader } from './utilities/Loader';

import { useKey } from '../hooks/useKey';
import { StarRating } from './utilities/StarRating';

export function MovieDetails({
	selectedId,
	watched,
	onCloseMovie,
	onAddWatched,
}: {
	selectedId: string;
	watched: WatchedMovie[];
	onCloseMovie: () => void;
	onAddWatched: (movie: WatchedMovie) => void;
}) {
	const [movie, setMovie] = useState<any>({});
	const [userRating, setUserRating] = useState(0);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>('');

	const countRef = useRef(0);

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
		imdbID: imdbId,
	} = movie as {
		Title: string;
		Year: string;
		Poster: string;
		Runtime: string;
		imdbRating: number;
		Plot: string;
		Released: string;
		Actors: string;
		Director: string;
		Genre: string;
		imdbID: string;
	};

	const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbId === selectedId
	)?.userRating;

	function handleAdd() {
		const newWatchedMovie = {
			imdbId: selectedId,
			title,
			year,
			poster,
			runtime: +runtime.split(' ').at(0)!,
			imdbRating: Number(imdbRating),
			userRating,
		};

		onAddWatched(newWatchedMovie);
		onCloseMovie();
	}

	useKey('Escape', onCloseMovie);

	useEffect(
		function () {
			async function getMovieDetails() {
				try {
					setIsLoading(true);

					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
					);
					if (!res.ok) throw new Error('Something went wrong with fetching movies');

					const data = await res.json();
					if (data.Response === 'False') throw new Error('Movie not found');

					setMovie(data);
				} catch (err) {
					if (err instanceof Error) setError(err.message);
					else setError('An unknown error occurred');
				} finally {
					setIsLoading(false);
				}
			}
			getMovieDetails();
		},
		[selectedId]
	);

	useEffect(
		function () {
			if (!title) return;

			document.title = `Movie - ${title}`;

			return function () {
				document.title = 'usePopcorn';
			};
		},
		[title]
	);

	return (
		<div className='details'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button
							className='btn-back'
							onClick={onCloseMovie}
						>
							&larr;
						</button>

						<img
							src={poster}
							alt={`${title} poster`}
						/>
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐️</span>
								<span>{imdbRating} IMDB rating</span>
							</p>
						</div>
					</header>

					<section>
						<div className='rating'>
							{!isWatched ? (
								<>
									<StarRating onSetRating={setUserRating} />

									{userRating > 0 && (
										<div
											className='btn-add'
											onClick={handleAdd}
										>
											+ Add to list
										</div>
									)}
								</>
							) : (
								<p>You rated this movie with {watchedUserRating}⭐ </p>
							)}
						</div>

						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
}
