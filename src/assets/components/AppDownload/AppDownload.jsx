// AppDownload.jsx
import React from "react";
import styles from "./AppDownload.module.css";

const AppDownload = () => {
  const features = [
    {
      icon: (
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2'></polygon>
        </svg>
      ),
      text: "Lightning-fast performance",
    },
    {
      icon: (
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'></path>
        </svg>
      ),
      text: "Bank-level security",
    },
    {
      icon: (
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
        </svg>
      ),
      text: "Rated 4.8/5 by users",
    },
  ];

  const downloadButtons = [
    {
      platform: "App Store",
      label: "Download on the",
      icon: (
        <svg className={styles.buttonIcon} viewBox='0 0 24 24' fill='currentColor'>
          <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
        </svg>
      ),
      href: "#",
    },
    {
      platform: "Google Play",
      label: "Get it on",
      icon: (
        <svg className={styles.buttonIcon} viewBox='0 0 24 24' fill='currentColor'>
          <path d='M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z' />
        </svg>
      ),
      href: "#",
    },
  ];

  return (
    <section className={styles.appDownloadSection}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Content */}
          <div className={styles.content}>
            <div className={styles.badge}>
              <span>Download Now</span>
            </div>

            <h2 className={styles.heading}>Get the Raavito App</h2>

            <p className={styles.description}>
              Experience seamless connectivity and powerful features at your fingertips. Available
              for iOS and Android devices.
            </p>

            {/* Features List */}
            <div className={styles.features}>
              {features.map((feature, index) => (
                <div key={index} className={styles.feature}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className={styles.buttonGroup}>
              {downloadButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  className={styles.downloadButton}
                  aria-label={`Download RAAVITO on ${button.platform}`}>
                  {button.icon}
                  <div className={styles.buttonText}>
                    <div className={styles.buttonLabel}>{button.label}</div>
                    <div className={styles.buttonStore}>{button.platform}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Phone Mockup */}
          <div className={styles.phoneContainer}>
            <div className={styles.phoneMockup}>
              <div className={styles.phoneScreen}>
                <div className={styles.screenContent}>
                  <svg
                    width='80'
                    height='80'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <rect x='5' y='2' width='14' height='20' rx='2' ry='2'></rect>
                    <line x1='12' y1='18' x2='12.01' y2='18'></line>
                  </svg>
                  <div className={styles.appLogo}>RAAVITO</div>
                  <div className={styles.downloadCount}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'>
                      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                      <polyline points='7 10 12 15 17 10'></polyline>
                      <line x1='12' y1='15' x2='12' y2='3'></line>
                    </svg>
                    <span>10K+ Downloads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
