import React from 'react';

const galleryItems = [
	{
		src: '/images/FullTiffin.jpg',
		alt: 'Freshly prepared Indian thali',
		caption: 'Full Tiffin Meal',
	},
	{
		src: '/images/RotiSabji.webp',
		alt: 'Homemade rotis and curry',
		caption: 'Roti with Sabzi',
	},
	{
		src: '/images/DeliciousAaluParatha.jpg',
		alt: 'Stuffed parathas with curd',
		caption: 'Stuffed Parathas',
	},
	{
		src: 'https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg',
		alt: 'Aloo matar with rice',
		caption: 'Aloo Matar with Rice',
	},
	{
		src: '/images/AalooPuri.jpg',
		alt: 'Aloo matar with puri',
		caption: 'Aloo Matar with Puri',
	},
	{
		src: '/images/Curd.jpg',
		alt: 'Homemade pure curd',
		caption: 'Homemade Pure Curd',
	},
	{
		src: '/images/MoondDalKhichdi.jpg',
		alt: 'Moong dal khichdi',
		caption: 'Khichdi',
	},
];

const specials = [
	{ src: '/images/Amritsarichhole.webp', alt: 'Amritsari chhole' },
	{ src: '/images/lobhiya.jpg', alt: 'Lobhiya curry' },
	{ src: '/images/lokikofte.jpg', alt: 'Lauki kofte' },
	{ src: '/images/kadhipakora.jpg', alt: 'Kadhi pakora' },
	{ src: '/images/rajma.jpg', alt: 'Rajma curry' },
	{ src: '/images/kalachana.jpg', alt: 'Kala chana curry' },
];

const Gallery = () => {
	return (
		<section id='gallery'>
			<div className='container'>
				<h2 className='section-title reveal in' data-animate=''>
					📸 Food Gallery
				</h2>
				<p className='muted reveal' data-animate=''>
					Take a look at our freshly prepared meals, made with love and care.
				</p>

				<div className='gallery'>
					{galleryItems.map((item, idx) => (
						<div key={idx} className='gallery-item reveal in' data-animate=''>
							<img src={item.src} alt={item.alt} loading='lazy' />
							<div className='gallery-caption'>{item.caption}</div>
						</div>
					))}

					<div className='gallery-item reveal in' data-animate=''>
						<div className='gallery-grid-six'>
							{specials.map((sp, idx) => (
								<div key={idx} className='gallery-img'>
									<img src={sp.src} alt={sp.alt} loading='lazy' />
								</div>
							))}
						</div>
						<div className='gallery-caption'>Our Specials: 6-Curry Showcase</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Gallery;
