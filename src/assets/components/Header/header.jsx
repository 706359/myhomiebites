import { useState } from 'react';

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className={menuOpen ? 'menu-open' : ''}>
			<nav className='nav'>
				<img src='/logo.png' alt='HomieBites Logo' height={120} />
				<div className='spacer'></div>
				<button className='menu-btn' onClick={() => setMenuOpen(!menuOpen)}>
					<i className='fa-solid fa-bars menu-icon'></i>
					<i className='fa-solid fa-xmark close-icon'></i>
					<span>Menu</span>
				</button>
				<ul>
					<li>
						<a className='pill' href='#rates'>
							Price List
						</a>
					</li>
					<li>
						<a className='pill' href='#about'>
							About
						</a>
					</li>
					<li>
						<a className='pill' href='#gallery'>
							Gallery
						</a>
					</li>
					<li>
						<a className='pill' href='#faq'>
							FAQ
						</a>
					</li>
					<li>
						<a className='pill' href='#contact'>
							Contact
						</a>
					</li>
					<li>
						<a
							className='cta'
							href='https://wa.me/919958983578'
							target='_blank'
							rel='noopener noreferrer'>
							Order on WhatsApp
						</a>
					</li>
					<div>
						<a	
							style={{cursor:'pointer', backgroundColor:'var(--brand-deep)'}}
							className='cta'
							target='_blank'
							rel='noopener noreferrer'>
							Subscribe Tiffin
						</a>
					</div>
				</ul>
			</nav>
		</header>
	);
}
