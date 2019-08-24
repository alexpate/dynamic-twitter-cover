const Twitter = require('twitter');
const sharp = require('sharp');

const GRADIENTS = {
  night: ['#121835', '#5f6992'],
  sunrise: ['#3a3375', '#c6834b'],
  morning: ['#4056Be', '#eacfa2'],
  day: ['#4056be', '#748dfb'],
  sunset: ['#412b38', '#eb622b'],
};

function generateImage() {
  return new Promise(async resolve => {
    const currentHour = new Date(new Date().toUTCString()).getHours();

    const gradient = (() => {
      switch (true) {
        case currentHour >= 22 || currentHour <= 4:
          return GRADIENTS['night'];
        case currentHour > 4 && currentHour <= 8:
          return GRADIENTS['sunrise'];
        case currentHour > 8 && currentHour <= 10:
          return GRADIENTS['morning'];
        case currentHour > 10 && currentHour <= 20:
          return GRADIENTS['day'];
        case currentHour > 20 && currentHour <= 22:
          return GRADIENTS['sunset'];
        default:
          return GRADIENTS['day'];
      }
    })();

    const SVG = Buffer.from(`
      <svg width="1500" height="500" viewBox="0 0 1500 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${gradient[0]}"/>
            <stop offset="100%" stop-color="${gradient[1]}"/>
          </linearGradient>
        </defs>
        <rect fill="url(#gradient)" x="0" y="0" width="1500" height="500"/>
      </svg>
    `);

    const image = await sharp(SVG)
      .png()
      .toBuffer();

    const base64 = image.toString('base64');

    resolve(base64);
  });
}

async function postToTwitter(base64Image) {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET,
  });

  client.post(
    'account/update_profile_banner',
    {banner: base64Image},
    (response, error) => error && console.log(error)
  );
}

(async () => {
  const image = await generateImage();
  postToTwitter(image);
})();
