// Hero.jsx
import { ChefHat, ChevronDown, Clock, Heart, Leaf, Play, Star, Truck, MapPin, Search, X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

const badges = [
  { id: 1, icon: Truck, text: '30min Delivery', color: 'orange' },
  { id: 2, icon: Leaf, text: '100% Fresh', color: 'green' },
  { id: 3, icon: Heart, text: 'Homemade Love', color: 'pink' },
  { id: 4, icon: ChefHat, text: 'Local Chefs', color: 'blue' },
];

const foodImages = [
  './images/veg-thali.png',
  './images/FullTiffin.jpg',
  './images/DesiThali.jpeg',
  './images/AalooPuri.jpg',
  './images/Amritsarichhole.png',
  './images/VegThali.png',
  './images/MoondDalKhichdi.jpg',
  './images/rajma.jpg',
  './images/RotiSabji.png',
];

export default function Hero() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pincode, setPincode] = useState('');
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState('');
  const [pincodeLocations, setPincodeLocations] = useState([]);
  const locationSelectorRef = useRef(null);
  const pincodeDebounceTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % foodImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Load saved location from localStorage
  useEffect(() => {
    const savedLocation = localStorage.getItem('selectedLocation');
    if (savedLocation) {
      setLocation(savedLocation);
      setLocationLoading(false);
    }
  }, []);

  // Auto-fetch location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLocationLoading(true);
        
        // Check if location is already saved
        const savedLocation = localStorage.getItem('selectedLocation');
        if (savedLocation) {
          setLocation(savedLocation);
          setLocationLoading(false);
          return;
        }

        // Request geolocation with improved error handling
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              try {
                // Reverse geocode to get city/location name with timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 8000);
                
                const geoResponse = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
                  { signal: controller.signal }
                );
                clearTimeout(timeoutId);
                
                if (!geoResponse.ok) throw new Error('Geocoding API error');
                
                const geoData = await geoResponse.json();
                
                // Format location string
                const city = geoData.city || geoData.locality || geoData.principalSubdivision || '';
                const region = geoData.principalSubdivision || geoData.countryName || '';
                const locationName = city && region ? `${city}, ${region}` : city || region || 'Your Area';
                
                setLocation(locationName);
                localStorage.setItem('selectedLocation', locationName);
              } catch (geoError) {
                console.error('Geocoding error:', geoError);
                // Fallback: try to get approximate location from IP
                try {
                  const ipResponse = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
                  if (ipResponse.ok) {
                    const ipData = await ipResponse.json();
                    const fallbackLocation = ipData.city && ipData.region ? `${ipData.city}, ${ipData.region}` : ipData.city || 'Your Area';
                    setLocation(fallbackLocation);
                    localStorage.setItem('selectedLocation', fallbackLocation);
                  } else {
                    setLocation('Your Area');
                  }
                } catch (ipError) {
                  console.error('IP geolocation error:', ipError);
                  setLocation('Your Area');
                }
              } finally {
                setLocationLoading(false);
              }
            },
            (error) => {
              console.error('Location error:', error);
              // Try IP-based location as fallback
              fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(ipData => {
                  const fallbackLocation = ipData.city && ipData.region ? `${ipData.city}, ${ipData.region}` : ipData.city || 'Your Area';
                  setLocation(fallbackLocation);
                  localStorage.setItem('selectedLocation', fallbackLocation);
                })
                .catch(() => {
                  setLocation('Your Area');
                })
                .finally(() => {
                  setLocationLoading(false);
                });
            },
            { timeout: 8000, enableHighAccuracy: false, maximumAge: 300000 } // Cache for 5 minutes
          );
        } else {
          // Fallback to IP-based location
          fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(ipData => {
              const fallbackLocation = ipData.city && ipData.region ? `${ipData.city}, ${ipData.region}` : ipData.city || 'Your Area';
              setLocation(fallbackLocation);
              localStorage.setItem('selectedLocation', fallbackLocation);
            })
            .catch(() => {
              setLocation('Your Area');
            })
            .finally(() => {
              setLocationLoading(false);
            });
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocation('Your Area');
        setLocationLoading(false);
      }
    };

    fetchLocation();
  }, []);

  // Handle click outside location selector
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationSelectorRef.current && !locationSelectorRef.current.contains(event.target)) {
        setShowLocationSelector(false);
        setSearchQuery('');
        setSuggestions([]);
        setPincode('');
        setPincodeLocations([]);
        setPincodeError('');
      }
    };

    if (showLocationSelector) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showLocationSelector]);

  // Debounced pincode fetch
  useEffect(() => {
    if (pincodeDebounceTimer.current) {
      clearTimeout(pincodeDebounceTimer.current);
    }

    const pin = pincode?.trim();
    if (pin && pin.length === 6 && /^\d{6}$/.test(pin)) {
      pincodeDebounceTimer.current = setTimeout(() => {
        fetchLocationsByPincode(pin);
      }, 500);
    } else {
      setPincodeLocations([]);
      setPincodeError('');
      setPincodeLoading(false);
    }

    return () => {
      if (pincodeDebounceTimer.current) {
        clearTimeout(pincodeDebounceTimer.current);
      }
    };
  }, [pincode]);

  // Fetch locations by pincode
  const fetchLocationsByPincode = async (pincodeValue) => {
    setPincodeLoading(true);
    setPincodeError('');
    setPincodeLocations([]);
    setSuggestions([]);

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincodeValue}`);
      if (!response.ok) throw new Error('Failed to fetch pincode data');

      const json = await response.json();
      if (!Array.isArray(json) || json.length === 0) throw new Error('No data for pincode');

      const first = json[0];
      if (first.Status !== 'Success' || !Array.isArray(first.PostOffice) || first.PostOffice.length === 0) {
        throw new Error('No locations found for this pincode');
      }

      const locationNames = first.PostOffice.map((p) => {
        const city = first.District || first.State || '';
        return `${p.Name}, ${city}`;
      });
      
      setPincodeLocations(locationNames);
      setSuggestions(locationNames);
    } catch (error) {
      console.error('Pincode fetch error:', error);
      setPincodeError(error.message || 'Unable to load locations');
      setPincodeLocations([]);
    } finally {
      setPincodeLoading(false);
    }
  };

  // Search for locations by city/area name
  const handleLocationSearch = async (query) => {
    setSearchQuery(query);
    setPincode('');
    setPincodeLocations([]);
    setPincodeError('');
    
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      // Using a geocoding API to search for locations
      const response = await fetch(
        `https://api.bigdatacloud.net/data/forward-geocode-client?query=${encodeURIComponent(query)}&limit=5&localityLanguage=en`
      );
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        const locationSuggestions = data.map((item) => {
          const city = item.city || item.locality || '';
          const region = item.principalSubdivision || item.countryName || '';
          return city && region ? `${city}, ${region}` : city || region || item.displayName;
        }).filter((loc, index, self) => self.indexOf(loc) === index); // Remove duplicates
        
        setSuggestions(locationSuggestions.slice(0, 5));
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      setSuggestions([]);
    }
  };

  // Handle pincode input
  const handlePincodeChange = (value) => {
    // Only allow digits and max 6 characters
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setPincode(numericValue);
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleSelectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    localStorage.setItem('selectedLocation', selectedLocation);
    setShowLocationSelector(false);
    setSearchQuery('');
    setSuggestions([]);
    setPincode('');
    setPincodeLocations([]);
    setPincodeError('');
  };

  const handleClearLocation = () => {
    setLocation(null);
    localStorage.removeItem('selectedLocation');
    setShowLocationSelector(true);
    setPincode('');
    setPincodeLocations([]);
    setPincodeError('');
  };

  const onScrollNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      {/* Floating Food Icons */}
      {/* <div className={styles.floatingIcons}>
        {['🍛', '🥗', '🍕', '🍜', '🥘', '🍲'].map((emoji, i) => (
          <div
            key={i}
            className={styles.floatingIcon}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div> */}

      <div className={styles.heroContainer}>
        <div className={styles.heroGrid}>
          {/* Left Content */}
          <div
            className={styles.heroContent}
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            {/* Location Selector */}
            <div className={styles.locationWrapper} ref={locationSelectorRef}>
              <button
                className={styles.locationButton}
                onClick={() => setShowLocationSelector(!showLocationSelector)}
                aria-label="Select location">
                <MapPin className={styles.locationIcon} />
                {locationLoading ? (
                  <span className={styles.locationText}>Detecting location...</span>
                ) : (
                  <span className={styles.locationText}>{location || 'Select Location'}</span>
                )}
                <ChevronDown className={`${styles.locationChevron} ${showLocationSelector ? styles.chevronOpen : ''}`} />
              </button>

              {/* Location Selector Dropdown */}
              {showLocationSelector && (
                <div className={styles.locationDropdown}>
                  <div className={styles.locationDropdownHeader}>
                    <h3 className={styles.locationDropdownTitle}>Select Your Location</h3>
                    <button
                      className={styles.closeButton}
                      onClick={() => {
                        setShowLocationSelector(false);
                        setSearchQuery('');
                        setSuggestions([]);
                        setPincode('');
                        setPincodeLocations([]);
                        setPincodeError('');
                      }}
                      aria-label="Close">
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className={styles.locationTabs}>
                    <button
                      className={`${styles.locationTab} ${!pincode ? styles.activeTab : ''}`}
                      onClick={() => {
                        setPincode('');
                        setPincodeLocations([]);
                        setPincodeError('');
                        setSuggestions([]);
                      }}>
                      Search by City
                    </button>
                    <button
                      className={`${styles.locationTab} ${pincode ? styles.activeTab : ''}`}
                      onClick={() => {
                        setSearchQuery('');
                        setSuggestions([]);
                      }}>
                      Search by Pincode
                    </button>
                  </div>

                  {!pincode ? (
                    <div className={styles.locationSearchWrapper}>
                      <Search className={styles.searchIcon} />
                      <input
                        type="text"
                        className={styles.locationSearchInput}
                        placeholder="Search for city or area..."
                        value={searchQuery}
                        onChange={(e) => handleLocationSearch(e.target.value)}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div className={styles.locationSearchWrapper}>
                      <MapPin className={styles.searchIcon} />
                      <input
                        type="text"
                        className={styles.locationSearchInput}
                        placeholder="Enter 6-digit pincode..."
                        value={pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        maxLength={6}
                        pattern="[0-9]{6}"
                        autoFocus
                      />
                      {pincodeLoading && (
                        <span className={styles.pincodeLoading}>Loading...</span>
                      )}
                    </div>
                  )}

                  {pincodeError && (
                    <div className={styles.pincodeError}>
                      <p>{pincodeError}</p>
                    </div>
                  )}

                  {suggestions.length > 0 && (
                    <div className={styles.locationSuggestions}>
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className={styles.locationSuggestionItem}
                          onClick={() => handleSelectLocation(suggestion)}>
                          <MapPin size={16} />
                          <span>{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {((searchQuery.length >= 2 && !pincode) || (pincode.length === 6 && !pincodeLoading)) && suggestions.length === 0 && !pincodeError && (
                    <div className={styles.locationNoResults}>
                      <p>No locations found. Try a different search.</p>
                    </div>
                  )}

                  {(searchQuery.length < 2 && !pincode) && (
                    <div className={styles.locationCurrent}>
                      <p className={styles.locationCurrentLabel}>Current Location:</p>
                      <button
                        className={styles.locationCurrentButton}
                        onClick={() => {
                          if (location) {
                            handleSelectLocation(location);
                          }
                        }}>
                        <MapPin size={16} />
                        <span>{location || 'Not set'}</span>
                      </button>
                      {location && (
                        <button
                          className={styles.locationClearButton}
                          onClick={handleClearLocation}>
                          Change Location
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

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
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
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

              <button className='btn btnGhost' onClick={() => navigate('/chef-registration')}>
                Partner with Raavito
              </button>
            </div>
          </div>

          {/* Right Content - Food Showcase */}
          <div
            className={styles.foodShowcase}
            style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
          >
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
                        idx === currentImage ? styles.activeImage : ''
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
                  idx === currentImage ? styles.activeImage : ''
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
        aria-label='Scroll to next section'
      >
        <span className={styles.scrollText}>Scroll to explore</span>
        <ChevronDown className={styles.chevronIcon} />
      </button>
    </section>
  );
}
