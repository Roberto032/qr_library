const { generateQR, readQR } = require('../src/qrModule');

(async () => {
  await generateQR('Hello, world!'); // passing text that you would like to convert to QR
  let response = await readQR(); //reads QR from uploads folder and converts to text
  console.log(response);
})();