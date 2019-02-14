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
}


module.exports = new Proposal();