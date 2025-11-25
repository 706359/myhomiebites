import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../assets/components/Footer/footer';
import styles from './TermsConditions.module.css';

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.bgDecor} aria-hidden='true' />
      
      <div className={styles.wrap}>
        <header className={styles.head}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← Back
          </button>
          <p className={styles.kicker}>
            <span>Legal Terms</span>
          </p>
          <h2 className={styles.title}>Terms & Conditions</h2>
          <p className={styles.sub}>
            Please read these terms carefully before using our services. By using Raavito, you agree to be bound by these terms.
          </p>
          <p className={styles.lastUpdated}>
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <div className={styles.content}>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>1. Acceptance of Terms</h3>
            <p className={styles.paragraph}>
              By accessing and using the Raavito application and website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>2. Use of Service</h3>
            <ul className={styles.list}>
              <li>You must be at least 18 years old to use our services</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree to provide accurate and complete information</li>
              <li>You will not use the service for any illegal or unauthorized purpose</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>3. Ordering and Payment</h3>
            <h4 className={styles.subSectionTitle}>3.1 Placing Orders</h4>
            <ul className={styles.list}>
              <li>Orders are subject to availability</li>
              <li>Prices are subject to change without notice</li>
              <li>We reserve the right to refuse or cancel orders</li>
              <li>Delivery times are estimates and not guaranteed</li>
            </ul>

            <h4 className={styles.subSectionTitle}>3.2 Payment</h4>
            <ul className={styles.list}>
              <li>Payment must be made at the time of order or upon delivery</li>
              <li>We accept cash on delivery, online payments, and digital wallets</li>
              <li>All prices are inclusive of applicable taxes</li>
              <li>Refunds will be processed as per our refund policy</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>4. Delivery</h3>
            <ul className={styles.list}>
              <li>Delivery charges may apply based on location</li>
              <li>We deliver to the address provided by you</li>
              <li>You must be available to receive the order</li>
              <li>We are not responsible for delays due to circumstances beyond our control</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>5. Cancellation and Refunds</h3>
            <ul className={styles.list}>
              <li>Orders can be cancelled before preparation begins</li>
              <li>Refunds will be processed within 5-7 business days</li>
              <li>Cancellation charges may apply for prepared orders</li>
              <li>No refunds for delivered orders unless there's a quality issue</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>6. Food Quality and Safety</h3>
            <ul className={styles.list}>
              <li>We ensure all food is prepared in hygienic conditions</li>
              <li>All our food is 100% vegetarian</li>
              <li>If you have allergies, please inform us before ordering</li>
              <li>Report any quality issues immediately for resolution</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>7. User Conduct</h3>
            <p className={styles.paragraph}>You agree not to:</p>
            <ul className={styles.list}>
              <li>Use the service for any unlawful purpose</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with the service's operation</li>
              <li>Attempt to gain unauthorized access to any part of the service</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>8. Intellectual Property</h3>
            <p className={styles.paragraph}>
              All content, logos, trademarks, and materials on Raavito are the property of Raavito and are protected by copyright and trademark laws. You may not use, reproduce, or distribute any content without our written permission.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>9. Limitation of Liability</h3>
            <p className={styles.paragraph}>
              Raavito shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service, including but not limited to food quality issues, delivery delays, or service interruptions.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>10. Modifications to Service</h3>
            <p className={styles.paragraph}>
              We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice. We are not liable to you or any third party for any modification or discontinuation.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>11. Governing Law</h3>
            <p className={styles.paragraph}>
              These Terms and Conditions are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Noida, India.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>12. Contact Information</h3>
            <p className={styles.paragraph}>For questions about these Terms and Conditions, contact us at:</p>
            <div className={styles.contactBox}>
              <p className={styles.contactItem}>Email: support@raavito.com</p>
              <p className={styles.contactItem}>Phone: +91-6395559255</p>
              <p className={styles.contactItem}>Address: Raavito, Noida Extension, India</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default TermsConditions;

