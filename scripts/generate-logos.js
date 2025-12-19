const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const logoDir = path.join(__dirname, '..', 'logos');

// Ensure logos directory exists
if (!fs.existsSync(logoDir)) {
  fs.mkdirSync(logoDir, { recursive: true });
}

const squarePrompts = [
  'Minimalist modern letter W logo, geometric design with clean lines, navy blue and gold accent, professional consulting firm aesthetic, white background, vector style, high-end corporate branding, square format logo mark',
  'Futuristic letter W monogram logo, sleek metallic silver and dark blue gradient, tech-forward design with sharp angles, minimalist, white background, premium business consulting brand, square format logo mark',
  'Elegant W lettermark logo, sophisticated serif-inspired design with subtle gold foil effect, deep navy blue, luxury consulting firm aesthetic, white background, timeless professional, square format logo mark',
  'Bold geometric W logo, interlocking angular shapes forming the letter, gradient from royal blue to teal, modern tech consulting aesthetic, white background, contemporary corporate design, square format logo mark',
  'Abstract W logo mark, flowing curved lines creating a dynamic W shape, gradient blue to purple, innovative and forward-thinking design, white background, professional yet creative, square format logo mark'
];

const horizontalPrompts = [
  'Horizontal logo design text "Wiebe Consulting Est. 2020", minimalist modern typography, geometric W icon on left, navy blue and gold accent, professional consulting firm, white background, clean corporate branding, wide format banner logo',
  'Horizontal logo "Wiebe Consulting Est. 2020", futuristic sleek typography, metallic silver W icon with dark blue text, tech-forward design, white background, premium business consulting brand, wide format banner logo',
  'Horizontal logo "Wiebe Consulting Est. 2020", elegant serif typography, sophisticated gold and navy design, W lettermark integrated, luxury consulting firm aesthetic, white background, timeless professional wide logo',
  'Horizontal logo "Wiebe Consulting Est. 2020", bold modern sans-serif type, geometric W mark, royal blue to teal gradient accent, contemporary corporate design, white background, wide format banner',
  'Horizontal logo "Wiebe Consulting Est. 2020", dynamic flowing typography, abstract curved W icon, blue to purple gradient, innovative forward-thinking design, white background, creative professional wide logo'
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        https.get(response.headers.location, (redirectResponse) => {
          const file = fs.createWriteStream(filepath);
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
      } else {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', reject);
  });
}

async function generateLogos() {
  console.log('Starting logo generation...\n');

  // Generate square logos
  for (let i = 0; i < squarePrompts.length; i++) {
    try {
      console.log(`Generating square logo ${i + 1}/5...`);
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: squarePrompts[i],
        n: 1,
        size: '1024x1024',
        quality: 'hd'
      });

      const imageUrl = response.data[0].url;
      const filepath = path.join(logoDir, `square-logo-${i + 1}.png`);
      await downloadImage(imageUrl, filepath);
      console.log(`✓ Saved square-logo-${i + 1}.png`);
    } catch (err) {
      console.error(`✗ Error generating square logo ${i + 1}:`, err.message);
    }
  }

  console.log('\n');

  // Generate horizontal logos
  for (let i = 0; i < horizontalPrompts.length; i++) {
    try {
      console.log(`Generating horizontal logo ${i + 1}/5...`);
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: horizontalPrompts[i],
        n: 1,
        size: '1792x1024',
        quality: 'hd'
      });

      const imageUrl = response.data[0].url;
      const filepath = path.join(logoDir, `horizontal-logo-${i + 1}.png`);
      await downloadImage(imageUrl, filepath);
      console.log(`✓ Saved horizontal-logo-${i + 1}.png`);
    } catch (err) {
      console.error(`✗ Error generating horizontal logo ${i + 1}:`, err.message);
    }
  }

  console.log('\n✅ Logo generation complete!');
  console.log(`Logos saved to: ${logoDir}`);
}

generateLogos();