import React, { useState } from "react";
import { ChefHat, Sparkles, Heart } from "lucide-react";
import styles from "./Gallery.module.css";

const galleryItems = [
  {
    src: "images/FullTiffin.jpg",
    alt: "Freshly prepared Indian thali",
    caption: "Full Tiffin Meal",
  },
  { src: "images/RotiSabji.png", alt: "Homemade rotis and curry", caption: "Roti with Sabzi" },
  {
    src: "images/DeliciousAaluParatha.jpg",
    alt: "Stuffed parathas with curd",
    caption: "Stuffed Parathas",
  },
  {
    src: "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg",
    alt: "Aloo matar with rice",
    caption: "Aloo Matar with Rice",
  },
  { src: "images/AalooPuri.jpg", alt: "Aloo matar with puri", caption: "Aloo Matar with Puri" },
  { src: "images/Curd.jpg", alt: "Homemade pure curd", caption: "Homemade Pure Curd" },
  { src: "images/MoondDalKhichdi.jpg", alt: "Moong dal khichdi", caption: "Khichdi" },
];

const specials = [
  { src: "images/Amritsarichhole.png", alt: "Amritsari Chhole" },
  { src: "images/lobhiya.jpg", alt: "Lobhiya Curry" },
  { src: "images/lokikofte.jpg", alt: "Lauki Kofte" },
  { src: "images/kadhipakora.jpg", alt: "Kadhi Pakora" },
  { src: "images/rajma.jpg", alt: "Rajma Curry" },
  { src: "images/kalachana.jpg", alt: "Kala Chana Curry" },
];

const kitchenMoments = [
  {
    src: "images/kitchen.png",
    alt: "Home chef kneading dough",
    caption: "Handmade Rotis, Daily",
  },
  {
    src: "images/kitchen1.png",
    alt: "Chef mixing spices",
    caption: "Traditional Spice Blends",
  },
  {
    src: "images/kitchen2.png",
    alt: "Freshly cut vegetables",
    caption: "Fresh Local Produce",
  },
];

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [specialHovered, setSpecialHovered] = useState(null);

  return (
    <section id='gallery' className={styles.gallerySection}>
      <div className={styles.bgAnimated}>
        <div className={styles.bgBlob1}></div>
        <div className={styles.bgBlob2}></div>
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <Sparkles className={styles.badgeIcon} />
            <p className={styles.badgeText}>Food Gallery</p>
          </div>

          <h2 className={styles.title}>Homely Meals • Real Kitchens</h2>

          <p className={styles.subtitle}>
            Discover the heart of Raavito — fresh, home-cooked meals crafted every day by trusted
            local chefs in their own kitchens.
          </p>
        </header>

        <div className={styles.grid}>
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`${styles.card} ${hoveredIndex === i ? styles.cardHovered : ""}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}>
              <div className={styles.cardImage}>
                <img src={item.src} alt={item.alt} loading='lazy' />
              </div>

              <div className={styles.cardOverlay}></div>

              <div className={styles.cardCaption}>
                <Heart
                  className={`${styles.heartIcon} ${hoveredIndex === i ? styles.heartActive : ""}`}
                />
                <span className={styles.captionText}>{item.caption}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.specialsSection}>
          <div className={styles.specialsHeader}>
            <div className={styles.badge}>
              <ChefHat className={styles.badgeIcon} />
              <span className={styles.badgeText}>Chef's Selection</span>
            </div>
            <h3 className={styles.specialsTitle}>Our Specials</h3>
          </div>

          <div className={styles.specialsGrid}>
            {specials.map((sp, i) => (
              <div
                key={i}
                className={`${styles.specialCard} ${specialHovered === i ? styles.specialCardHovered : ""}`}
                onMouseEnter={() => setSpecialHovered(i)}
                onMouseLeave={() => setSpecialHovered(null)}>
                <div className={styles.specialImage}>
                  <img src={sp.src} alt={sp.alt} loading='lazy' />
                </div>

                <div className={styles.specialOverlay}></div>

                <div className={styles.specialLabel}>{sp.alt}</div>
              </div>
            ))}
          </div>

          <div className={styles.specialsNote}>
            <p>6-Curry Showcase • Rotating Weekly Menus</p>
          </div>
        </div>

        <div className={styles.kitchenSection}>
          <div className={styles.kitchenHeader}>
            <h3 className={styles.kitchenTitle}>From Local Kitchens</h3>
            <p className={styles.kitchenSubtitle}>
              Every meal begins in a real home — where our partner chefs cook with warmth,
              tradition, and care.
            </p>
          </div>

          <div className={styles.kitchenGrid}>
            {kitchenMoments.map((km, i) => (
              <div key={i} className={styles.kitchenCard}>
                <div className={styles.kitchenImage}>
                  <img src={km.src} alt={km.alt} loading='lazy' />
                </div>

                <div className={styles.kitchenOverlay}></div>

                <div className={styles.kitchenCaption}>
                  <p>{km.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
