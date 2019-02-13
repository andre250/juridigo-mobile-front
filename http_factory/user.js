const factory = require("./factory");

class User {
    constructor() {
        this.mainRoute = factory.user;
    }
    register(registerBody) {
        fetch(`${this.mainRoute}/register`, {
            method: "POST",
            body: JSON.stringify(registerBody)
        })
            .then(res => res.json())
            .then(finalRes => {
                return finalRes;
            })
            .catch(err => {
                return err;
            });
    }

    async getUserInfo(userId, token) {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Authtoken", token)

            let response = await fetch(`https://api-hml.juridigo.com.br/interacao/usuario/${userId}`, {
                method: "GET",
                headers: myHeaders
            });
            let data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    getFacebookInfo() {
        fetch(`${this.mainRoute}/facebook`, {
            method: "GET"
        })
            .then(res = res.json())
            .then(finalRes => {
                return finalRes;
            })
            .catch(err => {
                return err;
            });
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
            throw error;
        }
    }
    loginFacebook(login) {
        fetch(`${this.mainRoute}/login/facebook`, {
            method: "POST",
            body: JSON.stringify(login)
        })
            .then(res => res.json())
            .then(finalRes => {
                return finalRes;
            })
            .catch(err => {
                return err;
            });
    }
    recoveryFacebook(credential) {
        fetch(`${this.mainRoute}/login/facebook/recovery`, {
            method: "POST",
            body: JSON.stringify(credential)
        })
            .then(res => res.json())
            .then(finalRes => {
                return finalRes;
            })
            .catch(err => {
                return err;
            });
    }
    sendEmail(body) {
        fetch(`${this.mainRoute}/email/send`, {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(finalRes => {
                return finalRes;
            })
            .catch(err => {
                return err;
            });
    }
    newPassword(body) {
        fetch(`${this.mainRoute}/newPassword`, {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(finalRes => {
                return finalRes;
            })
            .catch(err => {
                return err;
            });
    }
    confirmToken(body) {
        fetch(`${this.mainRoute}/recovery`, {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(finalRes => {
                return finalRes;
            })
            .catch(err => {
                return err;
            });
    }
};

module.exports = new User();