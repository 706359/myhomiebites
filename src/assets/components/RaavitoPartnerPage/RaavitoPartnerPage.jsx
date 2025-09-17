import { useState } from 'react';
import styles from './RaavitoPartnerPage.module.css';

export default function RaavitoPartnerPage() {
  const [input, setInput] = useState('');
  const year = new Date().getFullYear();

  const isValid =
    input.trim().length >= 5 &&
    (/^[0-9]{10}$/.test(input.trim()) || /^[A-Za-z0-9/-]{5,}$/.test(input.trim()));

  return (
    <div className={styles.page}>
      {/* Topbar */}
      <header className={styles.topbar}>
        <img src='logo.png' alt='RAAVITO' className={styles.logo} />
        <nav className={styles.nav}>
          <a href='#'>How it works</a>
          <a href='#'>Support</a>
          <a href='#' className={styles.cta}>
            Partner Login
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          {/* Form Panel */}
          <div className={styles.formPanel}>
            <h3>Start on RAAVITO</h3>
            <p>Enter Restaurant ID or mobile number to continue</p>
            <div className={styles.inputGroup}>
              <input
                type='text'
                placeholder='Restaurant ID or Mobile'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                disabled={!isValid}
                onClick={() => alert('Proceeding with: ' + input)}
                className={isValid ? styles.enabled : ''}>
                Proceed
              </button>
            </div>
            <p className={styles.note}>
              We will use this to create your partner account. <a href='#'>Privacy</a>
            </p>
          </div>

          {/* Hero Copy */}
          <div className={styles.heroCopy}>
            <h1>Bring your kitchen to more doors</h1>
            <p>Sign up. Get listed. Start receiving delivery orders in under 24 hours.</p>
            <ul className={styles.features}>
              <li>
                <strong>Direct orders</strong>
                <span>Keep more revenue</span>
              </li>
              <li>
                <strong>Realtime updates</strong>
                <span>Manage orders from app</span>
              </li>
              <li>
                <strong>Simple onboarding</strong>
                <span>Minimal documents</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Onboarding */}
      <section className={styles.onboard}>
        <div className={styles.steps}>
          <h3>Quick onboarding</h3>
          <ol>
            <li>
              <strong>Install RAAVITO Partner App</strong>
              <br />
              <span>Available on Play & App Store</span>
            </li>
            <li>
              <strong>Verify phone</strong>
              <br />
              <span>OTP based</span>
            </li>
            <li>
              <strong>Setup menu & bank</strong>
              <br />
              <span>Start receiving orders</span>
            </li>
          </ol>
        </div>

        <aside className={styles.docs}>
          <h4>Keep these ready</h4>
          <ul>
            <li>
              Business or FSSAI license <a href='#'>Apply</a>
            </li>
            <li>Menu (PDF)</li>
            <li>Bank details & PAN</li>
            <li>
              GST info <a href='#'>Apply</a>
            </li>
          </ul>
        </aside>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>© {year} RAAVITO — Partner platform</footer>
    </div>
  );
}
