import { useEffect, useState } from 'react';

export function useLocalStorageState<T>(initialState: T, key: string) {
	const [value, setValue] = useState<T>(function () {
		const storedValue = localStorage.getItem(key)!;
		return storedValue ? JSON.parse(storedValue) : [];
	});

	useEffect(
		function () {
			localStorage.setItem(key, JSON.stringify(value));
		},
		[value, key]
	);

	return [value, setValue] as const;
}
