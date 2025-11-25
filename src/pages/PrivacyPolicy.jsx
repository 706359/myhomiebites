import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../assets/components/Footer/footer';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
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
            <span>Privacy & Protection</span>
          </p>
          <h2 className={styles.title}>Privacy Policy</h2>
          <p className={styles.sub}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className={styles.lastUpdated}>
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <div className={styles.content}>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>1. Introduction</h3>
            <p className={styles.paragraph}>
              Welcome to Raavito. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our food delivery application and website.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>2. Information We Collect</h3>
            <h4 className={styles.subSectionTitle}>2.1 Personal Information</h4>
            <ul className={styles.list}>
              <li>Name, email address, phone number</li>
              <li>Delivery address and location data</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Profile picture and preferences</li>
            </ul>

            <h4 className={styles.subSectionTitle}>2.2 Usage Information</h4>
            <ul className={styles.list}>
              <li>Order history and preferences</li>
              <li>Device information and IP address</li>
              <li>App usage patterns and interactions</li>
              <li>Location data (with your permission)</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>3. How We Use Your Information</h3>
            <p className={styles.paragraph}>We use your information to:</p>
            <ul className={styles.list}>
              <li>Process and deliver your orders</li>
              <li>Communicate with you about your orders</li>
              <li>Improve our services and user experience</li>
              <li>Send promotional offers and updates (with your consent)</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>4. Data Sharing</h3>
            <p className={styles.paragraph}>We may share your information with:</p>
            <ul className={styles.list}>
              <li>Kitchen partners for order fulfillment</li>
              <li>Delivery partners for order delivery</li>
              <li>Payment processors for transaction processing</li>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>5. Data Security</h3>
            <p className={styles.paragraph}>
              We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>6. Your Rights</h3>
            <p className={styles.paragraph}>You have the right to:</p>
            <ul className={styles.list}>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>7. Cookies and Tracking</h3>
            <p className={styles.paragraph}>
              We use cookies and similar technologies to enhance your experience, analyze usage, and personalize content. You can manage cookie preferences through your device settings.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>8. Children's Privacy</h3>
            <p className={styles.paragraph}>
              Our services are not intended for children under 18. We do not knowingly collect personal information from children.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>9. Changes to This Policy</h3>
            <p className={styles.paragraph}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>10. Contact Us</h3>
            <p className={styles.paragraph}>If you have questions about this Privacy Policy, please contact us at:</p>
            <div className={styles.contactBox}>
              <p className={styles.contactItem}>Email: privacy@raavito.com</p>
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

export default PrivacyPolicy;

