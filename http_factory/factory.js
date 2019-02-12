const mainRoute = "https://api-hml.juridigo.com.br";
const interactRoute = `${mainRoute}/interacao`;
const userRoute = `${mainRoute}/usuario`;
const paymentRoute = `${mainRoute}/pagamento`

module.exports = {
    interact: interactRoute,
    user: userRoute,
    payment: paymentRoute
}