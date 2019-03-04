const factory = require("./factory");

class Payment {
    constructor() {
        this.mainRoute = factory.payment;
    }

    async getUserPayment(userID,userToken) {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Authtoken", userToken)
            let response = await fetch(`${this.mainRoute}?usuario=${userID}`, {
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


module.exports = new Payment();