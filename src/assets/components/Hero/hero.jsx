// Hero.jsx
import React, { useState, useEffect } from "react";
import {
  Truck,
  Leaf,
  Heart,
  ChefHat,
  Clock,
  Star,
  MapPin,
  ArrowRight,
  ChevronDown,
  Play,
} from "lucide-react";
import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";

const badges = [
  { id: 1, icon: Truck, text: "30min Delivery", color: "orange" },
  { id: 2, icon: Leaf, text: "100% Fresh", color: "green" },
  { id: 3, icon: Heart, text: "Homemade Love", color: "pink" },
  { id: 4, icon: ChefHat, text: "Local Chefs", color: "purple" },
];

const foodImages = [
  "./images/veg-thali.png",
  "./images/FullTiffin.jpg",
  "./images/DesiThali.jpeg",
  "./images/AalooPuri.jpg",
  "./images/Amritsarichhole.png",
  "./images/VegThali.png",
  "./images/MoondDalKhichdi.jpg",
  "./images/rajma.jpg",
  "./images/RotiSabji.png",
];

export default function Hero() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % foodImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const onScrollNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className={styles.hero}>
      {/* Animated Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={`${styles.blob} ${styles.blob1}`}></div>
        <div className={`${styles.blob} ${styles.blob2}`}></div>
        <div className={`${styles.blob} ${styles.blob3}`}></div>
      </div>

      {/* Floating Food Icons */}
      <div className={styles.floatingIcons}>
        {["🍛", "🥗", "🍕", "🍜", "🥘", "🍲"].map((emoji, i) => (
          <div
            key={i}
            className={styles.floatingIcon}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}>
            {emoji}
          </div>
        ))}
      </div>

      <div className={styles.heroContainer}>
        <div className={styles.heroGrid}>
          {/* Left Content */}
          <div
            className={styles.heroContent}
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
            {/* Premium Badge */}
            <div className={styles.premiumBadge}>
              <Star className={styles.starIcon} />
              <span className={styles.premiumText}>Building Trust for Homemade Food Lovers</span>
              <Star className={styles.starIcon} />
            </div>

            {/* Main Heading */}
            <div className={styles.headingSection}>
              <h1 className={styles.mainHeading}>
                <span className={styles.gradientText}>Homemade Meals</span>
                <span className={styles.blackText}>From Local Kitchens</span>
              </h1>

              <p className={styles.subheading}>
                Experience authentic home-cooked food made with love by local chefs. Fresh,
                hygienic, and delivered to your doorstep in minutes.
              </p>
            </div>

            {/* Feature Badges */}
            <div className={styles.badgesContainer}>
              {badges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className={styles.badge}
                    style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className={`${styles.badgeIcon} ${styles[`badge${badge.color}`]}`}>
                      <Icon className={styles.icon} />
                    </div>
                    <span className={styles.badgeText}>{badge.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              <button className='btn btn-primary'>
                <Play className={styles.playIcon} />
                Download App
              </button>

              <button className='btn btnGhost' onClick={() => navigate("/chef-registration")}>
                Partner with Raavito
              </button>
            </div>
          </div>

          {/* Right Content - Food Showcase */}
          <div
            className={styles.foodShowcase}
            style={{ transform: `translateY(${-scrollY * 0.15}px)` }}>
            <div className={styles.showcaseInner}>
              <div className={styles.imageContainer}>
                {/* Rotating Border */}
                <div className={styles.rotatingBorder}></div>

                {/* Main Image Container */}
                <div className={styles.mainImageWrapper}>
                  {foodImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Delicious food ${idx + 1}`}
                      className={`${styles.foodImage} ${
                        idx === currentImage ? styles.activeImage : ""
                      }`}
                    />
                  ))}

                  {/* Overlay Gradient */}
                  <div className={styles.imageOverlay}></div>
                </div>

                {/* Floating Mini Cards */}
                <div className={`${styles.floatingCard} ${styles.card1}`}>
                  <div className={styles.cardContent}>
                    <div className={`${styles.cardIcon} ${styles.greenGradient}`}>
                      <Leaf className={styles.icon} />
                    </div>
                    <div>
                      <div className={styles.cardTitle}>100% Fresh</div>
                      <div className={styles.cardSubtitle}>Organic Ingredients</div>
                    </div>
                  </div>
                </div>

                <div className={`${styles.floatingCard} ${styles.card2}`}>
                  <div className={styles.cardContent}>
                    <div className={`${styles.cardIcon} ${styles.orangeGradient}`}>
                      <Clock className={styles.icon} />
                    </div>
                    <div>
                      <div className={styles.cardTitle}>30 Minutes</div>
                      <div className={styles.cardSubtitle}>Fast Delivery</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className={styles.decorative1}></div>
              <div className={styles.decorative2}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Food Showcase */}
      <div className={styles.mobileShowcase}>
        <div className={styles.mobileImageWrapper}>
          <div className={styles.mobileRotatingBorder}></div>
          <div className={styles.mobileImageContainer}>
            {foodImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Delicious food ${idx + 1}`}
                className={`${styles.mobileFoodImage} ${
                  idx === currentImage ? styles.activeImage : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Floating Cards */}
        <div className={styles.mobileCards}>
          <div className={`${styles.mobileCard} ${styles.mobileCard1}`}>
            <Leaf className={styles.mobileCardIcon} />
            <span className={styles.mobileCardText}>100% Fresh</span>
          </div>
          <div className={`${styles.mobileCard} ${styles.mobileCard2}`}>
            <Clock className={styles.mobileCardIcon} />
            <span className={styles.mobileCardText}>30 Min Delivery</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={onScrollNext}
        className={styles.scrollIndicator}
        aria-label='Scroll to next section'>
        <span className={styles.scrollText}>Scroll to explore</span>
        <ChevronDown className={styles.chevronIcon} />
      </button>
    </section>
  );
}
