import { useEffect } from 'react';

export function useSmoothScroll() {
	useEffect(() => {
		const links = document.querySelectorAll('a[href^="#"]');

		const handleClick = (e) => {
			const targetId = e.currentTarget.getAttribute('href');
			if (targetId === '#') return;

			const targetEl = document.querySelector(targetId);
			if (targetEl) {
				e.preventDefault();
				window.scrollTo({
					top: targetEl.offsetTop - 70,
					behavior: 'smooth',
				});
				document.body.classList.remove('menu-open');
			}
		};

		links.forEach((link) => link.addEventListener('click', handleClick));

		return () => links.forEach((link) => link.removeEventListener('click', handleClick));
	}, []);
}
