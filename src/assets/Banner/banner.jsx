const Banner = () => {
  return (
    <section className='container'>
      <div className='banner-content'>
        <div className='banner-text'>
          <h1>घर जैसा स्वाद, हर बाइट में</h1>
          <p>गाँव की सादगी, घर जैसा प्यार और सेहत का पूरा ख़्याल।</p>
          <div className='banner-buttons'>
            <a
              className='btn btn-primary pulse'
              href='https://wa.me/916395559255'
              target='_blank'
              rel='noopener'>
              <i className='fa-brands fa-whatsapp'></i> एक बार खाओगे, भूल नहीं पाओगे
            </a>
          </div>
        </div>
        <div className='banner-image gallery-item'>
          <img
            src='https://images.pexels.com/photos/10078270/pexels-photo-10078270.jpeg'
            alt='RAAVITO Dish'
          />
          <div class='gallery-caption'>homemade veg thali</div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
