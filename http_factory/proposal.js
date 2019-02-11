
function Proposal(mainRoute) {
    this.mainRoute = mainRoute + "/proposta";
};


Proposal.prototype.createProposal = function (proposalBody) {
    fetch(`${this.mainRoute}`, {
        method: "POST",
        body: JSON.stringify(jobBody)
    })
        .then(res => res.json())
        .then(finalRes => {
            return finalRes;
        })
        .catch(err => {
            return err;
        });
};


Proposal.prototype.getProposalByUser = function (userId) {
    fetch(`${this.mainRoute}?usuario=${userId}`, {
        method: "GET"
    })
        .then(res => res.json())
        .then(finalRes => {
            return finalRes;
        })
        .catch(err => {
            return err;
        });
};


Proposal.prototype.updateProposal = function (proposalId, updatedBody) {
    fetch(`${this.mainRoute}?id=${proposalId}`, {
        method: "PUT",
        body: JSON.stringify(updatedBody)
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