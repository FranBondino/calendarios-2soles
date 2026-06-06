const fs = require('fs');
const path = require('path');

function getJpegSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  let i = 4;
  while (i < buffer.length) {
    const marker = buffer.readUInt16BE(i);
    i += 2;
    if (marker === 0xFFC0 || marker === 0xFFC2) {
      // SOF0 or SOF2
      i += 3; // skip length & precision
      const height = buffer.readUInt16BE(i);
      i += 2;
      const width = buffer.readUInt16BE(i);
      return { width, height };
    } else {
      const length = buffer.readUInt16BE(i);
      i += length;
    }
  }
  return null;
}

try {
  const logo3Path = path.resolve(__dirname, '../../../public/logo-03.jpg');
  const logo4Path = path.resolve(__dirname, '../../../public/logo-04.jpg');

  console.log('logo-03 size:', getJpegSize(logo3Path));
  console.log('logo-04 size:', getJpegSize(logo4Path));
} catch (err) {
  console.error('Error reading sizes:', err.message);
}
