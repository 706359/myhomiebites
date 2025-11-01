import { useState } from "react";
import { Smartphone, CheckCircle, FileText } from "lucide-react";
import styles from "./RaavitoPartnerPage.module.css";

export default function RaavitoPartnerPage() {
  const [input, setInput] = useState("");
  const year = new Date().getFullYear();

  const phoneRegex = /^[0-9]{10}$/;
  const altRegex = /^[A-Za-z0-9/-]{5,}$/;

  const isValid =
    input.trim().length >= 5 && (phoneRegex.test(input.trim()) || altRegex.test(input.trim()));

  return (
    <div className={styles.page}>
      <section className={styles.hero} id='login'>
        <div className={styles.heroGrid}>
          <div className={styles.formPanel}>
            <h3>Start on RAAVITO</h3>
            <p>Enter mobile number to continue</p>
            <div className={styles.inputGroup}>
              <input
                type='text'
                placeholder='Mobile Number'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type='button'
                disabled={!isValid}
                className={isValid ? styles.enabled : ""}
                onClick={() => isValid && alert("Proceeding with: " + input)}>
                Proceed
              </button>
            </div>
            <p className={styles.note}>
              We will use this to create your partner account. <a href='#'>Privacy</a>
            </p>
          </div>

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

      <section className={styles.onboard}>
        <h2 className={styles.heading}>
          Start serving with Raavito <br />
          <span>Your kitchen can go live in under a day!</span>
        </h2>

        <div className={styles.onboardGrid}>
          <div className={styles.stepsBox}>
            <div className={styles.step}>
              <div className={styles.icon}>
                <Smartphone size={22} />
              </div>
              <div className={styles.text}>
                <small>STEP 1</small>
                <h3>Download the Raavito Merchant App</h3>
                <p>Available on Android & iOS for quick setup.</p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.icon}>
                <CheckCircle size={22} />
              </div>
              <div className={styles.text}>
                <small>STEP 2</small>
                <h3>Sign up with your mobile number</h3>
                <p>Create your account in minutes and verify instantly.</p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.icon}>
                <FileText size={22} />
              </div>
              <div className={styles.text}>
                <small>STEP 3</small>
                <h3>Submit kitchen information</h3>
                <p>Add your kitchen name, location, and upload your menu.</p>
              </div>
            </div>
          </div>

          <div className={`${styles.docs} ${styles.banner}`}>
            <h4>What you'll need handy</h4>
            <ul>
              <li>
                FSSAI or Business License <a href='#'>Apply here</a>
              </li>
              <li>Scanned copy of your menu (PDF/JPEG)</li>
              <li>Bank account & PAN card details</li>
              <li>
                GST Certificate (if applicable) <a href='#'>Apply now</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>© {year} RAAVITO — Partner platform</footer>
    </div>
  );
}
