const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function addTextToImage() {
  const imagePath = path.join(__dirname, '../public/og-social-original.png');
  const outputPath = path.join(__dirname, '../public/og-social-final.png');

  console.log('Adding text overlay to image...');

  // Create SVG text overlay
  const svgText = `
    <svg width="1200" height="630">
      <defs>
        <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0.5)"/>
          <stop offset="50%" style="stop-color:rgba(0,0,0,0.3)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.5)"/>
        </linearGradient>
      </defs>

      <!-- Semi-transparent overlay for text readability -->
      <rect width="1200" height="630" fill="url(#overlay)"/>

      <!-- WIEBE CONSULTING - Top -->
      <text x="600" y="180"
            font-family="Arial, sans-serif"
            font-size="36"
            font-weight="bold"
            fill="#22d3ee"
            text-anchor="middle"
            letter-spacing="4">WIEBE CONSULTING</text>

      <!-- Main Headline -->
      <text x="600" y="320"
            font-family="Arial, sans-serif"
            font-size="72"
            font-weight="bold"
            fill="white"
            text-anchor="middle">Add $30K+ in 60 Days</text>

      <!-- Subheadline -->
      <text x="600" y="420"
            font-family="Arial, sans-serif"
            font-size="28"
            fill="#e2e8f0"
            text-anchor="middle">Done-for-you patient retention for Sports &amp; Ortho PT Clinics</text>
    </svg>
  `;

  try {
    // Read original image and resize to 1200x630
    const image = await sharp(imagePath)
      .resize(1200, 630, { fit: 'cover' })
      .toBuffer();

    // Composite the text overlay on top
    await sharp(image)
      .composite([{
        input: Buffer.from(svgText),
        top: 0,
        left: 0
      }])
      .png()
      .toFile(outputPath);

    console.log('Saved to:', outputPath);
    console.log('Done!');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

addTextToImage();
