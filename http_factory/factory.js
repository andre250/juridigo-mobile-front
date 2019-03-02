const mainRoute = "https://api-hml.juridigo.com.br";
const mainCepRoute = "https://viacep.com.br/ws/";
const mainOpenCage = "https://api.opencagedata.com/geocode/v1/";
const interactRoute = `${mainRoute}/interacao`;
const userRoute = `${mainRoute}/usuario`;
const paymentRoute = `${mainRoute}/pagamento`

module.exports = {
    interact: interactRoute,
    openCage: mainOpenCage,
    user: userRoute,
    payment: paymentRoute,
    cep:mainCepRoute
}