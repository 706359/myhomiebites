import styles from "./About.module.css";

export default function About() {
  return (
    <section id='about' className={styles.about}>
      <div className={styles.bgAccent} aria-hidden='true' />
      <div className={styles.wrap}>
        {/* LEFT */}
        <div className={styles.left}>
          <p className={styles.kicker}>About Raavito</p>

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

          <div className={styles.values}>
            <div className={styles.card}>
              <h4>Homemade & Hygienic</h4>
              <p>Verified kitchens. Clean prep. Transparent sourcing.</p>
            </div>
            <div className={styles.card}>
              <h4>Affordable & Honest</h4>
              <p>Clear rates. No surge gimmicks. Real portions.</p>
            </div>
            <div className={styles.card}>
              <h4>Local & Fast</h4>
              <p>Hyperlocal delivery for fresh, hot meals.</p>
            </div>
            <div className={styles.card}>
              <h4>Chef-First</h4>
              <p>Tools and support for neighbourhood cooks.</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <figure className={styles.heroMedia}>
            <img
              // src='images/homechef.png'
              src='images/kitchen3.png'
              alt='Home chef preparing a fresh vegetarian meal'
              loading='lazy'
            />
            <figcaption className={styles.heroTag}>From local home kitchens</figcaption>
          </figure>

          <div className={styles.infoGrid}>
            <div className={`${styles.card} ${styles.soft}`}>
              <h4 className={styles.hGreen}>Hygiene & Safety</h4>
              <ul className={styles.list}>
                <li>Gloves, hairnets, sanitized stations</li>
                <li>Fresh produce. No artificial colours</li>
                <li>Temperature-safe packing</li>
              </ul>
            </div>

            <div className={`${styles.card} ${styles.soft}`}>
              <h4 className={styles.hDeep}>Journey</h4>
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
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.num}>100% Veg</span>
              <span className={styles.lbl}>Pure Veg Kitchens</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.num}>~30 mins</span>
              <span className={styles.lbl}>Typical Delivery</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.num}>Daily Menu</span>
              <span className={styles.lbl}>Fresh Rotation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
