import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./FAQ.module.css";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "What are your delivery timings?",
      a: "We deliver Breakfast (7:00 AM – 9:00 AM), Lunch (1:00 PM – 3:00 PM), and Dinner (7:00 PM – 9:00 PM) daily. Last orders are accepted until 7:00 PM.",
    },
    {
      q: "Do you deliver on weekends?",
      a: "Yes, Raavito provides service 7 days a week, including weekends and most holidays.",
    },
    {
      q: "Which areas do you currently deliver to?",
      a: "We currently serve all towers in Panchsheel Greens 1. Expansion to nearby sectors is coming soon.",
    },
    {
      q: "Is there a minimum order value?",
      a: "For home delivery, the minimum order is ₹100. Orders below this may have a small delivery charge.",
    },
    {
      q: "How can I place an order?",
      a: "All orders are accepted only via the Raavito app. Download the app, browse the daily menu, and order in a few taps.",
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
            Find quick answers to the most common queries about Raavito meals, delivery, and
            service.
          </p>
        </header>

        <div className={styles.container}>
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`${styles.item} ${open === index ? styles.active : ""}`}
              onClick={() => toggleFAQ(index)}>
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
