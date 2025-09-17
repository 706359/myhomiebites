import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

const reviews = [
  {
    text: "The food tastes just like home! I've been ordering their tiffin for 3 months now and never been disappointed. Great quality and always on time.",
    name: 'Rahul Sharma',
    location: 'Panchsheel Greens',
    img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    text: "As a working professional, RAAVITO has been a lifesaver. The food is healthy, tasty and reminds me of my mother's cooking. Highly recommended!",
    name: 'Priya Gupta',
    location: 'Tower B2',
    img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    text: 'I love their khichdi tiffin! Perfect balance of spices and always delivered hot. The weekly subscription offer is a great deal too.',
    name: 'Vikram Singh',
    location: 'A1 Tower',
    img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  },
  {
    text: 'RAAVITO is the best tiffin service in the area. Affordable, healthy and always fresh. My kids also enjoy the parathas.',
    name: 'Sneha Kapoor',
    location: 'Sector 76',
    img: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  },
  {
    text: 'Portions are generous and packaging is neat. I’ve tried many services, but RAAVITO stands out. Customer support is also very responsive.',
    name: 'Amit Verma',
    location: 'Mahagun Moderne',
    img: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
  },
];

const getVisibleCount = (width) => {
  if (width >= 1200) return 3;
  if (width >= 900) return 2;
  return 1;
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(getVisibleCount(window.innerWidth));
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const isHoverRef = useRef(false);

  useEffect(() => {
    const onResize = () => {
      const v = getVisibleCount(window.innerWidth);
      setVisible(v);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visible);
  useEffect(() => {
    if (current > maxIndex) setCurrent(maxIndex);
  }, [visible, maxIndex, current]);

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, maxIndex));
    setCurrent(clamped);
  };

  const next = () => {
    setCurrent((s) => (s >= maxIndex ? 0 : s + 1));
  };

  const prev = () => {
    setCurrent((s) => (s <= 0 ? maxIndex : s - 1));
  };

  useEffect(() => {
    const update = () => {
      const percent = (current * 100) / visible;
      if (trackRef.current) trackRef.current.style.transform = `translateX(-${percent}%)`;
    };
    update();
  }, [current, visible]);

  useEffect(() => {
    const start = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (!isHoverRef.current) next();
      }, 4500);
    };
    start();
    return () => clearInterval(intervalRef.current);
  }, [visible]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const enter = () => (isHoverRef.current = true);
    const leave = () => (isHoverRef.current = false);
    node.addEventListener('mouseenter', enter);
    node.addEventListener('mouseleave', leave);
    node.addEventListener('touchstart', enter, { passive: true });
    node.addEventListener('touchend', leave, { passive: true });
    return () => {
      node.removeEventListener('mouseenter', enter);
      node.removeEventListener('mouseleave', leave);
      node.removeEventListener('touchstart', enter);
      node.removeEventListener('touchend', leave);
    };
  }, []);

  const dotsCount = Math.max(1, reviews.length - visible + 1);
  return (
    <section id='testimonials'>
      <h2 className='section-title'>💬 Customer Reviews</h2>

      <div className='testimonial-slider' ref={containerRef}>
        <div className='testimonial-track' ref={trackRef}>
          {reviews.map((r, i) => (
            <div className='testimonial' key={i} style={{ flex: `0 0 ${100 / visible}%` }}>
              <div className='testimonial-content'>
                <p>{r.text}</p>
                <div className='testimonial-meta'>
                  <img src={r.img} alt={r.name} className='testimonial-author-img' loading='lazy' />
                  <div className='testimonial-author'>
                    <strong>{r.name}</strong>
                    <small>{r.location}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='slider-controls'>
          <button className='slider-arrow prev-arrow' onClick={prev} aria-label='Previous'>
            {' '}
            <FontAwesomeIcon icon={faChevronLeft} />{' '}
          </button>
          <button className='slider-arrow next-arrow' onClick={next} aria-label='Next'>
            {' '}
            <FontAwesomeIcon icon={faChevronRight} />{' '}
          </button>
        </div>

        <div className='slider-dots'>
          {Array.from({ length: dotsCount }).map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${idx === current ? 'active' : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
