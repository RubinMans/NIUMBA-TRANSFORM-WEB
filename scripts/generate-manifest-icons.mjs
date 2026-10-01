import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputSvg = path.join(process.cwd(), "public", "media", "logo-niumba-transform-carre.svg");
const outputDir = path.join(process.cwd(), "public");

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateManifestIcons() {
  try {
    const svgBuffer = fs.readFileSync(inputSvg);
    
    for (const size of iconSizes) {
      const pngBuffer = await sharp(svgBuffer)
        .resize(size, size, { fit: "contain", background: { r: 14, g: 75, b: 42, alpha: 1 } })
        .png()
        .toBuffer();
      
      const filename = `icon-${size}x${size}.png`;
      fs.writeFileSync(path.join(outputDir, filename), pngBuffer);
      console.log(`✅ Generated ${filename} (${pngBuffer.length} bytes)`);
    }
    
    // Also generate apple-touch-icon (180x180)
    const appleIconBuffer = await sharp(svgBuffer)
      .resize(180, 180, { fit: "contain", background: { r: 14, g: 75, b: 42, alpha: 1 } })
      .png()
      .toBuffer();
    
    fs.writeFileSync(path.join(outputDir, "apple-touch-icon.png"), appleIconBuffer);
    console.log(`✅ Generated apple-touch-icon.png (${appleIconBuffer.length} bytes)`);
    
  } catch (error) {
    console.error("❌ Error generating manifest icons:", error);
    process.exit(1);
  }
}

generateManifestIcons();