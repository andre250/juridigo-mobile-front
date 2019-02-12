
class Flow {
    constructor(mainRoute) {
        this.mainRoute = mainRoute + "/fluxo";
    }
    createFlow(flowBody) {
        fetch(`${this.mainRoute}`, {
            method: "POST",
            body: JSON.stringify(flowBody)
        })
            .then(res => res.json())
            .then(finalRes => {
                return finalRes;
            })
            .catch(err => {
                return err;
            });
    }
    updateFlow(flowId, updatedBody) {
        fetch(`${this.mainRoute}?id=${flowId}`, {
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
    getFlowByJobId(jobId) {
        fetch(`${this.mainRoute}?trabalho=${jobId}`, {
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
};

module.exports = Flow;