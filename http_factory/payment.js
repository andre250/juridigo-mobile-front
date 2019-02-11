
function Proposal(mainRoute) {
    this.mainRoute = mainRoute + "/pagamento";
};


Proposal.prototype.createPayment = function (body) {
    fetch(`${this.mainRoute}`, {
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


Proposal.prototype.updatePayment = function (paymentId, updatedBody) {
    fetch(`${this.mainRoute}?pagamento=${paymentId}`, {
        method: "PUT",
        body: JSON.stringify(updatedBody)
    })
        .then(res => res.json())
        .then(finalRes => {
            return finalRes;
        })
        .catch(err => {
            return err;
        });
};


Proposal.prototype.getPaymentsByStatus = function (status) {
    fetch(`${this.mainRoute}?status=${status}`, {
        method: "GET"
    })
        .then(res => res.json())
        .then(finalRes => {
            return finalRes;
        })
        .catch(err => {
            return err;
        })
};

module.exports = Proposal;