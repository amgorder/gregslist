
export default class Car {
    constructor({ make, model, year, price, description, imgUrl, _id, id }) {
        this.make = make
        this.model = model
        this.year = year
        this.price = price
        this.description = description
        this.imgUrl = imgUrl
        this.id = _id || id
    }

    get Template() {
        return /*html*/`<div class="card col-2">
      <i class="fa fa-trash fa-2x text-danger d-flex align-self-end pointer" onclick="app.carsController.deleteCar('${this.id}')" aria-hidden="true"></i>
      <img class="card-img-top" src="${this.imgUrl}" alt="">
      <div class="card-body">
          <h4 class="card-title">${this.year} ${this.make} - ${this.model}</h4>
          <p class="card-text">${this.description}</p>
          <p>Price: ${this.price}</p>
          <button class="btn btn-success" onclick="app.carsController.bid('${this.id}')">Bid</button>
      </div>
    </div>`
    }

}