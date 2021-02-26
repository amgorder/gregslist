
export default class Job {
    constructor({ jobTitle, company, rate, hours, description, _id, id }) {
        this.jobTitle = jobTitle
        this.company = company
        this.rate = rate
        this.hours = hours
        this.description = description
        this.id = _id || id
    }

    get Template() {
        return /*html*/`<div class="card col-2">
      <i class="fa fa-trash fa-2x text-danger d-flex align-self-end pointer" onclick="app.jobsController.deleteJob('${this.id}')" aria-hidden="true"></i>
      
      <div class="card-body">
          <h4 class="card-title">${this.jobTitle} ${this.company} - ${this.rate}</h4>
          <p class="card-text">${this.description}</p>
          <p>Hours: ${this.hours}</p>
          <button class="btn btn-success" onclick="app.jobsController.bid('${this.id}')">Bid</button>
      </div>
    </div>`
    }

}