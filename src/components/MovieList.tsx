import type { MovieList } from './App';

export function MovieList({
	movies,
	onSelectMovie,
}: {
	movies: MovieList[];
	onSelectMovie: (id: string) => void;
}) {
	return (
		<ul className='list list-movies'>
			{movies?.map((movie) => (
				<Movie
					key={movie.imdbId}
					movie={movie}
					onSelectMovie={onSelectMovie}
				/>
			))}
		</ul>
	);
}

export function Movie({
	movie,
	onSelectMovie,
}: {
	movie: MovieList;
	onSelectMovie: (id: string) => void;
}) {
	return (
		<li onClick={() => onSelectMovie(movie.imdbId)}>
			<img
				src={movie.poster}
				alt={`${movie.title} poster`}
			/>

			<h3>{movie.title}</h3>

			<div>
				<p>
					<span>🗓</span>
					<span>{movie.year}</span>
				</p>
			</div>
		</li>
	);
}
