const mainRoute = "https://api-hml.juridigo.com.br";
const mainCepRoute = "https://viacep.com.br/ws/";
const interactRoute = `${mainRoute}/interacao`;
const userRoute = `${mainRoute}/usuario`;
const paymentRoute = `${mainRoute}/pagamento`

module.exports = {
    interact: interactRoute,
    user: userRoute,
    payment: paymentRoute,
    cep:mainCepRoute
}