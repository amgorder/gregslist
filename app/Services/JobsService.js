import { ProxyState } from "../AppState.js";
import Job from "../Models/Job.js";
import { api } from "./AxiosService.js";

class JobsService {


    constructor() {
        console.log("jobs service");
        this.getJobs()
    }

    async getJobs() {
        try {
            const res = await api.get('jobs')
            // console.log(res.data)
            ProxyState.jobs = res.data.map(rawJobData => new Job(rawJobData))
        } catch (error) {
            console.error(error)
        }
    }

    async createJob(rawJob) {
        // try {
        //   await api.post('jobs', rawJob)
        //   this.getJobs()
        // } catch (error) {
        //   console.error(error)
        // }

        // NOTE again we could just manually add this to our local data
        try {
            const res = await api.post('jobs', rawJob)
            ProxyState.jobs = [...ProxyState.jobs, new Job(res.data)]
        } catch (error) {
            console.error(error)
        }


    }

    async bid(id) {
        let job = ProxyState.jobs.find(c => c.id === id)
        job.hours += 1
        try {
            const res = await api.put('jobs/' + id, job)
            console.log(res.data)
            // NOTE this is another opportunity to go and fetch the data and make sure it is the most up to date with our database
            ProxyState.jobs = ProxyState.jobs
        } catch (error) {

        }
    }

    async deleteJob(id) {
        try {
            // await api.delete('jobs/'+id)
            const res = await api.delete(`jobs/${id}`)
            // NOTE We can retrieve the jobs again from the method we already know works
            // con is this is another serve request
            this.getJobs()
            // NOTE we could also splice the item out of our local array using the id
            // con is we dont know if our local data is synced with our db anymore
            // let index = ProxyState.jobs.findIndex(c => c.id == id)
            // ProxyState.jobs.splice(index, 1)
            // ProxyState.jobs = ProxyState.jobs
            // OR
            // ProxyState.jobs = ProxyState.jobs.filter(c=> c.id != id)
            // console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }
}

export const jobsService = new JobsService()