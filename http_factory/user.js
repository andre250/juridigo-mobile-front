const factory = require("./factory");

class User {
    constructor() {
        this.mainRoute = factory.user;
        this.interactRoute = factory.interact;
        this.usertoken = factory.usertoken;
    }
    async getUserInfo(userId, token) {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Authtoken", token)

            let response = await fetch(`${this.interactRoute}/usuario/${userId}`, {
                method: "GET",
                headers: myHeaders
            });
            let data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async login(login) {
        try {
            let response = await fetch(`${this.mainRoute}/login`, {
                method: "POST",
                body: JSON.stringify(login)
            });
            let data = await response.json();
            return data.token;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async register(registerInformation) {
        try {
            let response = await fetch(`${this.mainRoute}/register`, {
                method: "POST",
                body: JSON.stringify(registerInformation)
            });
            let data = await response.json();
            return data.token;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
};

module.exports = new User();