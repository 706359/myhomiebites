import React from "react";

const Testimonials = () => {
	return (
		<section id='testimonials'>
			<div class='container'>
				<h2 class='section-title reveal in' data-animate=''>
					💬 Customer Reviews
				</h2>

				<div class='testimonial-slider reveal in' data-animate=''>
					<div class='testimonial-track'>
						<div class='testimonial'>
							<div class='testimonial-content'>
								<p>
									The food tastes just like home! I've been ordering their tiffin
									for 3 months now and never been disappointed. Great quality and
									always on time.
								</p>
								<div class='testimonial-author'>
									<img
										src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
										alt='Rahul Sharma'
										loading='lazy'
										data-broken-image-processed='true'
									/>
									<div>
										<strong>Rahul Sharma</strong>
										<br />
										<small>Panchsheel Greens</small>
									</div>
								</div>
							</div>
						</div>
						<div class='testimonial'>
							<div class='testimonial-content'>
								<p>
									As a working professional, HomieBites has been a lifesaver. The
									food is healthy, tasty and reminds me of my mother's cooking.
									Highly recommended!
								</p>
								<div class='testimonial-author'>
									<img
										src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
										alt='Priya Gupta'
										loading='lazy'
										data-broken-image-processed='true'
									/>
									<div>
										<strong>Priya Gupta</strong>
										<br />
										<small>Tower B2</small>
									</div>
								</div>
							</div>
						</div>
						<div class='testimonial'>
							<div class='testimonial-content'>
								<p>
									I love their khichdi tiffin! Perfect balance of spices and
									always delivered hot. The weekly subscription offer is a great
									deal too.
								</p>
								<div class='testimonial-author'>
									<img
										src='https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
										alt='Vikram Singh'
										loading='lazy'
										data-broken-image-processed='true'
									/>
									<div>
										<strong>Vikram Singh</strong>
										<br />
										<small>A1 Tower</small>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class='slider-controls'>
						<div class='slider-arrow prev-arrow'>
							<i class='fa-solid fa-chevron-left'></i>
						</div>
						<div class='slider-arrow next-arrow'>
							<i class='fa-solid fa-chevron-right'></i>
						</div>
					</div>

					<div class='slider-dots'>
						<div class='slider-dot'></div>
						<div class='slider-dot'></div>
						<div class='slider-dot active'></div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
