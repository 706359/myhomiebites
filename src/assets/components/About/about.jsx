const About = () => {
	return (
		<section id='about'>
			<div className='container'>
				<h2 className='section-title reveal in' data-animate=''>
					About HomieBites
				</h2>
				<p className='muted reveal in' data-animate='' style={{ maxWidth: '800px' }}>
					We serve fresh, homemade vegetarian meals prepared with care. Based at{' '}
					<b>A1-405, Panchsheel Greens</b>, we deliver daily tiffins throughout the
					neighborhood.
					<br />
					<br />
					At HomieBites, we believe good food should taste like home. Our meals are
					prepared in a clean, hygienic kitchen, using quality ingredients and traditional
					recipes. We focus on balanced nutrition with less oil and the perfect amount of
					spices to suit every palate.
					<br />
					<br />
					Founded in <b>Feb 2024</b>, our mission is to provide busy professionals and
					families with convenient access to healthy, home-style meals at affordable
					prices.
				</p>
			</div>
		</section>
	);
};

export default About;
