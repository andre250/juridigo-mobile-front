const factory = require("./factory");

class Job {
    constructor() {
        this.mainRoute = factory.interact;
    }

    async getJobByID(jobID, userToken) {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Authtoken", userToken)
            let response = await fetch(`${this.mainRoute}/trabalho/${jobID}`, {
                method: "GET",
                headers: myHeaders
            });
            let data = await response.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
}


module.exports = new Job();