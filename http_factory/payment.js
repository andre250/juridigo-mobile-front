const factory = require("./factory");

class Payment {
    constructor() {
        this.mainRoute = factory.payment;
    }

    async getUserPayment(userID) {
        try {
            let response = await fetch(`${this.mainRoute}?usuario=${userID}`, {
                method: "GET"
            });
            let data = await response.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
}


module.exports = new Payment();