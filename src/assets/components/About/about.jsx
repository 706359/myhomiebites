import {
  faBolt,
  faHeart,
  faLeaf,
  faMapMarkerAlt,
  faShieldHeart,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './About.module.css';

export default function About() {
  const values = [
    {
      icon: faLeaf,
      title: 'Real Homemade Taste',
      desc: 'Fresh, simple, pure-veg meals made in real home kitchens.',
      color: 'green',
    },
    {
      icon: faHeart,
      title: 'From Hands You Trust',
      desc: "Food that feels like it's cooked by your mother, sister, or wife.",
      color: 'orange',
    },
    {
      icon: faBolt,
      title: 'Fresh & Hot Delivery',
      desc: 'Hyperlocal delivery so your food reaches warm, just like home.',
      color: 'deep',
    },
    {
      icon: faUsers,
      title: 'Supporting Home Chefs',
      desc: 'Helping neighbourhood cooks share their food and grow.',
      color: 'yellow',
    },
  ];

  return (
    <section id='about' className={styles.about}>
      <div className={styles.bgAccent} aria-hidden='true' />

      <div className={styles.wrap}>
        {/* Left Column */}
        <div className={styles.left}>
          <p className={styles.kicker}>
            <FontAwesomeIcon icon={faHeart} className={styles.kickerIcon} />
            <span>About Raavito</span>
          </p>

          <h2 className={styles.title}>
            Desi, homemade meals.
            <span className={styles.titleEm}> Served fresh & hot.</span>
          </h2>

          <p className={styles.subtitle}>
            At Raavito, we believe real food comes from real homes — not big brands or fancy
            restaurant kitchens. Our vision is simple: bring the warmth of homemade vegetarian meals
            to your doorstep.
          </p>

          <div className={styles.copy}>
            <p>
              Every meal comes with that familiar comfort — the kind you feel when someone at home
              cooks for you. Food that’s light on oil, balanced in taste, and made with real care.
            </p>

            <p>
              While others chase branding and “restaurant-style” glamour, Raavito focuses on the one
              thing that matters: <strong>ghar-ka-khana</strong>. Fresh, honest, and prepared by
              trusted home chefs.
            </p>

            <p>
              We’re currently serving the NCR region, but with the support and love for homemade
              food, we aim to take this feeling to families all across India.
            </p>
          </div>

          {/* Values Cards */}
          <div className={styles.values}>
            {values.map((value, index) => (
              <div
                key={index}
                className={styles.card}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${styles.cardIcon} ${styles[value.color]}`}>
                  <FontAwesomeIcon icon={value.icon} />
                </div>
                <div className={styles.cardContent}>
                  <h4>{value.title}</h4>
                  <p>{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.right}>
          <figure className={styles.heroMedia}>
            <img
              src='images/kitchen3.png'
              alt='Home chef preparing a fresh vegetarian meal'
              loading='lazy'
            />
            <figcaption className={styles.heroTag}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>Made in real home kitchens</span>
            </figcaption>
          </figure>

          <div className={styles.infoGrid}>
            <div className={`${styles.card} ${styles.soft} ${styles.infoCard}`}>
              <div className={styles.infoHeader}>
                <FontAwesomeIcon icon={faShieldHeart} className={styles.infoIcon} />
                <h4 className={styles.hGreen}>Care & Hygiene</h4>
              </div>
              <ul className={styles.list}>
                <li>Clean prep and home-style cooking</li>
                <li>Fresh ingredients, no added colours</li>
                <li>Safe, heat-retaining packaging</li>
              </ul>
            </div>

            <div className={`${styles.card} ${styles.soft} ${styles.infoCard}`}>
              <div className={styles.infoHeader}>
                <FontAwesomeIcon icon={faUsers} className={styles.infoIcon} />
                <h4 className={styles.hDeep}>Our Vision</h4>
              </div>
              <ul className={styles.list}>
                <li>Make homemade food easily accessible</li>
                <li>Support home chefs across India</li>
                <li>Deliver hot, desi meals with true home feels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
