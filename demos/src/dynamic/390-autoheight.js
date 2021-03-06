const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Autoheight',
  styles: `
  .swiper{
    width: 100%;
    height: auto;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

  }

  .swiper .swiper-slide {
    height: 300px;
    line-height: 300px;
  }

  .swiper .swiper-slide:nth-child(2n) {
    height: 500px;
    line-height: 500px;
  }
  `,
  config: [
    {
      autoHeight: true, //enable auto height
      spaceBetween: 20,
      navigation: true,
      pagination: {
        clickable: true,
      },
    },
  ],
});
