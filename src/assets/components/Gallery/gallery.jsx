const Gallery = () => {
	return (
		<section id='gallery'>
			<div class='container'>
				<h2 class='section-title reveal in' data-animate=''>
					📸 Food Gallery
				</h2>
				<p class='muted reveal' data-animate=''>
					Take a look at our freshly prepared meals, made with love and care.
				</p>

				<div class='gallery'>
					<div class='gallery-item reveal in' data-animate=''>
						<img
							src='/images/FullTiffin.jpg'
							alt='Freshly prepared Indian thali'
							loading='lazy'
						/>
						<div class='gallery-caption'>Full Tiffin Meal</div>
					</div>
					<div class='gallery-item reveal in' data-animate=''>
						<img
							src='/images/RotiSabji.webp'
							alt='Homemade rotis and curry'
							loading='lazy'
							data-broken-image-processed='true'
						/>
						<div class='gallery-caption'>Roti with Sabji</div>
					</div>
					<div class='gallery-item reveal in' data-animate=''>
						<img
							src='/images/DeliciousAaluParatha.jpg'
							alt='Stuffed parathas with curd'
							loading='lazy'
							data-broken-image-processed='true'
						/>
						<div class='gallery-caption'>Stuffed Parathas</div>
					</div>
					<div class='gallery-item reveal in' data-animate=''>
						<img
							src='https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg'
							alt='Khichdi with vegetables'
							loading='lazy'
							data-broken-image-processed='true'
						/>
						<div class='gallery-caption'>Aaloo Mater with Rice</div>
					</div>
					<div class='gallery-item reveal in' data-animate=''>
						<img
							src='/images/AalooPuri.jpg'
							alt='Aaloo Mater with Rice'
							loading='lazy'
							data-broken-image-processed='true'
						/>
						<div class='gallery-caption'>Aaloo Mater with Puri</div>
					</div>
					<div class='gallery-item reveal in' data-animate=''>
						<img
							src='/images/Curd.jpg'
							alt='Aaloo with Puri'
							loading='lazy'
							data-broken-image-processed='true'
						/>
						<div class='gallery-caption'>Homemade Pure Curd</div>
					</div>
					<div class='gallery-item reveal in' data-animate=''>
						<img
							src='/images/MoondDalKhichdi.jpg'
							alt='Khichdi'
							loading='lazy'
							data-broken-image-processed='true'
						/>
						<div class='gallery-caption'>Khichdi</div>
					</div>
					<div className='gallery-item reveal in' data-animate=''>
						<div className='gallery-grid-six'>
							<div className='gallery-img'>
								<img
									src='/images/Amritsarichhole.webp'
									alt='Amritsari Chhole'
									loading='lazy'
								/>
							</div>
							<div className='gallery-img'>
								<img src='/images/lobhiya.jpg' alt='Lobhiya Curry' loading='lazy' />
							</div>
							<div className='gallery-img'>
								<img src='/images/lokikofte.jpg' alt='Loki Kofte' loading='lazy' />
							</div>
							<div className='gallery-img'>
								<img
									src='/images/kadhipakora.jpg'
									alt='Rajma Curry'
									loading='lazy'
								/>
							</div>
							<div className='gallery-img'>
								<img src='/images/rajma.jpg' alt='Kadhi Pakora' loading='lazy' />
							</div>
							<div className='gallery-img'>
								<img
									src='/images/kalachana.jpg'
									alt='Kala Chana Curry'
									loading='lazy'
								/>
							</div>
						</div>
						<div className='gallery-caption'>Our Specials: 6-Curry Showcase</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Gallery;
