import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styles from './FAQ.module.css';

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: 'What are your delivery timings?',
      a: 'Breakfast: 7–9 AM, Lunch: 1–3 PM, Dinner: 7–9 PM. Last orders close at 7 PM.',
    },
    {
      q: 'Do you deliver on weekends?',
      a: 'Yes, we deliver all 7 days, including weekends and most holidays.',
    },
    {
      q: 'Which areas do you deliver to?',
      a: 'We are currently delivering to all towers in Panchsheel Greens 1. Nearby sectors coming soon.',
    },
    {
      q: 'Is there a minimum order value?',
      a: 'Yes, the minimum order is ₹100. Below that, a small delivery fee may apply.',
    },
    {
      q: 'How can I place an order?',
      a: 'All orders are placed through the Raavito app. Just download the app and order from the daily menu.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept UPI, cards, net banking, and wallet payments.',
    },
    {
      q: "Can I pause or skip meals if I'm on a plan?",
      a: 'Yes. You can pause or skip your meal plan anytime through the Raavito app.',
    },
    {
      q: 'Are the meals hygienic and safe?',
      a: 'All meals are prepared by verified home chefs who follow Raavito’s hygiene checks and guidelines.',
    },
    {
      q: 'What if my delivery is delayed?',
      a: 'You’ll be notified in the app. Delays are rare, but we keep you informed.',
    },
    {
      q: 'How is the food packaged?',
      a: 'Meals come in food-grade, leak-proof containers designed to keep food fresh and warm.',
    },
    {
      q: 'How do I reach customer support?',
      a: 'You can contact support directly through the Help section in the Raavito app.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section id='faq' className={styles.section}>
      <div className={styles.sectionDivider}></div>

      <div className={styles.wrap}>
        <header className={styles.head}>
          <p className={styles.kicker}>Have Questions?</p>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.sub}>
            Quick answers about our meals, delivery, subscriptions, hygiene, and support.
          </p>
        </header>

        <div className={styles.container}>
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`${styles.item} ${open === index ? styles.active : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className={styles.question}>
                <span>{item.q}</span>
                <FontAwesomeIcon
                  icon={open === index ? faCaretUp : faCaretDown}
                  className={styles.icon}
                />
              </div>
              <div className={styles.answer}>
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
