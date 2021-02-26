
export default class House {
    constructor({ bedrooms, bathrooms, levels, price, description, imgUrl, year, _id, id }) {
        this.bedrooms = bedrooms
        this.bathrooms = bathrooms
        this.levels = levels
        this.price = price
        this.description = description
        this.imgUrl = imgUrl
        this.year = year
        this.id = _id || id
    }

    get Template() {
        return /*html*/`<div class="card col-2">
      <i class="fa fa-trash fa-2x text-danger d-flex align-self-end pointer" onclick="app.housesController.deleteHouse('${this.id}')" aria-hidden="true"></i>
      <img class="card-img-top" src="${this.imgUrl}" alt="">
      <div class="card-body">
          <h4 class="card-title">${this.year} ${this.bedrooms} - ${this.bathrooms}</h4>
          <p class="card-text">${this.description}</p>
          <p>Price: ${this.price}</p>
          <button class="btn btn-success" onclick="app.housesController.bid('${this.id}')">Bid</button>
      </div>
    </div>`
    }

}