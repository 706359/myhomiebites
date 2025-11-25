import {
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { fetchKitchens, fetchMenuItems, fetchOffers } from '../../../utils/api';
import styles from './Gallery.module.css';

// Fallback images if API doesn't return images - All Pure Veg
const fallbackImages = [
  {
    src: 'images/FullTiffin.jpg',
    alt: 'Full Tiffin Meal',
    caption: 'Full Tiffin Meal',
    isVeg: true,
  },
  { src: 'images/RotiSabji.png', alt: 'Roti with Sabzi', caption: 'Roti with Sabzi', isVeg: true },
  {
    src: 'images/DeliciousAaluParatha.jpg',
    alt: 'Stuffed Parathas',
    caption: 'Stuffed Parathas',
    isVeg: true,
  },
  {
    src: 'images/AalooPuri.jpg',
    alt: 'Aloo Matar with Puri',
    caption: 'Aloo Matar with Puri',
    isVeg: true,
  },
  { src: 'images/Curd.jpg', alt: 'Homemade Pure Curd', caption: 'Homemade Pure Curd', isVeg: true },
  { src: 'images/MoondDalKhichdi.jpg', alt: 'Khichdi', caption: 'Khichdi', isVeg: true },
];

// Fallback kitchen images if API doesn't return images
const fallbackKitchenImages = [
  {
    src: 'images/kitchen.png',
    alt: 'Home chef kneading dough',
    caption: 'Handmade Rotis, Daily',
  },
  {
    src: 'images/kitchen1.png',
    alt: 'Chef mixing spices',
    caption: 'Traditional Spice Blends',
  },
  {
    src: 'images/kitchen2.png',
    alt: 'Freshly cut vegetables',
    caption: 'Fresh Local Produce',
  },
];

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [kitchens, setKitchens] = useState([]);
  const [offers, setOffers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [kitchensLoading, setKitchensLoading] = useState(true);
  const [offersLoading, setOffersLoading] = useState(true);
  const [canScrollOffersLeft, setCanScrollOffersLeft] = useState(false);
  const [canScrollOffersRight, setCanScrollOffersRight] = useState(true);
  const galleryScrollRef = useRef(null);
  const offersScrollRef = useRef(null);

  // Fetch menu items from API - Only Pure Vegetarian items
  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        setLoading(true);
        // Explicitly request only vegetarian items - Raavito is pure veg
        const items = await fetchMenuItems({ isVeg: true });

        const transformedItems = items
          .filter((item) => item.image && item.isVeg !== false) // Double check for veg items
          .slice(0, 9)
          .map((item) => ({
            id: item._id,
            src: item.image,
            alt: item.name,
            caption: item.name,
            description: item.description,
            price: item.price,
            kitchen: item.kitchen?.name || 'Raavito Kitchen',
            isVeg: true, // Ensure all items are marked as veg
          }));

        if (transformedItems.length > 0) {
          setGalleryItems(transformedItems);
        } else {
          setGalleryItems(fallbackImages);
        }
      } catch (error) {
        console.error('Error loading menu items:', error);
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

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const geoResponse = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const geoData = await geoResponse.json();
                const locationName =
                  geoData.city || geoData.locality || geoData.principalSubdivision || 'Your Area';
                setUserLocation(locationName);
              } catch (geoError) {
                console.error('Geocoding error:', geoError);
                setUserLocation('Your Area');
              }
            },
            (error) => {
              console.error('Location error:', error);
              setUserLocation(null);
            },
            { timeout: 5000, enableHighAccuracy: false }
          );
        }

        const kitchensData = await fetchKitchens({ topRated: true });

        const transformedKitchens = kitchensData
          .filter((kitchen) => kitchen.image && kitchen.isActive && kitchen.isVerified)
          .slice(0, 6)
          .map((kitchen) => ({
            id: kitchen._id,
            src: kitchen.image,
            alt: kitchen.name,
            caption: kitchen.name,
            description: kitchen.description,
            location: kitchen.location || kitchen.address,
            rating: kitchen.rating || kitchen.averageRating || 0,
            deliveryTime: kitchen.deliveryTime || '30 mins',
            cuisineType: kitchen.cuisineType,
            discount: kitchen.discount,
          }));

        if (transformedKitchens.length > 0) {
          setKitchens(transformedKitchens);
        } else {
          setKitchens(
            fallbackKitchenImages.map((img, i) => ({
              id: `fallback-${i}`,
              ...img,
            }))
          );
        }
      } catch (error) {
        console.error('Error loading kitchens:', error);
        setKitchens(
          fallbackKitchenImages.map((img, i) => ({
            id: `fallback-${i}`,
            ...img,
          }))
        );
      } finally {
        setKitchensLoading(false);
      }
    };

    loadKitchens();
  }, []);

  // Fetch offers from API
  useEffect(() => {
    const loadOffers = async () => {
      try {
        setOffersLoading(true);
        const offersData = await fetchOffers();

        const transformedOffers = offersData.map((offer) => ({
          id: offer._id,
          title: offer.title,
          description: offer.description || '',
          icon: offer.icon || 'pricetag',
          colors: offer.colors || ['#f57506', '#d55623'],
          code: offer.code,
          discountType: offer.discountType,
          discountValue: offer.discountValue,
          minOrderAmount: offer.minOrderAmount,
          image: offer.image,
        }));

        setOffers(transformedOffers);
      } catch (error) {
        console.error('Error loading offers:', error);
        setOffers([]);
      } finally {
        setOffersLoading(false);
      }
    };

    loadOffers();
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
      left: currentScroll + (direction === 'right' ? scrollAmount : -scrollAmount),
      behavior: 'smooth',
    });
  };

  const scrollOffers = (direction) => {
    if (!offersScrollRef.current) return;
    const scrollAmount = 300;
    const currentScroll = offersScrollRef.current.scrollLeft;
    offersScrollRef.current.scrollTo({
      left: currentScroll + (direction === 'right' ? scrollAmount : -scrollAmount),
      behavior: 'smooth',
    });
  };

  const getIcon = (iconName) => {
    const iconMap = {
      pricetag: Tag,
      tag: Tag,
      gift: Tag,
      flash: Tag,
    };
    return iconMap[iconName?.toLowerCase()] || Tag;
  };

  return (
    <section id='gallery' className={styles.gallerySection}>
      {/* Background Decorations */}
      <div className={styles.bgDecorations}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgCircle3}></div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.kicker}>
            <Sparkles className={styles.kickerIcon} />
            <span>Food Gallery</span>
          </div>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>Homely Meals </span>
            <span className={styles.titleNormal}> from Real Kitchens</span>
          </h2>
          <p className={styles.subtitle}>
            Discover authentic home-cooked meals crafted daily by trusted local chefs. Fresh
            ingredients, traditional recipes, and delivered with care.
          </p>
        </header>

        {/* Offers Section - Premium Cards */}
        {offers.length > 0 && (
          <div className={styles.offersSection}>
            <div className={styles.sectionHeader}>
              <div>
                <div className={styles.sectionBadge}>
                  <TrendingUp size={14} />
                  <span>Exclusive Offers</span>
                </div>
                <h3 className={styles.sectionTitle}>Today's Special Deals</h3>
                <p className={styles.sectionSubtitle}>Limited time offers you can't miss</p>
              </div>
              {offers.length > 3 && (
                <div className={styles.scrollControls}>
                  <button
                    className={`${styles.scrollButton} ${!canScrollOffersLeft ? styles.scrollButtonDisabled : ''}`}
                    onClick={() => scrollOffers('left')}
                    disabled={!canScrollOffersLeft}
                    aria-label='Scroll left'
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    className={`${styles.scrollButton} ${!canScrollOffersRight ? styles.scrollButtonDisabled : ''}`}
                    onClick={() => scrollOffers('right')}
                    disabled={!canScrollOffersRight}
                    aria-label='Scroll right'
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>

            {offersLoading ? (
              <div className={styles.loadingState}>
                <div className={styles.loader}></div>
                <p>Loading offers...</p>
              </div>
            ) : (
              <div
                ref={offersScrollRef}
                className={styles.offersScroll}
                onScroll={() =>
                  handleScroll(offersScrollRef, setCanScrollOffersLeft, setCanScrollOffersRight)
                }
              >
                <div className={styles.offersGrid}>
                  {offers.map((offer, index) => {
                    const IconComponent = getIcon(offer.icon);
                    const gradientStyle = {
                      background: `linear-gradient(135deg, ${offer.colors[0]}, ${offer.colors[1] || offer.colors[0]})`,
                    };

                    return (
                      <div
                        key={offer.id}
                        className={styles.offerCard}
                        style={{ ...gradientStyle, animationDelay: `${index * 100}ms` }}
                      >
                        <div className={styles.offerCardInner}>
                          <div className={styles.offerIconWrapper}>
                            <IconComponent size={28} color='white' strokeWidth={2.5} />
                          </div>
                          <div className={styles.offerContent}>
                            <h4 className={styles.offerTitle}>{offer.title}</h4>
                            <p className={styles.offerDescription}>
                              {offer.description ||
                                (offer.discountType === 'percentage'
                                  ? `${offer.discountValue}% OFF`
                                  : `₹${offer.discountValue} OFF`)}
                            </p>
                            {offer.code && (
                              <div className={styles.offerCodeBadge}>
                                <span className={styles.codeText}>{offer.code}</span>
                              </div>
                            )}
                            {offer.minOrderAmount > 0 && (
                              <div className={styles.offerMinOrder}>
                                Min. ₹{offer.minOrderAmount}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.offerShine}></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Featured Meals - Premium Grid */}
        <div className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionBadge}>
                <ChefHat size={14} />
                <span>Featured</span>
              </div>
              <h3 className={styles.sectionTitle}>Our Signature Dishes</h3>
              <p className={styles.sectionSubtitle}>Most loved meals from our kitchens</p>
            </div>
            {galleryItems.length > 6 && (
              <div className={styles.scrollControls}>
                <button
                  className={`${styles.scrollButton} ${!canScrollLeft ? styles.scrollButtonDisabled : ''}`}
                  onClick={() => scrollGallery('left')}
                  disabled={!canScrollLeft}
                  aria-label='Scroll left'
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className={`${styles.scrollButton} ${!canScrollRight ? styles.scrollButtonDisabled : ''}`}
                  onClick={() => scrollGallery('right')}
                  disabled={!canScrollRight}
                  aria-label='Scroll right'
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
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
              onScroll={() => handleScroll(galleryScrollRef, setCanScrollLeft, setCanScrollRight)}
            >
              <div className={styles.galleryGrid}>
                {galleryItems.map((item, i) => (
                  <div
                    key={item.id || i}
                    className={styles.featuredCard}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className={styles.cardImageWrapper}>
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading='lazy'
                        className={styles.cardImage}
                        onError={(e) => {
                          e.target.src = 'images/food.jpeg';
                        }}
                      />
                      <div className={styles.cardOverlay}></div>
                      <div className={styles.cardGradient}></div>
                      <button className={styles.favoriteButton}>
                        <Heart
                          size={18}
                          className={`${styles.heartIcon} ${hoveredIndex === i ? styles.heartActive : ''}`}
                          fill={hoveredIndex === i ? '#ef4444' : 'none'}
                        />
                      </button>
                      {item.price && (
                        <div className={styles.priceBadge}>
                          <span className={styles.priceSymbol}>₹</span>
                          <span className={styles.priceValue}>{item.price}</span>
                        </div>
                      )}
                    </div>
                    <div className={styles.cardContent}>
                      <h4 className={styles.cardTitle}>{item.caption}</h4>
                      {item.description && (
                        <p className={styles.cardDescription}>{item.description}</p>
                      )}
                      <div className={styles.cardFooter}>
                        <div className={styles.kitchenBadge}>
                          <ChefHat size={12} />
                          <span>{item.kitchen}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Local Kitchens - Premium Showcase */}
        <div className={styles.kitchensSection}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionBadge}>
                <MapPin size={14} />
                <span>Local Kitchens</span>
              </div>
              <h3 className={styles.sectionTitle}>
                {userLocation ? `Top Kitchens Near ${userLocation}` : 'Our Partner Kitchens'}
              </h3>
              <p className={styles.sectionSubtitle}>
                Where authentic home-cooked meals are prepared with love and tradition
              </p>
            </div>
          </div>

          {kitchensLoading ? (
            <div className={styles.loadingState}>
              <div className={styles.loader}></div>
              <p>Discovering local kitchens...</p>
            </div>
          ) : (
            <div className={styles.kitchensGrid}>
              {kitchens.map((kitchen, index) => (
                <div
                  key={kitchen.id}
                  className={styles.kitchenCard}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={styles.kitchenImageWrapper}>
                    <img
                      src={kitchen.src}
                      alt={kitchen.alt}
                      loading='lazy'
                      className={styles.kitchenImage}
                      onError={(e) => {
                        e.target.src = 'images/food.jpeg';
                      }}
                    />
                    <div className={styles.kitchenOverlay}></div>
                    <div className={styles.kitchenGradient}></div>

                    {kitchen.rating > 0 && (
                      <div className={styles.ratingBadge}>
                        <Star size={14} fill='#fbbf24' color='#fbbf24' />
                        <span>{kitchen.rating.toFixed(1)}</span>
                      </div>
                    )}

                    {kitchen.discount && (
                      <div className={styles.discountBadge}>
                        <span>{kitchen.discount}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.kitchenContent}>
                    <h4 className={styles.kitchenName}>{kitchen.caption}</h4>
                    {kitchen.location && (
                      <div className={styles.kitchenLocation}>
                        <MapPin size={14} />
                        <span>{kitchen.location}</span>
                      </div>
                    )}
                    <div className={styles.kitchenMeta}>
                      {kitchen.cuisineType && (
                        <div className={styles.cuisineTag}>{kitchen.cuisineType}</div>
                      )}
                      {kitchen.deliveryTime && (
                        <div className={styles.deliveryTime}>
                          <Clock size={12} />
                          <span>{kitchen.deliveryTime}</span>
                        </div>
                      )}
                    </div>
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
