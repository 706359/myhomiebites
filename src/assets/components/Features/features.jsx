import {
	faBowlFood,
	faCheck,
	faDroplet,
	faGift,
	faLeaf,
	faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Features = () => {
	return (
		<section>
			<div className='container features'>
				<div className='feature reveal in' data-animate=''>
					<FontAwesomeIcon icon={faLeaf} />
					<div>Pure Vegetarian</div>
				</div>
				<div className='feature reveal in' data-animate=''>
					<FontAwesomeIcon icon={faDroplet} />
					<div>Less Oil &amp; Spices</div>
				</div>
				<div className='feature reveal in' data-animate=''>
					<FontAwesomeIcon icon={faBowlFood} />
					<div>Home-like Taste</div>
				</div>
				<div className='feature reveal in' data-animate=''>
					<FontAwesomeIcon icon={faTruckFast} />
					<div>On-time Delivery</div>
				</div>
			</div>

			<div className='container special-offer reveal in' data-animate=''>
				<div className='special-offer-content'>
					<div className='special-offer-text'>
						<h3>
							<FontAwesomeIcon icon={faGift} /> Weekly Subscription Offer
						</h3>
						<p>
							Subscribe for a full week (7 days) and get <strong>10% OFF</strong> on
							your total bill! Perfect for busy professionals and families.
						</p>
					</div>
					<div className='special-offer-action'>
						<a
							className='btn btn-primary pulse'
							href="https://wa.me/919958983578?text=I'm%20interested%20in%20the%20weekly%20subscription%20offer"
							target='_blank'
							rel='noopener noreferrer'>
							<FontAwesomeIcon icon={faCheck} /> Get This Deal
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Features;
