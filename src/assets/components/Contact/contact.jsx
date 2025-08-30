const Contact = () => {
	return (
		<section id='contact'>
			<div class='container'>
				<h2 class='section-title reveal in' data-animate=''>
					Contact
				</h2>
				<div class='grid'>
					<div class='card reveal in' data-animate=''>
						<h3>
							<i class='fa-solid fa-phone'></i> Phone
						</h3>
						<p class='muted'>
							Call/WhatsApp:{' '}
							<a href='tel:+919958983578'>
								<b>+91-9958983578</b>
							</a>
						</p>
					</div>
					<div class='card reveal in' data-animate=''>
						<h3>
							<i class='fa-solid fa-location-dot'></i> Address
						</h3>
						<p class='muted'>
							A1-405, Panchsheel Greens • Self-pickup available (₹100 tiffin)
						</p>
					</div>
					<div class='card reveal in' data-animate=''>
						<h3>
							<i class='fa-solid fa-clock'></i> Timings
						</h3>
						<p class='muted'>Last order 7:30 PM • Delivery by 8:30 PM</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
