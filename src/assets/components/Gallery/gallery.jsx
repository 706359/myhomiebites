import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ChefHat, Heart, MapPin } from "lucide-react";
import { fetchMenuItems, fetchKitchens } from "../../../utils/api";
import styles from "./Gallery.module.css";

// Fallback images if API doesn't return images
const fallbackImages = [
  { src: "images/FullTiffin.jpg", alt: "Full Tiffin Meal", caption: "Full Tiffin Meal" },
  { src: "images/RotiSabji.png", alt: "Roti with Sabzi", caption: "Roti with Sabzi" },
  { src: "images/DeliciousAaluParatha.jpg", alt: "Stuffed Parathas", caption: "Stuffed Parathas" },
  { src: "images/AalooPuri.jpg", alt: "Aloo Matar with Puri", caption: "Aloo Matar with Puri" },
  { src: "images/Curd.jpg", alt: "Homemade Pure Curd", caption: "Homemade Pure Curd" },
  { src: "images/MoondDalKhichdi.jpg", alt: "Khichdi", caption: "Khichdi" },
];

const specials = [
  { src: "images/Amritsarichhole.png", alt: "Amritsari Chhole" },
  { src: "images/lobhiya.jpg", alt: "Lobhiya Curry" },
  { src: "images/lokikofte.jpg", alt: "Lauki Kofte" },
  { src: "images/kadhipakora.jpg", alt: "Kadhi Pakora" },
  { src: "images/rajma.jpg", alt: "Rajma Curry" },
  { src: "images/kalachana.jpg", alt: "Kala Chana Curry" },
];

