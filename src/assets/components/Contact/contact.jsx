import { faClock, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Styles/style.module.css';

const Contact = () => {
  return (
    <section id='contact' className={styles.contact}>
      <div className={styles.container}>
        <h2 className={`${styles.sectionTitle} reveal in`} data-animate=''>
          Contact
        </h2>

        <div className={styles.grid}>
          <div className={`${styles.card} reveal in`} data-animate=''>
            <div className={styles.iconBox}>
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <h3>Phone</h3>
            <p className={styles.muted}>
              Call/WhatsApp:{' '}
              <a href='tel:+919958983578'>
                <b>+91-9958983578</b>
              </a>
            </p>
          </div>

          <div className={`${styles.card} reveal in`} data-animate=''>
            <div className={styles.iconBox}>
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <h3>Address</h3>
            <p className={styles.muted}>
              A1-405, Panchsheel Greens
              <br />
              Self-pickup available (₹100 tiffin)
            </p>
          </div>

          <div className={`${styles.card} reveal in`} data-animate=''>
            <div className={styles.iconBox}>
              <FontAwesomeIcon icon={faClock} />
            </div>
            <h3>Timings</h3>

            <p className={styles.muted}>
              Breakfat • Lunch • Dinner <br />
              Last order 7:30 PM • Delivery by 8:30 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
