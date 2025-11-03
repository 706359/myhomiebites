import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faHeart,
  faClock,
  faArrowRight,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: faLeaf,
      title: "100% Vegetarian",
      desc: "Pure veg meals, no compromise",
    },
    {
      icon: faHeart,
      title: "Made with Love",
      desc: "Home chefs cooking with care",
    },
    {
      icon: faClock,
      title: "Fresh Daily",
      desc: "Prepared fresh every morning",
    },
  ];

  return (
    <section id='promo' className={styles.promoBanner}>
      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          {/* Left Content */}
          <div className={styles.leftContent}>
            <span className={styles.label}>Why Choose Raavito</span>

            <h2 className={styles.title}>
              Pure. Fresh.
              <br />
              <span className={styles.highlight}>Home-Cooked</span> Every Day.
            </h2>

            <p className={styles.description}>
              Experience the warmth of homemade food with <strong>Raavito</strong>. Authentic
              vegetarian meals prepared by local home chefs, delivered fresh to your doorstep with
              love and care.
            </p>

            <ul className={styles.checkList}>
              <li>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Balanced nutrition in every meal</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Verified & hygienic home kitchens</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Same-day delivery in your area</span>
              </li>
            </ul>

            <div className={styles.ctaGroup}>
              <a href='#download' className={styles.primaryCta}>
                Order Now
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
              <a href='#about' className={styles.secondaryCta}>
                Learn More
              </a>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className={styles.rightContent}>
            <div className={styles.imageCard}>
              <img
                src='images/veg-thali.png'
                alt='Fresh vegetarian thali'
                className={styles.bannerImage}
              />
              <div className={styles.imageOverlay}>
                <span className={styles.overlayText}>Fresh Home-Cooked Meals</span>
              </div>
            </div>

            <div className={styles.featureGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <FontAwesomeIcon icon={feature.icon} />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
