import {
  faBowlFood,
  faCalendarCheck,
  faLeaf,
  faRupeeSign,
  faShieldHeart,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './WhyChooseUs.module.css';

export default function WhyChooseUs() {
  const accents = [
    ['#de8c45', '#ffb070'],
    ['#29a3ff', '#9ed5ff'],
    ['#00c2a8', '#7ff0df'],
    ['#ff6b6b', '#ffc2c2'],
    ['#b86bff', '#e2c7ff'],
    ['#f4c430', '#ffe58f'],
  ];

  const features = [
    {
      icon: faLeaf,
      title: 'Pure Veg, Clean Kitchens',
      text: 'Local home chefs who cook in clean, well-kept kitchens you can trust.',
    },
    {
      icon: faBowlFood,
      title: 'Real Home-Style Taste',
      text: 'Simple, balanced food—less oil, no shortcuts, and cooked with care.',
    },
    {
      icon: faCalendarCheck,
      title: 'New Menu Every Day',
      text: 'Fresh dishes daily so your meals stay interesting and homely.',
    },
    {
      icon: faRupeeSign,
      title: 'Pocket-Friendly Plans',
      text: 'Daily, weekly, or monthly tiffin plans that fit your budget.',
    },
    {
      icon: faTruckFast,
      title: 'Always On Time',
      text: 'Your meal reaches hot and on time, without excuses.',
    },
    {
      icon: faShieldHeart,
      title: 'Trusted by Families',
      text: 'Hundreds of families choose Raavito for their daily meals.',
    },
  ];

  return (
    <section id='why' className={styles.section} aria-labelledby='why-title'>
      <div className={styles.gridBackdrop} aria-hidden='true' />
      <div className={styles.wrap}>
        <header className={styles.head}>
          <p className={styles.kicker}>Why Choose Raavito</p>
          <h2 id='why-title' className={styles.title}>
            Healthy, pure-veg meals people rely on every day
          </h2>
          <p className={styles.sub}>
            Clean kitchens, simple food, and reliable delivery — the way home meals should be.
          </p>
        </header>

        <div className={styles.grid}>
          {features.map((f, i) => {
            const [a, b] = accents[i % accents.length];
            return (
              <div
                key={i}
                className={styles.card}
                style={{
                  '--accent-a': a,
                  '--accent-b': b,
                  '--stagger': `${i * 80}ms`,
                }}
              >
                <div className={styles.iconWrap}>
                  <FontAwesomeIcon icon={f.icon} className={styles.icon} />
                </div>
                <div className={styles.text}>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
