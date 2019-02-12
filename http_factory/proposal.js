
class Proposal {
    constructor(mainRoute) {
        this.mainRoute = mainRoute + "/proposta";
    }
    createProposal(proposalBody) {
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
    }
    getProposalByUser(userId) {
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
    }
    updateProposal(proposalId, updatedBody) {
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
            });
    }
};

module.exports = Proposal;