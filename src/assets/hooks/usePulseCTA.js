import { useEffect } from 'react';

export function usePulseCTA() {
	useEffect(() => {
		const timer = setTimeout(() => {
			const primaryBtns = document.querySelectorAll('.btn-primary');
			primaryBtns.forEach((btn) => btn.classList.add('pulse'));
		}, 3000);

		return () => clearTimeout(timer);
	}, []);
}
