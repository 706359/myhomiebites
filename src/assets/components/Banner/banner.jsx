import {
  faCheckCircle,
  faClock,
  faDownload,
  faHeart,
  faLeaf,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import styles from './banner.module.css';

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
      title: '100% Vegetarian',
      desc: 'Real home-style veg food',
    },
    {
      icon: faHeart,
      title: 'Made with Love',
      desc: 'Cooked by real home chefs',
    },
    {
      icon: faClock,
      title: 'Fresh Daily',
      desc: 'Prepared every single morning',
    },
  ];

  return (
    <section id='promo' className={styles.promoBanner}>
      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          {/* Left Content */}
          <div className={styles.leftContent}>
            <span className={styles.label}>Why People Choose Us</span>

            <h2 className={styles.title}>
              Good Food. Made Fresh.
              <br />
              <span className={styles.highlight}>Home-cooked</span> the way it should be.
            </h2>

            <p className={styles.description}>
              At Raavito, every meal comes straight from local home kitchens. Fresh, simple, and
              prepared by people who actually care about the food they make. No fancy gimmicks —
              just honest, homemade vegetarian meals delivered to you.
            </p>

            <ul className={styles.checkList}>
              <li>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Balanced meals that actually fill you up</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Clean and verified home kitchens</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Fresh food delivered in 30 minuts</span>
              </li>
            </ul>

            <div className={styles.ctaGroup}>
              <a href='#download' className={styles.primaryCta}>
                Download App
                <FontAwesomeIcon icon={faDownload} />
              </a>
              <a href='#about' className={styles.secondaryCta}>
                Know More
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
