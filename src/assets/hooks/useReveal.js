import { useEffect } from "react";

export function useReveal() {
	useEffect(() => {
		const elements = document.querySelectorAll("[data-animate]");

		const onScroll = () => {
			elements.forEach((el) => {
				const rect = el.getBoundingClientRect();
				if (rect.top < window.innerHeight - 50) {
					el.classList.add("reveal", "in");
				}
			});
		};

		window.addEventListener("scroll", onScroll);
		onScroll(); // run once on load

		return () => window.removeEventListener("scroll", onScroll);
	}, []);
}
