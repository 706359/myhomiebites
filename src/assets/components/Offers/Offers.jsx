import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { fetchOffers } from "../../../utils/api";
import styles from "./Offers.module.css";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const offersScrollRef = useRef(null);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        setLoading(true);
        const offersData = await fetchOffers();
        
        // Transform offers to match app's format
        const transformedOffers = offersData.map((offer) => ({
          id: offer._id,
          title: offer.name || offer.title,
          sub: offer.description || "",
          icon: offer.icon || "pricetag",
          colors: offer.gradientColors || ["#f97316", "#ea580c"],
          code: offer.code,
          discountType: offer.discountType,
          discountValue: offer.discountValue,
          minOrderAmount: offer.minOrderAmount,
        }));
        
        setOffers(transformedOffers);
      } catch (error) {
        console.error("Error loading offers:", error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, []);

  const handleScroll = () => {
    if (!offersScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = offersScrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollOffers = (direction) => {
    if (!offersScrollRef.current) return;
    const scrollAmount = 300;
    const currentScroll = offersScrollRef.current.scrollLeft;
    offersScrollRef.current.scrollTo({
      left: currentScroll + (direction === "right" ? scrollAmount : -scrollAmount),
      behavior: "smooth",
    });
  };

  // Get icon component based on icon name
  const getIcon = (iconName) => {
    const iconMap = {
      pricetag: Tag,
      tag: Tag,
      gift: Tag,
      flash: Tag,
    };
    return iconMap[iconName.toLowerCase()] || Tag;
  };

  if (loading) {
    return (
      <section className={styles.offersSection}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.loader}></div>
            <p>Loading offers...</p>
          </div>
        </div>
      </section>
    );
  }

  if (offers.length === 0) {
    return null; // Don't show section if no offers
  }

  return (
    <section className={styles.offersSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Today's Offers</h2>
            <p className={styles.sectionSubtitle}>Don't miss out on savings</p>
          </div>
          {offers.length > 3 && (
            <div className={styles.scrollControls}>
              <button
                className={`${styles.scrollButton} ${!canScrollLeft ? styles.scrollButtonDisabled : ""}`}
                onClick={() => scrollOffers("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left">
                <ChevronLeft size={18} />
              </button>
              <button
                className={`${styles.scrollButton} ${!canScrollRight ? styles.scrollButtonDisabled : ""}`}
                onClick={() => scrollOffers("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right">
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div
          ref={offersScrollRef}
          className={styles.offersScroll}
          onScroll={handleScroll}>
          <div className={styles.offersScrollContent}>
            {offers.map((offer) => {
              const IconComponent = getIcon(offer.icon);
              const gradientStyle = {
                background: `linear-gradient(135deg, ${offer.colors[0]}, ${offer.colors[1] || offer.colors[0]})`,
              };
              
              return (
                <div
                  key={offer.id}
                  className={styles.offerCard}
                  style={gradientStyle}>
                  <div className={styles.offerIcon}>
                    <IconComponent size={26} color="white" />
                  </div>
                  <h3 className={styles.offerTitle}>{offer.title}</h3>
                  <p className={styles.offerSubtitle}>
                    {offer.sub || 
                      (offer.discountType === 'percentage' 
                        ? `${offer.discountValue}% OFF`
                        : `₹${offer.discountValue} OFF`)}
                  </p>
                  {offer.code && (
                    <div className={styles.offerCode}>
                      <span className={styles.codeLabel}>Code:</span>
                      <span className={styles.codeValue}>{offer.code}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

