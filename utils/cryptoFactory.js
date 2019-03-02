const CryptoJS = require("crypto-js");

export default function encryptPayment(paymentInfo) {
    return CryptoJS.AES.encrypt(paymentInfo , "JUR1d1G00S3cr377");
}