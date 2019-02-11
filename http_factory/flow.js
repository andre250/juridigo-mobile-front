
function Flow(mainRoute) {
    this.mainRoute = mainRoute;
};

Flow.prototype.createFlow = function (flowBody) {
    fetch(`${this.mainRoute}/fluxo`, {
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
};

Flow.prototype.updateFlow = function (flowId, updatedBody) {
    fetch(`${this.mainRoute}/fluxo?id=${flowId}`, {
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


Flow.prototype.getFlowByJobId = function (jobId) {
    fetch(`${this.mainRoute}/fluxo?trabalho=${jobId}`, {
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

module.exports = Flow;