import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      form.current.reset();
    }, 1000);
  };

  return (
    <section id='contact' className={styles.section}>
      <div className={styles.bgDecor} aria-hidden='true' />

      <div className={styles.wrap}>
        <header className={styles.head}>
          <p className={styles.kicker}>Contact Raavito</p>
          <h2 className={styles.title}>Let’s Connect & Collaborate</h2>
          <p className={styles.sub}>
            Have a question, feedback, or partnership idea? Fill the form below or reach us directly
            — we’ll get back within 24 hours.
          </p>
        </header>

        <div className={styles.layout}>
          {/* Left Info Section */}
          <div className={styles.info}>
            <div className={styles.card}>
              <FontAwesomeIcon icon={faLocationDot} />
              <div>
                <h3>Address</h3>
                <p>
                  A1-405, Panchsheel Greens 1
                  <br />
                  Noida Extension, Uttar Pradesh
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <FontAwesomeIcon icon={faEnvelope} />
              <div>
                <h3>Email</h3>
                <p>support@raavito.com</p>
              </div>
            </div>

            <div className={styles.card}>
              <FontAwesomeIcon icon={faPhone} />
              <div>
                <h3>Phone</h3>
                <p>+91 63955 59255</p>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <form ref={form} onSubmit={sendEmail} className={styles.form}>
            <div className={styles.formHeader}>
              <h3>Send us a Message</h3>
              <p>We’re happy to assist you with anything Raavito!</p>
            </div>

            <label>
              <span>Name</span>
              <input type='text' name='name' placeholder='Enter your name' required />
            </label>

            <label>
              <span>Email</span>
              <input type='email' name='email' placeholder='Enter your email' required />
            </label>

            <label>
              <span>Message</span>
              <textarea name='message' rows='4' placeholder='Write your message...' required />
            </label>

            <button type='submit' className='btn btn-primary pulse'>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && <p className={styles.success}>Message sent successfully!</p>}
            {status === "error" && (
              <p className={styles.error}>Failed to send. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
