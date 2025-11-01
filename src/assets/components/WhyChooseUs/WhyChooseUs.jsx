import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faBowlFood,
  faTruckFast,
  faCalendarCheck,
  faRupeeSign,
  faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  const accents = [
    ["#de8c45", "#ffb070"],
    ["#29a3ff", "#9ed5ff"],
    ["#00c2a8", "#7ff0df"],
    ["#ff6b6b", "#ffc2c2"],
    ["#b86bff", "#e2c7ff"],
    ["#f4c430", "#ffe58f"],
  ];

  const features = [
    {
      icon: faLeaf,
      title: "Pure Veg & Hygienic Kitchens",
      text: "Verified local chefs, clean kitchens, highest hygiene standards.",
    },
    {
      icon: faBowlFood,
      title: "Home-Style Taste",
      text: "Balanced, simple, delicious — minimal oil, full of care.",
    },
    {
      icon: faCalendarCheck,
      title: "Daily Changing Menu",
      text: "New, fresh dishes every day. Never boring, always homely.",
    },
    {
      icon: faRupeeSign,
      title: "Affordable Meal Plans",
      text: "Flexible tiffin plans — daily to monthly, pocket-friendly.",
    },
    {
      icon: faTruckFast,
      title: "On-Time Delivery",
      text: "Hot meals, right on time, every time.",
    },
    {
      icon: faShieldHeart,
      title: "Trusted by Families",
      text: "Hundreds of happy customers eat Raavito meals daily.",
    },
  ];

  return (
    <section id='why' className={styles.section} aria-labelledby='why-title'>
      <div className={styles.gridBackdrop} aria-hidden='true' />
      <div className={styles.wrap}>
        <header className={styles.head}>
          <p className={styles.kicker}>Why Choose Raavito</p>
          <h2 id='why-title' className={styles.title}>
            Trusted by families for healthy, pure-veg meals
          </h2>
          <p className={styles.sub}>
            Simple food, clean kitchens, and timely delivery — because home-style meals never go out
            of style.
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
                  "--accent-a": a,
                  "--accent-b": b,
                  "--stagger": `${i * 80}ms`,
                }}>
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
