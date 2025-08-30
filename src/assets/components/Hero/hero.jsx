
export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-wrap">
        <div>
          <h1 className="reveal in">Homely, Healthy Meals – Delivered Daily</h1>
          <p className="muted reveal in">
            Pure veg tiffins from ₹120 • Freshly cooked • Panchsheel Greens & nearby areas
          </p>
          <div className="badges reveal in">
            <span className="badge"><i className="fa-solid fa-truck-fast"></i> Free Delivery*</span>
            <span className="badge"><i className="fa-solid fa-kitchen-set"></i> Hygienic Kitchen</span>
            <span className="badge"><i className="fa-solid fa-calendar-day"></i> Daily Menu</span>
          </div>
          <div className="cta-row reveal in">
            <a className="btn btn-primary pulse" href="https://wa.me/919958983578" target="_blank" rel="noopener">
              <i className="fa-brands fa-whatsapp"></i> Order Now
            </a>
            <a className="btn btn-ghost" href="#rates">
              <i className="fa-solid fa-utensils"></i> View Rate List
            </a>
          </div>
        </div>
        <div className="hero-illustration reveal in">
          <div className="plate">
            <img
              src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
              alt="Homemade Indian thali meal with variety of dishes"
            />
          </div>
          <div className="float f1">🥗</div>
          <div className="float f2">🍛</div>
          <div className="float f3">🥙</div>
        </div>
      </div>
    </section>
  );
}
