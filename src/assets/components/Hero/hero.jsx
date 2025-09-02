export default function Hero() {
	return (
		<section id='home' className='hero'>
			<div className='hero-wrap'>
				<div>
					<h1 className='reveal in'>Homely & Healthy Meals – Delivered Fresh Daily</h1>
					<p className='muted reveal in' style={{ marginBlock: '2rem' }}>
						Pure veg tiffins from ₹120 • Freshly cooked • Panchsheel Greens-1 & nearby areas
					</p>
					<div className='badges reveal in'>
						<span className='badge'>
							<i className='fa-solid fa-truck-fast'></i> 🍽 Free Delivery*
						</span>
						<span className='badge'>
							<i className='fa-solid fa-kitchen-set'></i> 🧼 Hygienic Kitchen
						</span>
						<span className='badge'>
							<i className='fa-solid fa-calendar-day'></i> 📅 Daily Menu
						</span>
						<span className='badge'>
							<i className='fa-solid fa-calendar-day'></i> 🥗 Fresh Ingredients
						</span>
						<span className='badge'>
							<i className='fa-solid fa-calendar-day'></i> 🥘 Variety of Dishes
						</span>
						<span className='badge'>
							<i className='fa-solid fa-calendar-day'></i> 🌿 Healthy & Homemade
						</span>
					</div>
					<div className='cta-row' style={{ marginTop: '40px', justifySelf: 'center' }}>
						<a className='btn btn-primary pulse' href='https://wa.me/919958983578' target='_blank' rel='noopener'>
							<i className='fa-brands fa-whatsapp'></i> Order Now
						</a>
						<a className='btn btn-ghost' href='#rates'>
							<i className='fa-solid fa-utensils'></i> View Rate List
						</a>
					</div>
				</div>
				<div className='hero-illustration reveal in'>
					<div className='plate'>
						<img src='/images/VegThali1.avif' alt='Homemade Indian thali meal with variety of dishes' />
					</div>
					<div className='float f1'>🥗</div>
					<div className='float f2'>🍛</div>
					<div className='float f3'>🥙</div>
					<div className='float f4'>🍱</div>
					<div className='float f5'>🍲</div>
					<div className='float f6'>🍜</div>
				</div>
			</div>
		</section>
	);
}
