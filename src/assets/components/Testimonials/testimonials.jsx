import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Testimonials.module.css';

const reviews = [
  {
    text: "Feels just like home-cooked food. I've been taking their tiffin for months now—always fresh and always on time.",
    name: 'Rahul Sharma',
    location: 'Panchsheel Greens',
    img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    text: 'Honestly a big help for my work schedule. Simple, healthy meals that taste like something my mom would make.',
    name: 'Priya Gupta',
    location: 'Tower B2',
    img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    text: 'Their khichdi tiffin is my go-to. Light, tasty, and delivered piping hot every time. The weekly plan is totally worth it.',
    name: 'Vikram Singh',
    location: 'A1 Tower',
    img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  },
  {
    text: "Probably the best tiffin service around. Fresh food, fair pricing, and my kids love the parathas. That's a win.",
    name: 'Sneha Kapoor',
    location: 'Sector 76',
    img: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  },
  {
    text: 'Portions are good, packaging is neat, and the meals are consistent. Tried others before—Raavito stands out easily.',
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

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(getVisibleCount(window.innerWidth));
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const isHoverRef = useRef(false);

  useEffect(() => {
    const onResize = () => setVisible(getVisibleCount(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visible);

  useEffect(() => {
    if (current > maxIndex) setCurrent(maxIndex);
  }, [visible, maxIndex, current]);

  const goTo = (idx) => setCurrent(Math.max(0, Math.min(idx, maxIndex)));
  const next = useCallback(() => setCurrent((s) => (s >= maxIndex ? 0 : s + 1)), [maxIndex]);
  const prev = () => setCurrent((s) => (s <= 0 ? maxIndex : s - 1));

  useEffect(() => {
    if (trackRef.current) {
      const percent = (current * 100) / visible;
      trackRef.current.style.transform = `translateX(-${percent}%)`;
    }
  }, [current, visible]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isHoverRef.current) next();
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [next, visible]);

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
    <section id='testimonials' className={styles.section}>
      <header className={styles.header}>
        <p className={styles.kicker}>Customer Reviews</p>
        <h2 className={styles.title}>What Our Customers Say</h2>
      </header>

      <div className={styles.slider} ref={containerRef}>
        <div className={styles.track} ref={trackRef}>
          {reviews.map((r, i) => (
            <div className={styles.card} key={i} style={{ flex: `0 0 ${100 / visible}%` }}>
              <div className={styles.cardInner}>
                <p className={styles.text}>“{r.text}”</p>
                <div className={styles.meta}>
                  <img src={r.img} alt={r.name} loading='lazy' />
                  <div>
                    <strong>{r.name}</strong>
                    <small>{r.location}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className={`${styles.arrow} ${styles.prev}`} onClick={prev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button className={`${styles.arrow} ${styles.next}`} onClick={next}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        <div className={styles.dots}>
          {Array.from({ length: dotsCount }).map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === current ? styles.active : ''}`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
