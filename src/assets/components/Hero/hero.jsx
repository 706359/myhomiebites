import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast, faUtensils, faLeaf, faCalendarDay, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from './Styles/style.module.css';

const badges = [
	{ id: 'b1', icon: faTruckFast, text: 'Free Delivery*' },
	{ id: 'b2', icon: faLeaf, text: 'Fresh Ingredients' },
	{ id: 'b3', icon: faUtensils, text: 'Daily Home-style Menu' },
	{ id: 'b4', icon: faCalendarDay, text: 'Delivered Daily' },
	{ id: 'b5', icon: faHeart, text: 'Healthy & Homemade' },
];

export default function Hero() {
	return (
		<section id='home' className={styles.hero}>
			<div className={styles.heroWrap}>
				<div className={styles.heroCopy}>
					<p className={styles.eyebrow}>Home-cooked • Pure Veg • Local</p>

					<h1 className={styles.heroTitle}>
						Homely, Healthy Meals
						<br />
						Delivered Fresh Every Day
					</h1>

					<p className={styles.heroSub}>Nutritious tiffins made with real ingredients and balanced flavours. Serving Panchsheel Greens-1 & nearby areas.</p>

					<div className={styles.badges}>
						{badges.map((b) => (
							<span className={styles.badge} key={b.id}>
								<FontAwesomeIcon icon={b.icon} /> {b.text}
							</span>
						))}
					</div>

					<div className={styles.ctaRow}>
						<a className={`${styles.btn} ${styles.btnPrimary} pulse`} href='https://wa.me/919958983578' target='_blank' rel='noopener noreferrer' aria-label='Order now on WhatsApp'>
							<FontAwesomeIcon icon={faWhatsapp} /> Order Now
						</a>

						<a className={`${styles.btn} ${styles.btnGhost}`} href='#rates' aria-label='View rate list'>
							<FontAwesomeIcon icon={faUtensils} /> View Rate List
						</a>
					</div>
				</div>

				<div className={styles.heroIllustration} role='img' aria-label='HomieBites Thali'>
					<div className={styles.plate}>
						<img src='/images/VegThali1.avif' alt='Homemade Indian thali meal with variety of dishes' loading='lazy' />
					</div>
				</div>
			</div>
		</section>
	);
}
