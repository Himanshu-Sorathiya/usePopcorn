import { useState } from 'react';

export function Main({ children }: { children: React.ReactNode }) {
	return <main className='main'>{children}</main>;
}

export function Box({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className='box'>
			<button
				className='btn-toggle'
				onClick={() => setIsOpen((open) => !open)}
			>
				{isOpen ? '–' : '+'}
			</button>

			{isOpen && children}
		</div>
	);
}
