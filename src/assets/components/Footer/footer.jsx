import React from 'react';

const Footer = () => {
	return (
		<footer>
			<div class='footer-inner'>
				<div class='footer-brand'>
					<img src='logo.png' alt='HomieBites Logo' height='80' width='80' />
				</div>

				<div className='footerButtons'>
					<a class='btn btn-ghost' href='#rates'>
						Rate List
					</a>
					<a
						class='btn btn-primary pulse'
						href='https://wa.me/919958983578'
						target='_blank'
						rel='noopener'>
						Order Now
					</a>
				</div>
			</div>

			<div class='footer-links'>
				<div class='footer-column'>
					<h4>Quick Links</h4>
					<ul>
						<li>
							<a href='#home'>Home</a>
						</li>
						<li>
							<a href='#rates'>Rate List</a>
						</li>
						<li>
							<a href='#about'>About Us</a>
						</li>
						<li>
							<a href='#gallery'>Food Gallery</a>
						</li>
					</ul>
				</div>

				<div class='footer-column'>
					<h4>Help</h4>
					<ul>
						<li>
							<a href='#faq'>FAQ</a>
						</li>
						<li>
							<a href='#contact'>Contact Us</a>
						</li>
						<li>
							<a href='https://wa.me/919958983578' target='_blank' rel='noopener'>
								WhatsApp Support
							</a>
						</li>
					</ul>
				</div>

				<div class='footer-column'>
					<h4>Service Areas</h4>
					<ul>
						<li>Panchsheel Greens-1</li>
						<li>Nearby Societies</li>
						<li>Delivers within a 2&nbsp;km radius</li>
					</ul>
				</div>
			</div>

			<div class='footer-bottom'>
				<p>
					© 2025 HomieBites. All rights reserved. | Home-cooked meals delivered with love
					❤️
				</p>
			</div>
		</footer>
	);
};

export default Footer;
