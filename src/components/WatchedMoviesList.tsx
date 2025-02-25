import { type WatchedMovie } from './App';

export function WatchedMoviesList({
	watched,
	onDeleteWatched,
}: {
	watched: WatchedMovie[];
	onDeleteWatched: (id: string) => void;
}) {
	return (
		<ul className='list'>
			{watched.map((movie) => (
				<WatchedMovie
					key={movie.imdbId}
					movie={movie}
					onDeleteWatched={onDeleteWatched}
				/>
			))}
		</ul>
	);
}

export function WatchedMovie({
	movie,
	onDeleteWatched,
}: {
	movie: WatchedMovie;
	onDeleteWatched: (id: string) => void;
}) {
	return (
		<li>
			<img
				src={movie.poster}
				alt={`${movie.title} poster`}
			/>

			<h3>{movie.title}</h3>

			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>

				<div
					className='btn-delete'
					onClick={() => onDeleteWatched(movie.imdbId)}
				>
					X
				</div>
			</div>
		</li>
	);
}
