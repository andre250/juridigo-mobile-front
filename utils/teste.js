const cryptoFact = require("./cryptoFactory")

const paymentInfo = {
    numero: "5476570006164731",
    cvv: "852",
    anoVencimento: "2021",
    mesVencimento: "02",
    agencia: "1212",
    conta: "111",
    banco: "121"
}

let cipherText = cryptoFact.encrypt(JSON.stringify(paymentInfo))

console.log(cipherText)