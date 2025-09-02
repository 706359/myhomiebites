import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const reviews = [
	{
		text: "The food tastes just like home! I've been ordering their tiffin for 3 months now and never been disappointed. Great quality and always on time.",
		name: 'Rahul Sharma',
		location: 'Panchsheel Greens',
		img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
	},
	{
		text: "As a working professional, HomieBites has been a lifesaver. The food is healthy, tasty and reminds me of my mother's cooking. Highly recommended!",
		name: 'Priya Gupta',
		location: 'Tower B2',
		img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
	},
	{
		text: 'I love their khichdi tiffin! Perfect balance of spices and always delivered hot. The weekly subscription offer is a great deal too.',
		name: 'Vikram Singh',
		location: 'A1 Tower',
		img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
	},
	{
		text: 'HomieBites is the best tiffin service in the area. Affordable, healthy and always fresh. My kids also enjoy the parathas.',
		name: 'Sneha Kapoor',
		location: 'Sector 76',
		img: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
	},
	{
		text: 'Portions are generous and packaging is neat. I’ve tried many services, but HomieBites stands out. Customer support is also very responsive.',
		name: 'Amit Verma',
		location: 'Mahagun Moderne',
		img: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
	},
];

const Testimonials = () => {
	return (
		<section id='testimonials'>
			<div className='container'>
				<h2 className='section-title reveal in' data-animate=''>
					💬 Customer Reviews
				</h2>

				<div className='testimonial-slider reveal in' data-animate=''>
					<div className='testimonial-track'>
						{reviews.map((review, idx) => (
							<div className='testimonial' key={idx}>
								<div className='testimonial-content'>
									<p>{review.text}</p>
									<div className='testimonial-author'>
										<img src={review.img} alt={review.name} loading='lazy' />
										<div>
											<strong>{review.name}</strong>
											<br />
											<small>{review.location}</small>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Slider Controls */}
					<div className='slider-controls'>
						<div className='slider-arrow prev-arrow'>
							<FontAwesomeIcon icon={faChevronLeft} />
						</div>
						<div className='slider-arrow next-arrow'>
							<FontAwesomeIcon icon={faChevronRight} />
						</div>
					</div>

					{/* Dynamic Dots */}
					<div className='slider-dots'>
						{reviews.map((_, idx) => (
							<div key={idx} className={`slider-dot ${idx === reviews.length - 1 ? 'active' : ''}`}></div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
