import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUtensils, faBowlRice, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from "./style.module.css"
import { useState } from 'react';

let data = {
  fullTiffin: [{
    title: "1 Full Tiffin",
    price: 120
  }],

  mixMatchTiffin: [
    { title: "2 Sabji + 6 Rotis", price: 120 },
    { title: "1 Sabji + 4 Rotis + Chawal", price: 100 },
    { title: "2 Sabji + 4 Rotis", price: 120 },
    { title: "1 Sabji + 6 Rotis", price: 100 },
    { title: "1 Sabji + 4 Rotis", price: 80 },
    { title: "1 Sabji + 2 Bowls Chawal", price: 100 },
    { title: "Only 1 Sabji", price: 40 }
  ],
  khichdiTiffin: [
    { title: "Khichdi Meal", price: 120 }
  ],
  rotisParathas: [
    { title: "Plain Roti", price: 10 },
    { title: "Roti with Ghee", price: 12 },
    { title: "Plain Paratha", price: 20 },
    { title: "Stuffed Paratha (Aloo/Gobhi/Muli/Methi)", price: 35 },
    { title: "3 Stuffed Parathas", price: 100 }
  ],
  breakfastCombos: [
    { title: "Stuffed Paratha Combo (Regular)", price: 120 },
    { title: "Paneer Paratha Combo", price: 130 },
    { title: "Desi Ghee Paratha Combo", price: 160 }
  ],
  lunchCombos: [
    { title: "Full Tiffin Meal", price: 140 },
    { title: "Stuffed Parathas with Curd", price: 110 },
    { title: "Aaloo Matar with Chawal", price: 90 },
    { title: "Aaloo Matar with Puri + Curd", price: 120 },
    { title: "Chhole & Lobhiya Combo", price: 100 },
    { title: "Rajma & Kala Chana Combo", price: 100 }
  ],
  dinnerCombos: [
    { title: "Mini Tiffin", price: 100 },
    { title: "Protein Power Combo", price: 110 },
    { title: "Desi Comfort Combo", price: 100 },
    { title: "North Indian Classic", price: 120 },
    { title: "Puri Bhaji Combo", price: 120 },
    { title: "Paneer Paratha Deluxe", price: 150 },
    { title: "Gharwala Combo", price: 120 },
    { title: "Budget Combo", price: 90 },
    { title: "Light Meal Combo", price: 100 },
    { title: "Sabji Sampler", price: 110 }
  ],
  addOns: [
    { title: "Homemade Curd (1 Bowl)", price: 25 },
    { title: "Homemade Chatni", price: 10 }
  ],
  pickupOption: [
    { title: "Self-Pickup (A1 Tower)", price: 100 }
  ]
};

const Rates = () => {

	const [cart, setCart] = useState({});

	const updateQty = (id, change) => {
		setCart((prev) => {
			const current = prev[id] || 0;
			const next = current + change;
			return { ...prev, [id]: next > 0 ? next : 0 };
		});
	};
	return (
		<section id='rates'>
			<div className='container'>
				<h2 className='section-title reveal in' data-animate=''>
					📋 Rate List
				</h2>
				<div className='grid' >
				{Object.entries(data).map((entry,index)=>{
					let [type,priceList]=entry;
					return <div className='card reveal in' data-animate='' key={`Grid_${index}`}>
								{index ==0 && <span className='tag'>Best Seller</span>}
								<h3> <FontAwesomeIcon icon={faStar} color='#FFD700' /> {camelToPlain(type)} </h3>
								<ul className='list'>
									<ul className='list header-row'>
										<li>
											<span>
												<b>Item</b>
											</span>{' '}
											<b className='price'>Price</b>
										</li>
									</ul>
									{priceList.map((item,itemIndex)=>{
										return <li key={`gridItem_${index}${itemIndex}}`} className={cart[item.title] ? styles.hightlight:""}>
										<span>{item.title}</span> <b className='price'>₹{item.price}</b>
										<div className={styles.qtyControls}>
										<button onClick={() => updateQty(item.title, -1)}>-</button>
										<span>{cart[item.title] || 0}</span>
										<button onClick={() => updateQty(item.title, 1)}>+</button>
									</div>
									</li>	
									})}
								</ul>
								{/* <div className='spl'>
									Gravy Sabji + Dry Sabji + 4 Rotis + Chawal
									<br />
									<small>(4 Rotis with Chawal / 6 Rotis without Chawal)</small>
								</div> */}
							</div>
						
				})}
				</div>
			</div>
		</section>
	);
};

export default Rates;
function camelToPlain(text) {
  return text
    // Insert space before all caps
    .replace(/([A-Z])/g, " $1")
    // Capitalize the first letter
    .replace(/^./, str => str.toUpperCase())
    .trim();
}