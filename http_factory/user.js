function User(mainRoute) {
    this.mainRoute = mainRoute;
};

User.prototype.register = function (registerBody) {
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
};

User.prototype.getFacebookInfo = function (credential) {
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
};

User.prototype.login = function (login) {
    console.log(login)
    console.log("oi")
    fetch(`${this.mainRoute}/login`, {
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
};

User.prototype.loginFacebook = function (login) {
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
};


User.prototype.recoveryFacebook = function (credential) {
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
};


User.prototype.sendEmail = function (body) {
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
};

User.prototype.newPassword = function (body) {
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
};

User.prototype.confirmToken = function (body) {
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
};

module.exports = User;