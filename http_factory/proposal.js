
function Proposal(mainRoute) {
    this.mainRoute = mainRoute;
};


Proposal.prototype.createProposal = function (proposalBody) {
    fetch(`${this.mainRoute}/proposta`, {
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
    fetch(`${this.mainRoute}/proposta?usuario=${userId}`, {
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


Proposal.prototype.updateProposal = function (ṕroposalId, updatedBody) {
    fetch(`${this.mainRoute}/proposta?id=${ṕroposalId}`, {
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