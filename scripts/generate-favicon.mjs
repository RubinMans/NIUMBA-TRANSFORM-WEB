import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputSvg = path.join(process.cwd(), "public", "media", "logo-niumba-transform-carre.svg");
const outputIco = path.join(process.cwd(), "public", "favicon.ico");

const sizes = [16, 32, 48];

async function generateFavicon() {
  try {
    const svgBuffer = fs.readFileSync(inputSvg);
    
    const pngBuffers = await Promise.all(
      sizes.map((size) =>
        sharp(svgBuffer)
          .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png()
          .toBuffer()
      )
    );

    const icoHeader = Buffer.alloc(6);
    icoHeader.writeUInt16LE(0, 0); // Reserved
    icoHeader.writeUInt16LE(1, 2); // Type: 1 = ICO
    icoHeader.writeUInt16LE(sizes.length, 4); // Number of images

    const entries = [];
    let offset = 6 + sizes.length * 16;

    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i];
      const pngBuffer = pngBuffers[i];
      
      const entry = Buffer.alloc(16);
      entry.writeUInt8(size === 256 ? 0 : size, 0); // Width (0 = 256)
      entry.writeUInt8(size === 256 ? 0 : size, 1); // Height (0 = 256)
      entry.writeUInt8(0, 2); // Color palette (0 = no palette)
      entry.writeUInt8(0, 3); // Reserved
      entry.writeUInt16LE(1, 4); // Color planes
      entry.writeUInt16LE(32, 6); // Bits per pixel
      entry.writeUInt32LE(pngBuffer.length, 8); // Size of image data
      entry.writeUInt32LE(offset, 12); // Offset of image data
      
      entries.push(entry);
      offset += pngBuffer.length;
    }

    const icoBuffer = Buffer.concat([icoHeader, ...entries, ...pngBuffers]);
    fs.writeFileSync(outputIco, icoBuffer);
    
    console.log(`✅ Favicon.ico created at ${outputIco}`);
    console.log(`   Sizes: ${sizes.join("x, ")}x`);
    console.log(`   Total size: ${icoBuffer.length} bytes`);
  } catch (error) {
    console.error("❌ Error generating favicon:", error);
    process.exit(1);
  }
}

generateFavicon();