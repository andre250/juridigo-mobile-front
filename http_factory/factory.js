
const Job = require("./job");
const Proposal = require("./proposal");
const Flow = require("./flow");

const mainRoute = "https://private-599c2-juridigo.apiary-mock.com";

module.exports = {
    Interact: {
        Job: Job(mainRoute),
        Proposal: Proposal(mainRoute),
        Flow: Flow(mainRoute)
    }
};