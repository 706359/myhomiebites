import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreenButton, faBowlRice, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const host = sectionRef.current;
    if (!host) return;
    const cards = host.querySelectorAll(`.${styles.card}`);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add(styles.visible)),
      { threshold: 0.15 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id='how' className={styles.section} ref={sectionRef}>
      <div className={styles.wrap}>
        <header className={styles.head}>
          <p className={styles.kicker}>How Raavito Works</p>
          <h2 className={styles.title}>Fresh home-style food in 3 easy steps</h2>
          <p className={styles.sub}>App-only ordering. Simple. Fast. Reliable.</p>
        </header>

        <ol className={styles.grid}>
          <li className={styles.card}>
            <span className={styles.step}>1</span>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faMobileScreenButton} />
            </div>
            <h3>Order on the app</h3>
            <p>Browse the daily menu, pick your meal or plan, and place the order in seconds.</p>
          </li>

          <li className={styles.card}>
            <span className={styles.step}>2</span>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faBowlRice} />
            </div>
            <h3>Cooked by local chefs</h3>
            <p>Verified pure-veg kitchens prepare your food fresh, clean, and homely.</p>
          </li>

          <li className={styles.card}>
            <span className={styles.step}>3</span>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faTruckFast} />
            </div>
            <h3>Delivered hot</h3>
            <p>Hyperlocal delivery brings it to your door on time. Eat while it’s hot.</p>
          </li>
        </ol>

        <div className={styles.cta}>
          <a href='/download' className='btn btn-primary'>
            Download App
          </a>
        </div>
      </div>
    </section>
  );
}
