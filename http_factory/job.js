

function Job(mainRoute) {
    this.mainRoute = mainRoute + "/trabalho";
};

Job.prototype.getUserJobs = function (userId, status) {
    fetch(`${this.mainRoute}?usuario=${userId}&status=${status}`, {
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

Job.prototype.updateJob = function (jobId, updatedBody) {
    fetch(`${this.mainRoute}?id=${jobId}`, {
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
    fetch(`${this.mainRoute}/${jobId}`, {
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