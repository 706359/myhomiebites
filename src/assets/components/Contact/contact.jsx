import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
  faPaperPlane,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      form.current.reset();

      // Clear success message after 5 seconds
      setTimeout(() => setStatus(""), 5000);
    }, 1500);
  };

  return (
    <section id='contact' className={styles.section}>
      <div className={styles.bgDecor} aria-hidden='true' />

      <div className={styles.wrap}>
        <header className={styles.head}>
          <p className={styles.kicker}>
            <span>Contact Raavito</span>
          </p>
          <h2 className={styles.title}>Let's Connect & Collaborate</h2>
          <p className={styles.sub}>
            Have a question, feedback, or partnership idea? Fill the form below or reach us directly
            — we'll get back within 24 hours.
          </p>
        </header>

        <div className={styles.layout}>
          {/* Contact Info Cards */}
          <div className={styles.info}>
            <div className={styles.card}>
              <div className={styles.iconWrap}>
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div>
                <h3>Visit Our Office</h3>
                <p>
                  A1-405, Panchsheel Greens 1
                  <br />
                  Noida Extension, Uttar Pradesh
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.iconWrap}>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div>
                <h3>Email Us</h3>
                <p>support@raavito.com</p>
                <p className={styles.cardSubtext}>We respond within 24 hours</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.iconWrap}>
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div>
                <h3>Call Us</h3>
                <p>+91 63955 59255</p>
                <p className={styles.cardSubtext}>Mon-Fri, 9am-6pm IST</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={form} onSubmit={sendEmail} className={styles.form}>
            <div className={styles.formHeader}>
              <h3>Send us a Message</h3>
              <p>We're happy to assist you with anything Raavito!</p>
            </div>

            <div className={styles.formGrid}>
              <label className={styles.formField}>
                <span>Full Name *</span>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='John Doe'
                  required
                />
              </label>

              <label className={styles.formField}>
                <span>Email Address *</span>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='john@example.com'
                  required
                />
              </label>
            </div>

            <label className={styles.formField}>
              <span>Your Message *</span>
              <textarea
                name='message'
                rows='5'
                value={formData.message}
                onChange={handleChange}
                placeholder='Tell us how we can help you...'
                required
              />
            </label>

            <button type='submit' className={styles.submitBtn} disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <span className={styles.spinner}></span>
                  Sending Message...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Send Message
                </>
              )}
            </button>

            {status === "success" && (
              <div className={styles.success}>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            {status === "error" && (
              <div className={styles.error}>
                <FontAwesomeIcon icon={faExclamationCircle} />
                <span>Failed to send message. Please try again.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
