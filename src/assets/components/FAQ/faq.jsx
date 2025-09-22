import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function FAQ() {
	const [open, setOpen] = useState(null);

	const faqs = [
		{
			q: "What are your delivery timings?",
			a: "We deliver Breakfast (7:00 AM – 9:00 AM), Lunch (1:00 PM – 3:00 PM), and Dinner (7:00 PM – 9:00 PM) daily. Last orders are accepted until 7:00 PM.",
		},
		{
			q: "Do you deliver on weekends?",
			a: "Yes, we provide our services 7 days a week, including weekends and most holidays.",
		},
		{
			q: "Which areas do you cover for delivery?",
			a: "We currently deliver to all towers in Panchsheel Greens 1 only. Deliveries outside will start soon",
		},
		{
			q: "Is there a minimum order value?",
			a: "For home delivery, the minimum order value is ₹100. Orders below this amount may incur a small delivery charge.",
		},
		{
			q: "How can I place an order?",
			a: "You can place an order via WhatsApp or call us at +91-6395559255. We recommend placing orders at least 1 hour in advance.",
		},
	];

	const toggleFAQ = (index) => {
		setOpen(open === index ? null : index);
	};

	return (
		<section id='faq'>
			<div className='container'>
				<h2 className='section-title reveal in' data-animate=''>
					❓ Frequently Asked Questions
				</h2>

				<div className='faq-container'>
					{faqs.map((item, index) => (
						<div key={index} className={`faq-item reveal in ${open === index ? "active" : ""}`} data-animate=''>
							<div className='faq-question' onClick={() => toggleFAQ(index)}>
								{item.q}
								<FontAwesomeIcon icon={open === index ? faCaretUp : faCaretDown} style={{ marginLeft: "10px" }} />
							</div>
							<div className='faq-answer'>{item.a}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
