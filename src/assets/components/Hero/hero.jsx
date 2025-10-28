import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import {
  faLeaf,
  faHeart,
  faTruckFast,
  faUtensils,
  faBowlRice,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/style.module.css";

const badges = [
  { id: "b1", icon: faTruckFast, text: "Quick Local Delivery" },
  { id: "b2", icon: faLeaf, text: "Fresh & Hygienic" },
  { id: "b3", icon: faBowlRice, text: "Authentic Home Taste" },
  { id: "b4", icon: faUtensils, text: "Curated Daily Menu" },
  { id: "b5", icon: faHeart, text: "Made by Local Chefs" },
];
export default function Hero() {
  const navigate = useNavigate();

  const onScrollNext = useCallback(() => {
    const el = document.getElementById("home");
    let next = el?.nextElementSibling;
    while (next && next.tagName.toLowerCase() !== "section") next = next.nextElementSibling;
    (next || document.body).scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section id='home' className={styles.hero}>
      <div className={styles.overlay} aria-hidden='true' />

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Homemade • Pure Veg • Local Kitchens</p>

          <h1 className={styles.heroTitle}>
            <span>Homemade Meals,</span>
            <br />
            <span>Delivered Fresh from Local Kitchens</span>
          </h1>

          <p className={styles.heroSub}>
            Experience the comfort of freshly cooked, wholesome food made with real ingredients in
            trusted home kitchens near you.
          </p>

          <div className={styles.badges}>
            {badges.map((b) => (
              <span className={styles.badge} key={b.id}>
                <FontAwesomeIcon icon={b.icon} /> {b.text}
              </span>
            ))}
          </div>

          <div className={styles.ctaRow}>
            <button className='btn btn-primary pulse' href='/download'>
              <FontAwesomeIcon icon={faGooglePlay} /> Download App
            </button>
            <button
              className='btn btnGhost'
              href='/partner'
              onClick={() => navigate("/chef-registration")}>
              Partner with Raavito
            </button>
          </div>
        </div>
      </div>

      <button
        type='button'
        className={styles.scrollCue}
        onClick={onScrollNext}
        aria-label='Scroll to next section'>
        <span>Scroll</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </section>
  );
}
