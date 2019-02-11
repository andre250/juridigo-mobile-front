
const Job = require("./job");
const Proposal = require("./proposal");
const Flow = require("./flow");
const User = require("./user");
const Payment = require("./payment");

const mainRoute = "https://api-hml.juridigo.com.br";
const interactRoute = `${mainRoute}/interacao`;
const userRoute = `${mainRoute}/usuario`;
const paymentRoute = `${mainRoute}/pagamento`

module.exports = {
    Interact: {
        Job: Job(interactRoute),
        Proposal: Proposal(interactRoute),
        Flow: Flow(interactRoute)
    },
    User: User(userRoute),
    Payment: Payment(paymentRoute)
};