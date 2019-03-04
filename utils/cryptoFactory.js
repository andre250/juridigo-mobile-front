const CryptoJS = require("crypto-js")

function encrypt(message) {
  var keyHex = CryptoJS.enc.Utf8.parse("jur1d1g0");
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.ZeroPadding
  });
  return encrypted.toString();
}
function decrypt(ciphertext) {
    var keyHex = CryptoJS.enc.Utf8.parse("jur1d1g0");
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.ZeroPadding
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}


module.exports = {encrypt, decrypt}