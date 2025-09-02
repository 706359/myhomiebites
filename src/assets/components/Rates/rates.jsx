import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUtensils, faBowlRice, faPlus } from '@fortawesome/free-solid-svg-icons';

const Rates = () => {
	return (
		<section id='rates'>
			<div className='container'>
				<h2 className='section-title reveal in' data-animate=''>
					📋 Rate List
				</h2>

				<div className='grid'>
					{/* Full Tiffin */}
					<div className='card reveal in' data-animate=''>
						<span className='tag'>Best Seller</span>
						<h3>
							<FontAwesomeIcon icon={faStar} color='#FFD700' /> Full Tiffin
						</h3>
						<ul className='list'>
							<ul className='list header-row'>
								<li>
									<span>
										<b>Item</b>
									</span>{' '}
									<b className='price'>Price</b>
								</li>
							</ul>
							<li>
								<span>1 Full Tiffin</span> <b className='price'>₹120</b>
							</li>
						</ul>
						<div className='spl'>
							Gravy Sabji + Dry Sabji + 4 Rotis + Chawal
							<br />
							<small>(4 Rotis with Chawal / 6 Rotis without Chawal)</small>
						</div>
					</div>

					{/* Mix & Match Tiffin */}
					<div className='card reveal in' data-animate=''>
						<h3>
							<FontAwesomeIcon icon={faUtensils} color='orange' /> Mix &amp; Match
							Tiffin
						</h3>
						<ul className='list'>
							<ul className='list header-row'>
								<li>
									<span>
										<b>Item</b>
									</span>{' '}
									<b className='price'>Price</b>
								</li>
							</ul>
							<li>
								<span>2 Sabji + 6 Rotis</span> <b className='price'>₹120</b>
							</li>
							<li>
								<span>1 Sabji + 4 Rotis + Chawal</span>{' '}
								<b className='price'>₹100</b>
							</li>
							<li>
								<span>2 Sabji + 4 Rotis</span> <b className='price'>₹120</b>
							</li>
							<li>
								<span>1 Sabji + 6 Rotis</span> <b className='price'>₹100</b>
							</li>
							<li>
								<span>1 Sabji + 4 Rotis</span> <b className='price'>₹80</b>
							</li>
							<li>
								<span>1 Sabji + 2 Bowls Chawal</span> <b className='price'>₹100</b>
							</li>
							<li>
								<span>Only 1 Sabji</span> <b className='price'>₹40</b>
							</li>
						</ul>
					</div>

					{/* Khichdi Tiffin */}
					<div className='card reveal in' data-animate=''>
						<h3>
							<FontAwesomeIcon icon={faBowlRice} color='saddlebrown' /> Khichdi Tiffin
						</h3>
						<div className='spl'>Full Tiffin (4 bowls)</div>
						<ul className='list'>
							<ul className='list header-row'>
								<li>
									<span>
										<b>Item</b>
									</span>{' '}
									<b className='price'>Price</b>
								</li>
							</ul>
							<li>
								<span>Khichdi Meal</span> <b className='price'>₹120</b>
							</li>
						</ul>
					</div>

					{/* Rotis & Parathas */}
					<div className='card reveal in' data-animate=''>
						<h3>
							<i className='fa-solid fa-bread-slice'></i> Rotis &amp; Parathas
						</h3>
						<ul className='list'>
							<ul className='list header-row'>
								<li>
									<span>
										<b>Item</b>
									</span>{' '}
									<b className='price'>Price</b>
								</li>
							</ul>
							<li>
								<span>Plain Roti</span> <b className='price'>₹10</b>
							</li>
							<li>
								<span>Roti with Ghee</span> <b className='price'>₹12</b>
							</li>
							<li>
								<span>Plain Paratha</span> <b className='price'>₹20</b>
							</li>
							<li>
								<span>Stuffed Paratha (Aloo/Gobhi/Muli/Methi)</span>{' '}
								<b className='price'>₹35</b>
							</li>
							<li>
								<span>3 Stuffed Parathas</span> <b className='price'>₹100</b>
							</li>
						</ul>
					</div>

					{/* Breakfast Combos */}
					<div className='card reveal in' data-animate=''>
						<h3>🍳 Breakfast Combos</h3>
						<ul className='list'>
							<ul className='list header-row'>
								<li>
									<span>
										<b>Item</b>
									</span>{' '}
									<b className='price'>Price</b>
								</li>
							</ul>
							<li>
								<span>Stuffed Paratha Combo (Regular)</span>{' '}
								<b className='price'>₹120</b>
							</li>
							<li>
								<span>Paneer Paratha Combo</span> <b className='price'>₹130</b>
							</li>
							<li>
								<span>Desi Ghee Paratha Combo</span> <b className='price'>₹160</b>
							</li>
						</ul>
					</div>

					{/* Lunch Combos */}
					<div className='card reveal in' data-animate=''>
						<h3>🍛 Lunch Combos</h3>
						<ul className='list'>
							<ul className='list header-row'>
								<li>
									<span>
										<b>Item</b>
									</span>{' '}
									<b className='price'>Price</b>
								</li>
							</ul>
							<li>
								<span>Full Tiffin Meal</span> <b className='price'>₹140</b>
							</li>
							<li>
								<span>Stuffed Parathas with Curd</span>{' '}
								<b className='price'>₹110</b>
							</li>
							<li>
								<span>Aaloo Matar with Chawal</span> <b className='price'>₹90</b>
							</li>
							<li>
								<span>Aaloo Matar with Puri + Curd</span>{' '}
								<b className='price'>₹120</b>
							</li>
							<li>
								<span>Chhole & Lobhiya Combo</span> <b className='price'>₹100</b>
							</li>
							<li>
								<span>Rajma & Kala Chana Combo</span> <b className='price'>₹100</b>
							</li>
						</ul>
					</div>

					{/* Dinner Combos */}
					<div className='card reveal in' data-animate=''>
						<h3>🌙 Dinner Combos</h3>
						<ul className='list'>
							<ul className='list header-row'>
								<li>
									<span>
										<b>Item</b>
									</span>{' '}
									<b className='price'>Price</b>
								</li>
							</ul>
							<li>
								<span>Mini Tiffin</span> <b className='price'>₹100</b>
							</li>
							<li>
								<span>Protein Power Combo</span> <b className='price'>₹110</b>
							</li>
							<li>
								<span>Desi Comfort Combo</span> <b className='price'>₹100</b>
							</li>
							<li>
								<span>North Indian Classic</span> <b className='price'>₹120</b>
							</li>
							<li>
								<span>Puri Bhaji Combo</span> <b className='price'>₹120</b>
							</li>
							<li>
								<span>Paneer Paratha Deluxe</span> <b className='price'>₹150</b>
							</li>
							<li>
								<span>Gharwala Combo</span> <b className='price'>₹120</b>
							</li>
							<li>
								<span>Budget Combo</span> <b className='price'>₹90</b>
							</li>
							<li>
								<span>Light Meal Combo</span> <b className='price'>₹100</b>
							</li>
							<li>
								<span>Sabji Sampler</span> <b className='price'>₹110</b>
							</li>
						</ul>
					</div>

					{/* Add-ons */}
					<div className='card reveal in' data-animate=''>
						<h3>
							<FontAwesomeIcon icon={faPlus} color='black' /> Add-ons
						</h3>
						<ul className='list'>
							<ul className='list header-row'>
								<li>
									<span>
										<b>Item</b>
									</span>{' '}
									<b className='price'>Price</b>
								</li>
							</ul>
							<li>
								<span>Homemade Curd (1 Bowl)</span> <b className='price'>₹25</b>
							</li>
							<li>
								<span>Homemade Chatni</span> <b className='price'>₹10</b>
							</li>
						</ul>
					</div>

					{/* Pickup Option */}
					<div className='card reveal in' data-animate=''>
						<h3>🏠 Pickup Option</h3>
						<ul className='list'>
							<ul className='list header-row'>
								<li>
									<span>
										<b>Item</b>
									</span>{' '}
									<b className='price'>Price</b>
								</li>
							</ul>
							<li>
								<span>Self-Pickup (A1 Tower)</span> <b className='price'>₹100</b>
							</li>
						</ul>
						<div className='spl'>Thali &amp; Tiffin both available*</div>
					</div>
				</div>

				<div className='order reveal in' data-animate=''>
					<div>
						<strong>Ready to order?</strong>
						<br />
						Call{' '}
						<a href='tel:+919958983578'>
							<b>+91-9958983578</b>
						</a>{' '}
						or WhatsApp us. Last order 7:30 PM • Delivery by 8:30 PM
					</div>
					<div className='cta-row'>
						<a
							className='btn btn-primary pulse'
							href='https://wa.me/919958983578'
							target='_blank'
							rel='noopener noreferrer'>
							<i className='fa-brands fa-whatsapp'></i> WhatsApp Order
						</a>
						<a className='btn btn-ghost' href='tel:+919958983578'>
							<i className='fa-solid fa-phone'></i> Call Now
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Rates;
