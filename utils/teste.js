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

let novo = cryptoFact.decrypt("jfIczEZ/JMBnOKb6ap3PBbhd/6fhh1KP7+vGr6ozW7x3l4vYEdrpt0MGWfLcCPD3HWu8jzuddTnt9FwHOLg7DkzCP1tUi7N+cxAWltbgcYoq6L/aG8clWWOZ6Pmpcnlmn7sGICcGw3hmuwUUmW8jZscHeaNF28JpWTARsweaQVE=")
console.log(novo)