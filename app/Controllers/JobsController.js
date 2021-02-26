import { ProxyState } from "../AppState.js"
import { jobsService } from "../Services/JobsService.js"

function _draw() {
    let jobs = ProxyState.jobs
    let template = ""
    jobs.forEach(job => template += job.Template)
    // console.log(template)
    document.getElementById('jobs').innerHTML = template
    console.log(ProxyState.jobs)
}

export default class JobsController {
    constructor() {
        console.log("jobs controller working")
        console.log(ProxyState.jobs)
        _draw()
        ProxyState.on("jobs", _draw)
    }

    createJob(event) {
        event.preventDefault();
        console.log('creating job')
        let form = event.target
        console.log(form)
        let rawJob = {
            jobTitle: form.jobTitle.value,
            company: form.company.value,
            description: form.description.value,
            hours: form.hours.value,
            rate: form.rate.value
        }
        console.log(rawJob)
        jobsService.createJob(rawJob)
    }

    bid(id) {
        console.log('bidding ' + id)
        jobsService.bid(id)
    }

    deleteJob(id) {
        console.log(id)
        jobsService.deleteJob(id)
    }

}