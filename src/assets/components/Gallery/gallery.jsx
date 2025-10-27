import React from "react";
import styles from "./Gallery.module.css";

const galleryItems = [
  {
    src: "/images/FullTiffin.jpg",
    alt: "Freshly prepared Indian thali",
    caption: "Full Tiffin Meal",
  },
  { src: "/images/RotiSabji.webp", alt: "Homemade rotis and curry", caption: "Roti with Sabzi" },
  {
    src: "/images/DeliciousAaluParatha.jpg",
    alt: "Stuffed parathas with curd",
    caption: "Stuffed Parathas",
  },
  {
    src: "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg",
    alt: "Aloo matar with rice",
    caption: "Aloo Matar with Rice",
  },
  { src: "/images/AalooPuri.jpg", alt: "Aloo matar with puri", caption: "Aloo Matar with Puri" },
  { src: "/images/Curd.jpg", alt: "Homemade pure curd", caption: "Homemade Pure Curd" },
  { src: "/images/MoondDalKhichdi.jpg", alt: "Moong dal khichdi", caption: "Khichdi" },
];

const specials = [
  { src: "/images/Amritsarichhole.webp", alt: "Amritsari Chhole" },
  { src: "/images/lobhiya.jpg", alt: "Lobhiya Curry" },
  { src: "/images/lokikofte.jpg", alt: "Lauki Kofte" },
  { src: "/images/kadhipakora.jpg", alt: "Kadhi Pakora" },
  { src: "/images/rajma.jpg", alt: "Rajma Curry" },
  { src: "/images/kalachana.jpg", alt: "Kala Chana Curry" },
];

const kitchenMoments = [
  {
    src: "/images/KitchenPrep1.jpg",
    alt: "Home chef kneading dough",
    caption: "Handmade Rotis, Daily",
  },
  {
    src: "/images/KitchenPrep2.jpg",
    alt: "Chef mixing spices",
    caption: "Traditional Spice Blends",
  },
  {
    src: "/images/KitchenPrep3.jpg",
    alt: "Freshly cut vegetables",
    caption: "Fresh Local Produce",
  },
];

export default function Gallery() {
  return (
    <section id='gallery' className={styles.gallerySection}>
      <div className={styles.bgAccent} aria-hidden='true' />
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.kicker}>Food Gallery</p>
          <h2 className={styles.title}>Homely Meals • Real Kitchens • Local Flavours</h2>
          <p className={styles.sub}>
            Discover the heart of Raavito — fresh, home-cooked meals crafted every day by trusted
            local chefs in their own kitchens.
          </p>
        </header>

        {/* Main food grid */}
        <div className={styles.grid}>
          {galleryItems.map((item, i) => (
            <figure key={i} className={styles.card}>
              <img src={item.src} alt={item.alt} loading='lazy' />
              <figcaption className={styles.overlay}>
                <span className={styles.overlayTag}>{item.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Specials section */}
        <div className={styles.specialsWrap}>
          <h3 className={styles.specialTitle}>Our Specials</h3>
          <div className={styles.specialGrid}>
            {specials.map((sp, i) => (
              <div key={i} className={styles.specialItem}>
                <img src={sp.src} alt={sp.alt} loading='lazy' />
                <div className={styles.tag}>{sp.alt}</div>
              </div>
            ))}
          </div>
          <p className={styles.specialNote}>6-Curry Showcase • Rotating Weekly Menus</p>
        </div>

        {/* Local Kitchen moments */}
        <div className={styles.kitchenSection}>
          <h3 className={styles.kitchenTitle}>From Local Kitchens</h3>
          <p className={styles.kitchenSub}>
            Every meal begins in a real home — where our partner chefs cook with warmth, tradition,
            and care.
          </p>
          <div className={styles.kitchenGrid}>
            {kitchenMoments.map((km, i) => (
              <div key={i} className={styles.kitchenCard}>
                <img src={km.src} alt={km.alt} loading='lazy' />
                <div className={styles.kitchenTag}>{km.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
