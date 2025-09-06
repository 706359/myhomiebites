import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUtensils, faBowlRice, faPlus, faHome, faBox } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';
import { menuItems } from '../../../data/menu';
import { useContext } from 'react';
import { Context } from '../../../store/store';

const iconMap = {
	fullTiffin: faStar,
	mixMatchTiffin: faUtensils,
	khichdiTiffin: faBowlRice,
	rotisParathas: faUtensils,
	breakfastCombos: faBox,
	lunchCombos: faUtensils,
	dinnerCombos: faUtensils,
	addOns: faPlus,
	pickupOption: faHome,
};

const Rates = () => {
	const { itemsSelected, setItemsSelected } = useContext(Context);

	function updateQty(name, qty, price) {
		setItemsSelected((prev) => {
			if (qty == 0) {
				// Remove
				let obj = prev.filter((item) => item.name !== name);
				return obj;
			} else {
				// Add - Update
				let old = prev.filter((item) => item.name !== name);
				let obj = [...old, { name, qty, price }];
				return obj;
			}
		});
	}
	return (
		<section id='rates'>
			<div className='container'>
				<h2 className='section-title reveal in' data-animate=''>
					📋 Rate List
				</h2>
				<div className='grid'>
					{Object.entries(menuItems).map(([type, priceList], index) => (
						<div className='card reveal in' data-animate='' key={`Grid_${index}`}>
							{index === 0 && <span className='tag'>Best Seller</span>}
							<h3>
								<FontAwesomeIcon icon={iconMap[type] || faUtensils} color='#FFD700' />
								{camelToPlain(type)}
							</h3>

							<ul className='list'>
								<ul className='list header-row'>
									<li>
										<span>
											<b>Item</b>
										</span>
										<b className='price'>Price</b>
										<b className='price'>Qty</b>
									</li>
								</ul>

								{priceList.map((item) => {
									const qty = itemsSelected.find((i) => i.name === item.name)?.qty || 0;
									return (
										<li key={item.id} className={qty > 0 ? styles.hightlight : ''}>
											<span>{item.name}</span>
											<b className='price'>₹{item.price}</b>
											<div className='qtySelect'>
												<select value={qty} onChange={(e) => updateQty(item.name, parseInt(e.target.value, 10), item.price)}>
													{[...Array(11)].map((_, i) => (
														<option key={i} value={i}>
															{i}
														</option>
													))}
												</select>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Rates;

function camelToPlain(text) {
	return text
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, (str) => str.toUpperCase())
		.trim();
}
