import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faHeart,
  faBolt,
  faUsers,
  faShieldHeart,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./About.module.css";

export default function About() {
  const values = [
    {
      icon: faLeaf,
      title: "Homemade & Hygienic",
      desc: "Verified kitchens. Clean prep. Transparent sourcing.",
      color: "green",
    },
    {
      icon: faHeart,
      title: "Affordable & Honest",
      desc: "Clear rates. No surge gimmicks. Real portions.",
      color: "orange",
    },
    {
      icon: faBolt,
      title: "Local & Fast",
      desc: "Hyperlocal delivery for fresh, hot meals.",
      color: "deep",
    },
    {
      icon: faUsers,
      title: "Chef-First",
      desc: "Tools and support for neighbourhood cooks.",
      color: "yellow",
    },
  ];

  return (
    <section id='about' className={styles.about}>
      <div className={styles.bgAccent} aria-hidden='true' />

      <div className={styles.wrap}>
        <div className={styles.left}>
          <p className={styles.kicker}>
            <FontAwesomeIcon icon={faHeart} className={styles.kickerIcon} />
            <span>About Raavito</span>
          </p>

          <h2 className={styles.title}>
            Homely meals. Local chefs.
            <span className={styles.titleEm}> Honest delivery.</span>
          </h2>

          <p className={styles.subtitle}>
            Authentic, home-cooked vegetarian food from verified neighbourhood kitchens. App-only
            ordering. The website builds trust and discovery.
          </p>

          <div className={styles.copy}>
            <p>
              Started in <strong>Feb 2024</strong> from <strong>A1-405, Panchsheel Greens</strong>.
              Daily meals that taste like home. Lower oil, fresh produce, balanced spice.
            </p>
            <p>
              Kitchens are verified. Menus rotate daily. Hyperlocal delivery for speed and
              consistency. No cloud factories. Real kitchens run by real people.
            </p>
          </div>

          {/* Values Cards */}
          <div className={styles.values}>
            {values.map((value, index) => (
              <div
                key={index}
                className={styles.card}
                style={{ animationDelay: `${index * 0.1}s` }}>
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
          {/* Hero Image */}
          <figure className={styles.heroMedia}>
            <img
              src='images/kitchen3.png'
              alt='Home chef preparing a fresh vegetarian meal'
              loading='lazy'
            />
            <figcaption className={styles.heroTag}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>From local home kitchens</span>
            </figcaption>
          </figure>

          {/* Info Cards */}
          <div className={styles.infoGrid}>
            <div className={`${styles.card} ${styles.soft} ${styles.infoCard}`}>
              <div className={styles.infoHeader}>
                <FontAwesomeIcon icon={faShieldHeart} className={styles.infoIcon} />
                <h4 className={styles.hGreen}>Hygiene & Safety</h4>
              </div>
              <ul className={styles.list}>
                <li>Gloves, hairnets, sanitized stations</li>
                <li>Fresh produce. No artificial colours</li>
                <li>Temperature-safe packing</li>
              </ul>
            </div>

            <div className={`${styles.card} ${styles.soft} ${styles.infoCard}`}>
              <div className={styles.infoHeader}>
                <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.infoIcon} />
                <h4 className={styles.hDeep}>Journey</h4>
              </div>
              <ul className={styles.list}>
                <li>
                  <strong>Feb 2024</strong> — First kitchen in Panchsheel Greens
                </li>
                <li>
                  <strong>2024–2025</strong> — Daily rotating menu, hyperlocal delivery
                </li>
                <li>
                  <strong>Next</strong> — More neighbourhood chefs. App-only ordering
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
