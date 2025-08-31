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
							alt='Khichdi with vegetables'
							loading='lazy'
							data-broken-image-processed='true'
						/>
						<div class='gallery-caption'>Aaloo Mater with Puri</div>
					</div>
					<div class='gallery-item reveal in' data-animate=''>
						<img
							src='/images/AalooPuri.jpg'
							alt='Aaloo with Puri'
							loading='lazy'
							data-broken-image-processed='true'
						/>
						<div class='gallery-caption'>Aaloo Mater with Rice</div>
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
							src='https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg'
							alt='Khichdi with vegetables'
							loading='lazy'
							data-broken-image-processed='true'
						/>
						<div class='gallery-caption'>Aaloo Mater with Rice</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Gallery;
