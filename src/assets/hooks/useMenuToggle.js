import { useEffect } from 'react';

export function useMenuToggle() {
	useEffect(() => {
		const menuBtn = document.getElementById('menuBtn');
		if (!menuBtn) return;

		const toggleMenu = () => document.body.classList.toggle('menu-open');
		const closeMenu = (e) => {
			if (
				document.body.classList.contains('menu-open') &&
				!e.target.closest('.menu-btn') &&
				!e.target.closest('.nav ul')
			) {
				document.body.classList.remove('menu-open');
			}
		};

		menuBtn.addEventListener('click', toggleMenu);
		document.addEventListener('click', closeMenu);

		return () => {
			menuBtn.removeEventListener('click', toggleMenu);
			document.removeEventListener('click', closeMenu);
		};
	}, []);
}
