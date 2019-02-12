

class Job {
    constructor(mainRoute) {
        this.mainRoute = mainRoute + "/trabalho";
    }
    getUserJobs(userId, status) {
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
    }
    createJob(jobBody) {
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
    updateJob(jobId, updatedBody) {
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
            });
    }
    getJobById(jobId) {
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
    }
};

module.exports = Job;