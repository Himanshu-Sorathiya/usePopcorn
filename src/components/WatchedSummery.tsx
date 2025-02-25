import { type WatchedMovie, average } from './App';

export function WatchedSummery({ watched }: { watched: WatchedMovie[] }) {
	const avgImdbRating = +average(watched.map((movie) => movie.imdbRating)).toFixed(
		2
	);
	const avgUserRating = +average(watched.map((movie) => movie.userRating)).toFixed(
		2
	);
	const avgRuntime = +average(watched.map((movie) => movie.runtime)).toFixed(2);

	return (
		<div className='summary'>
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}
