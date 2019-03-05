const factory = require("./factory");

class cep {
    constructor() {
        this.mainRoute = factory.cep;
    }

    async getAddress(cep) {
        try {
            let myHeaders = new Headers();

            let response = await fetch(`${this.mainRoute}/${cep}/json`, {
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


module.exports = new cep();