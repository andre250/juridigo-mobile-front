const factory = require("./factory");

class OpenCage {
    constructor() {
        this.mainRoute = factory.openCage;
    }

    async getLatLong(address) {
        try {
            let response = await fetch(`${this.mainRoute}json?q=${address}&key=01289718ade54e47abb1ad76fc4a9649`, {
                method: "GET"
            });
            let data = await response.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
}


module.exports = new OpenCage();