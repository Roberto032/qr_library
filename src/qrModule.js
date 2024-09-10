const QRCode = require('qrcode');
const jsQR = require('jsqr')
const {Jimp} = require('jimp')


async function generateQR(input) {
  try {
    await QRCode.toFile('./uploads/qr-code.png', input, { //generates to uploads folder
      errorCorrectionLevel: 'H'
    });
    console.log('QR code saved!');
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
}

async function readQR() {
  try {

    const image = await Jimp.read('./uploads/qr-code.png'); // reads from uploads folder

    const imageData = {
        data: new Uint8ClampedArray(image.bitmap.data),
        width: image.bitmap.width,
        height: image.bitmap.height,
    };

 
    const decodedQR = jsQR(imageData.data, imageData.width, imageData.height);

    if (!decodedQR) {
        throw new Error('QR code not found in the image.');
    }

    return decodedQR.data;
} catch (error) {
    console.error('Error decoding QR code:', error);
}

}

// Export the functions to be used as a module
module.exports = {
  generateQR,
  readQR,
};