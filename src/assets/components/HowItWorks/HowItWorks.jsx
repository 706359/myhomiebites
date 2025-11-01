import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreenButton, faBowlRice, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import styles from "./HowItWorks.module.css";

const accents = [
  ["#de8c45", "#ffb070"],
  ["#29a3ff", "#9ed5ff"],
  ["#00c2a8", "#7ff0df"],
];

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const host = sectionRef.current;
    if (!host) return;
    const cards = host.querySelectorAll(`.${styles.card}`);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        }),
      { threshold: 0.15 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id='how' className={styles.section} ref={sectionRef} aria-labelledby='how-title'>
      <div className={styles.gridBackdrop} aria-hidden='true' />
      <div className={styles.wrap}>
        <header className={styles.head}>
          <p className={styles.kicker}>How Raavito Works</p>
          <h2 id='how-title' className={styles.title}>
            Fresh home-style food in 3 easy steps
          </h2>
          <p className={styles.sub}>App-only ordering. Simple. Fast. Reliable.</p>
        </header>

        <ol className={styles.grid}>
          {[
            {
              icon: faMobileScreenButton,
              h: "Order on the app",
              p: "Browse the daily menu, pick your meal or plan, and place the order in seconds.",
            },
            {
              icon: faBowlRice,
              h: "Cooked by local chefs",
              p: "Verified pure-veg kitchens prepare your food fresh, clean, and homely.",
            },
            {
              icon: faTruckFast,
              h: "Delivered hot",
              p: "Hyperlocal delivery brings it to your door on time. Eat while it’s hot.",
            },
          ].map((step, i) => {
            const [a, b] = accents[i % accents.length];
            return (
              <li
                key={i}
                className={styles.card}
                style={{ "--accent-a": a, "--accent-b": b, "--stagger": `${i * 90}ms` }}>
                <span className={styles.step}>{i + 1}</span>
                <span className={styles.ring}>
                  <span className={styles.ringGlow} />
                  <FontAwesomeIcon icon={step.icon} className={styles.icon} />
                </span>
                <h3 className={styles.h3}>{step.h}</h3>
                <p className={styles.p}>{step.p}</p>
              </li>
            );
          })}
        </ol>

        <div className={styles.cta}>
          <a href='/download' className={styles.btn}>
            Download App
          </a>
        </div>
      </div>
    </section>
  );
}
