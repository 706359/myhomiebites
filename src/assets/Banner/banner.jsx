import styles from "./banner.module.css";

const Banner = () => {
  return (
    <section
      id='promo'
      className={styles.heroBanner}
      style={{ "--bg-img": "url('/images/vegthali.webp')" }}>
      <div className={styles.heroOverlay} aria-hidden='true' />
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            घर जैसा स्वाद,
            <br /> हर बाइट में
          </h1>
          <p className={styles.heroSub}>
            गाँव की सादगी, घर जैसा प्यार और सेहत का पूरा ख़्याल। भरोसेमंद होम शेफ़ से ताज़ा बना
            भोजन।
          </p>

          <div className={styles.heroButtons}>
            <a className='btn btn-primary pulse'>
              <i>एक बार खाओगे, भूल नहीं पाओगे</i>
            </a>
          </div>

          <ul className={styles.heroTags}>
            <li>ताज़ा & स्वच्छ</li>
            <li>घरेलू स्वाद</li>
            <li>लोकल डिलीवरी</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Banner;
