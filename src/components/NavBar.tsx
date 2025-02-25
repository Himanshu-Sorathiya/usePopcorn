import { useRef } from 'react';

import { MovieList } from './App';

import { useKey } from '../hooks/useKey';

export function NavBar({ children }: { children: React.ReactNode }) {
	return <nav className='nav-bar'>{children}</nav>;
}

export function Logo() {
	return (
		<div className='logo'>
			<span role='img'>🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

export function SearchBar({
	query,
	setQuery,
}: {
	query: string;
	setQuery: (query: string) => void;
}) {
	const inputEl = useRef<HTMLInputElement>(null);

	useKey('Enter', function () {
		if (document.activeElement === inputEl.current) return;

		inputEl.current?.focus();
		setQuery('');
	});

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputEl}
		/>
	);
}

export function NumResults({ movies }: { movies: MovieList[] }) {
	return (
		<p className='num-results'>
			Found <strong>{movies.length}</strong> results
		</p>
	);
}
