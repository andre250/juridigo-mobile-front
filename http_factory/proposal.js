const factory = require("./factory");

class Proposal {
    constructor() {
        this.mainRoute = factory.interact;
    }

    async getFreeProposal(userToken) {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Authtoken", userToken)

            let response = await fetch(`${this.mainRoute}/trabalho?status=0`, {
                method: "GET",
                headers: myHeaders
            });
            let data = await response.json();
            return data;
        } catch(err) {
            throw err;
        }
    }

    async acceptProposal(proposalBody, userToken) {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Authtoken", userToken)
            console.log(proposalBody)
            let response = await fetch(`${this.mainRoute}/trabalho/aceite?trabalho=${proposalBody.jobID}`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(proposalBody)
            });
            let data = await response.json();
            return data;
        } catch(err) {
            throw err;
        }
    }

    async getUserProposal(userID, userToken) {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Authtoken", userToken)
            console.log(proposalBody)
            let response = await fetch(`${this.mainRoute}/proposta?usuario=${userID}`, {
                method: "GET",
                headers: myHeaders
            });
            let data = await response.json();
            return data;
        } catch(err) {
            throw err;
        }
    }
}


module.exports = new Proposal();