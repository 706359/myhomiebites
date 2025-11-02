import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faCheckCircle,
  faFileAlt,
  faRocket,
  faChartLine,
  faClock,
  faShieldAlt,
  faBolt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./PartnerWithUs.module.css";

export default function RaavitoPartnerPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const year = new Date().getFullYear();

  const phoneRegex = /^[0-9]{10}$/;
  const altRegex = /^[A-Za-z0-9/-]{5,}$/;

  const isValid =
    input.trim().length >= 5 && (phoneRegex.test(input.trim()) || altRegex.test(input.trim()));

  const features = [
    {
      icon: faChartLine,
      title: "Direct orders",
      desc: "Keep more revenue",
    },
    {
      icon: faBolt,
      title: "Realtime updates",
      desc: "Manage orders from app",
    },
    {
      icon: faRocket,
      title: "Simple onboarding",
      desc: "Minimal documents",
    },
  ];

  const steps = [
    {
      icon: faMobileAlt,
      step: "STEP 1",
      title: "Download the Raavito Merchant App",
      desc: "Available on Android & iOS for quick setup.",
    },
    {
      icon: faCheckCircle,
      step: "STEP 2",
      title: "Sign up with your mobile number",
      desc: "Create your account in minutes and verify instantly.",
    },
    {
      icon: faFileAlt,
      step: "STEP 3",
      title: "Submit kitchen information",
      desc: "Add your kitchen name, location, and upload your menu.",
    },
  ];

  const documents = [
    {
      text: "FSSAI or Business License",
      link: "Apply here",
    },
    {
      text: "Scanned copy of your menu (PDF/JPEG)",
      link: null,
    },
    {
      text: "Bank account & PAN card details",
      link: null,
    },
    {
      text: "GST Certificate (if applicable)",
      link: "Apply now",
    },
  ];

  const handleProceed = () => {
    if (isValid) {
      // Navigate to partner registration page
      navigate("/partner/register");
    }
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} id='login'>
        <div className={styles.heroGrid}>
          {/* Form Panel */}
          <div className={styles.formPanel}>
            <div className={styles.formBadge}>
              <FontAwesomeIcon icon={faRocket} />
              <span>Get Started</span>
            </div>

            <h3 className={styles.formTitle}>Start on RAAVITO</h3>
            <p className={styles.formSubtitle}>Enter mobile number to continue</p>

            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <FontAwesomeIcon icon={faMobileAlt} className={styles.inputIcon} />
                <input
                  type='text'
                  placeholder='Mobile Number'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={styles.input}
                />
              </div>

              <button
                type='button'
                disabled={!isValid}
                className={`${styles.proceedBtn} ${isValid ? styles.enabled : ""}`}
                onClick={handleProceed}>
                Proceed
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>

            <p className={styles.note}>
              <FontAwesomeIcon icon={faShieldAlt} className={styles.noteIcon} />
              We will use this to create your partner account.
              <a href='#' className={styles.link}>
                Privacy
              </a>
            </p>
          </div>

          {/* Hero Copy */}
          <div className={styles.heroCopy}>
            <div className={styles.badge}>
              <FontAwesomeIcon icon={faClock} />
              <span>Go live in 24 hours</span>
            </div>

            <h1 className={styles.heroTitle}>
              Bring your kitchen to
              <span className={styles.heroTitleEm}>more doors</span>
            </h1>

            <p className={styles.heroDesc}>
              Sign up. Get listed. Start receiving delivery orders in under 24 hours.
            </p>

            <ul className={styles.features}>
              {features.map((feature, index) => (
                <li key={index} className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <FontAwesomeIcon icon={feature.icon} />
                  </div>
                  <div className={styles.featureContent}>
                    <strong>{feature.title}</strong>
                    <span>{feature.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Onboarding Section */}
      <section className={styles.onboard}>
        <div className={styles.onboardWrap}>
          <header className={styles.onboardHeader}>
            <p className={styles.kicker}>Start serving with Raavito</p>
            <h2 className={styles.heading}>Your kitchen can go live in under a day!</h2>
          </header>

          <div className={styles.onboardGrid}>
            {/* Steps */}
            <div className={styles.stepsBox}>
              {steps.map((step, index) => (
                <div key={index} className={styles.step}>
                  <div className={styles.stepIcon}>
                    <FontAwesomeIcon icon={step.icon} />
                  </div>
                  <div className={styles.stepContent}>
                    <small className={styles.stepLabel}>{step.step}</small>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Documents Banner */}
            <div className={styles.docs}>
              <div className={styles.docsHeader}>
                <div className={styles.docsIcon}>
                  <FontAwesomeIcon icon={faFileAlt} />
                </div>
                <h4 className={styles.docsTitle}>What you'll need handy</h4>
              </div>

              <ul className={styles.docsList}>
                {documents.map((doc, index) => (
                  <li key={index} className={styles.docsItem}>
                    <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />
                    <span>
                      {doc.text}
                      {doc.link && (
                        <>
                          {" "}
                          <a href='#' className={styles.docsLink}>
                            {doc.link}
                          </a>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={styles.docsFooter}>
                <FontAwesomeIcon icon={faShieldAlt} />
                <span>All documents are securely encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© {year} RAAVITO — Partner platform</p>
          <div className={styles.footerLinks}>
            <a href='#'>Terms</a>
            <a href='#'>Privacy</a>
            <a href='#'>Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