// Fallback kitchen images if API doesn't return images
const fallbackKitchenImages = [
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [kitchens, setKitchens] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [kitchensLoading, setKitchensLoading] = useState(true);
  const galleryScrollRef = useRef(null);
  const specialsScrollRef = useRef(null);

  // Fetch menu items from API
  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        setLoading(true);
        // Fetch menu items with images - limit to items with images
        const items = await fetchMenuItems({});
        
        // Transform menu items to gallery format
        const transformedItems = items
          .filter(item => item.image) // Only items with images
          .slice(0, 12) // Limit to 12 items
          .map((item) => ({
            id: item._id,
            src: item.image,
            alt: item.name,
            caption: item.name,
            description: item.description,
            price: item.price,
            kitchen: item.kitchen?.name || "Raavito Kitchen",
          }));
        
        // If we have items from API, use them; otherwise use fallback
        if (transformedItems.length > 0) {
          setGalleryItems(transformedItems);
        } else {
          setGalleryItems(fallbackImages);
        }
      } catch (error) {
        console.error("Error loading menu items:", error);
        // Use fallback images on error
        setGalleryItems(fallbackImages);
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  // Get user location and fetch kitchens
  useEffect(() => {
    const loadKitchens = async () => {
      try {
        setKitchensLoading(true);
        
        // Get user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              // Reverse geocode to get city/location name
              try {
                // Using a free reverse geocoding service (you can replace with your preferred service)
                const geoResponse = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const geoData = await geoResponse.json();
                const locationName = geoData.city || geoData.locality || geoData.principalSubdivision || "Your Area";
                setUserLocation(locationName);
              } catch (geoError) {
                console.error("Geocoding error:", geoError);
                setUserLocation("Your Area");
              }
            },
            (error) => {
              console.error("Location error:", error);
              setUserLocation(null);
            },
            { timeout: 5000, enableHighAccuracy: false }
          );
        }

        // Fetch kitchens (top-rated and active)
        const kitchensData = await fetchKitchens({ topRated: true });
        
        // Transform kitchens to gallery format
        const transformedKitchens = kitchensData
          .filter(kitchen => kitchen.image && kitchen.isActive && kitchen.isVerified)
          .slice(0, 6) // Limit to 6 kitchens
          .map((kitchen) => ({
            id: kitchen._id,
            src: kitchen.image,
            alt: kitchen.name,
            caption: kitchen.name,
            description: kitchen.description,
            location: kitchen.location || kitchen.address,
            rating: kitchen.rating || kitchen.averageRating || 0,
            deliveryTime: kitchen.deliveryTime || "30 mins",
            cuisineType: kitchen.cuisineType,
            discount: kitchen.discount,
          }));
        
        if (transformedKitchens.length > 0) {
          setKitchens(transformedKitchens);
        } else {
          // Use fallback images if no kitchens found
          setKitchens(fallbackKitchenImages.map((img, i) => ({
            id: `fallback-${i}`,
            ...img,
          })));
        }
      } catch (error) {
        console.error("Error loading kitchens:", error);
        // Use fallback images on error
        setKitchens(fallbackKitchenImages.map((img, i) => ({
          id: `fallback-${i}`,
          ...img,
        })));
      } finally {
        setKitchensLoading(false);
      }
    };

    loadKitchens();
  }, []);

  const handleScroll = (ref, setLeft, setRight) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setLeft(scrollLeft > 0);
    setRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollGallery = (direction) => {
    if (!galleryScrollRef.current) return;
    const scrollAmount = 400;
    const currentScroll = galleryScrollRef.current.scrollLeft;
    galleryScrollRef.current.scrollTo({
      left: currentScroll + (direction === "right" ? scrollAmount : -scrollAmount),
      behavior: "smooth",
    });
  };

  const scrollSpecials = (direction) => {
    if (!specialsScrollRef.current) return;
    const scrollAmount = 300;
    const currentScroll = specialsScrollRef.current.scrollLeft;
    specialsScrollRef.current.scrollTo({
      left: currentScroll + (direction === "right" ? scrollAmount : -scrollAmount),
      behavior: "smooth",
    });
  };

  return (
    <section id='gallery' className={styles.gallerySection}>
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

        {/* Main Gallery - Horizontal Scroll */}
        <div className={styles.gallerySectionWrapper}>
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>Featured Meals</h3>
              <p className={styles.sectionSubtitle}>Our most popular dishes</p>
            </div>
            <div className={styles.scrollControls}>
              <button
                className={`${styles.scrollButton} ${!canScrollLeft ? styles.scrollButtonDisabled : ""}`}
                onClick={() => scrollGallery("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left">
                <ChevronLeft size={18} />
              </button>
              <button
                className={`${styles.scrollButton} ${!canScrollRight ? styles.scrollButtonDisabled : ""}`}
                onClick={() => scrollGallery("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.loader}></div>
              <p>Loading delicious meals...</p>
            </div>
          ) : (
            <div
              ref={galleryScrollRef}
              className={styles.galleryScroll}
              onScroll={() => handleScroll(galleryScrollRef, setCanScrollLeft, setCanScrollRight)}>
              <div className={styles.galleryScrollContent}>
                {galleryItems.map((item, i) => (
                  <div
                    key={item.id || i}
                    className={`${styles.galleryCard} ${hoveredIndex === i ? styles.galleryCardHovered : ""}`}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}>
                    <div className={styles.galleryCardImage}>
                      <img src={item.src} alt={item.alt} loading='lazy' onError={(e) => {
                        // Fallback to a default image if the image fails to load
                        e.target.src = "images/food.jpeg";
                      }} />
                      <div className={styles.galleryGradient}></div>
                    </div>
                    <div className={styles.galleryCardInfo}>
                      <Heart
                        className={`${styles.heartIcon} ${hoveredIndex === i ? styles.heartActive : ""}`}
                      />
                      <div className={styles.galleryCardText}>
                        <span className={styles.galleryCaption}>{item.caption}</span>
                        {item.price && (
                          <span className={styles.galleryPrice}>₹{item.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Specials Section - Horizontal Scroll */}
        <div className={styles.specialsSection}>
          <div className={styles.specialsHeader}>
            <div className={styles.badge}>
              <ChefHat className={styles.badgeIcon} />
              <span className={styles.badgeText}>Chef's Selection</span>
            </div>
            <h3 className={styles.specialsTitle}>Our Specials</h3>
            <p className={styles.specialsSubtitle}>6-Curry Showcase • Rotating Weekly Menus</p>
          </div>

          <div
            ref={specialsScrollRef}
            className={styles.specialsScroll}
            onScroll={() => handleScroll(specialsScrollRef, setCanScrollLeft, setCanScrollRight)}>
            <div className={styles.specialsScrollContent}>
              {specials.map((sp, i) => (
                <div
                  key={i}
                  className={`${styles.specialCard} ${specialHovered === i ? styles.specialCardHovered : ""}`}
                  onMouseEnter={() => setSpecialHovered(i)}
                  onMouseLeave={() => setSpecialHovered(null)}>
                  <div className={styles.specialImage}>
                    <img src={sp.src} alt={sp.alt} loading='lazy' />
                    <div className={styles.specialOverlay}></div>
                  </div>
                  <div className={styles.specialLabel}>{sp.alt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kitchen Moments - Grid */}
        <div className={styles.kitchenSection}>
          <div className={styles.kitchenHeader}>
            <h3 className={styles.kitchenTitle}>From Local Kitchens</h3>
            <p className={styles.kitchenSubtitle}>
              {userLocation 
                ? `Top-rated kitchens near ${userLocation} — where our partner chefs cook with warmth, tradition, and care.`
                : "Every meal begins in a real home — where our partner chefs cook with warmth, tradition, and care."}
            </p>
          </div>

          {kitchensLoading ? (
            <div className={styles.loadingState}>
              <div className={styles.loader}></div>
              <p>Discovering local kitchens...</p>
            </div>
          ) : (
            <div className={styles.kitchenGrid}>
              {kitchens.map((kitchen) => (
                <div key={kitchen.id} className={styles.kitchenCard}>
                  <div className={styles.kitchenImage}>
                    <img 
                      src={kitchen.src} 
                      alt={kitchen.alt} 
                      loading='lazy'
                      onError={(e) => {
                        // Fallback to a default image if the image fails to load
                        e.target.src = "images/food.jpeg";
                      }}
                    />
                    <div className={styles.kitchenGradient}></div>
                    {kitchen.rating > 0 && (
                      <div className={styles.ratingBadge}>
                        <span className={styles.ratingIcon}>⭐</span>
                        <span className={styles.ratingValue}>{kitchen.rating.toFixed(1)}</span>
                      </div>
                    )}
                    {kitchen.discount && (
                      <div className={styles.discountBadge}>
                        {kitchen.discount}
                      </div>
                    )}
                  </div>
                  <div className={styles.kitchenCaption}>
                    <p className={styles.kitchenName}>{kitchen.caption}</p>
                    {kitchen.location && (
                      <div className={styles.kitchenLocation}>
                        <MapPin size={14} />
                        <span>{kitchen.location}</span>
                      </div>
                    )}
                    {kitchen.cuisineType && (
                      <div className={styles.kitchenCuisine}>
                        {kitchen.cuisineType}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
