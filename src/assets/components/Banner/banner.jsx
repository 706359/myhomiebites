import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faUtensils, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import styles from "./banner.module.css";

const Banner = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id='promo'
      className={styles.heroBanner}
      style={{ "--bg-img": "url('images/veg-thali.png')" }}>
      <div className={styles.heroOverlay} aria-hidden='true' />

      <div className={styles.heroContainer}>
        <div ref={contentRef} className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Pure. Fresh. <br /> Home-Cooked Every Day.
          </h1>

          <p className={styles.heroSub}>
            Taste the comfort of home with <strong>Raavito</strong> — freshly cooked, 100%
            vegetarian meals prepared by local home chefs. Balanced, hygienic, and made with love.
            Because every bite should feel like home.
          </p>

          <div className={styles.heroButtons}>
            <a className='btn btn-primary pulse' aria-label=''>
              <i>Order Now on Raavito App</i>
            </a>
            <a className='btn btnGhost' href='#about' aria-label='Learn more about Raavito'>
              Learn More
            </a>
          </div>

          <ul className={styles.heroTags}>
            <li>
              <FontAwesomeIcon icon={faLeaf} /> 100% Vegetarian
            </li>
            <li>
              <FontAwesomeIcon icon={faUtensils} /> Home-Style Cooking
            </li>
            <li>
              <FontAwesomeIcon icon={faTruckFast} /> Free Daily Delivery*
            </li>
          </ul>

          <div className={styles.heroNote}>
            <p>
              Serving <strong>Panchsheel Greens 1</strong> and nearby areas. Morning to evening —
              fresh meals, same-day delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
