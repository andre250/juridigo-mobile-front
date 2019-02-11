

function Job(mainRoute) {
    this.mainRoute = mainRoute;
};

Job.prototype.getUserJobs = function (userId, status) {
    fetch(`${this.mainRoute}/trabalho?usuario=${userId}&status=${status}`, {
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

Job.prototype.createJob = function (jobBody) {
    fetch(`${this.mainRoute}/trabalho`, {
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

Job.prototype.updateJob = function (jobId, updatedBody) {
    fetch(`${this.mainRoute}/trabalho?id=${jobId}`, {
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

Job.prototype.getJobById = function (jobId) {
    fetch(`${this.mainRoute}/trabalho/${jobId}`, {
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
module.exports = Job;