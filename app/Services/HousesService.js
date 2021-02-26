import { ProxyState } from "../AppState.js";
import House from "../Models/House.js";
import { api } from "./AxiosService.js";

class HousesService {


    constructor() {
        console.log("houses service");
        this.getHouses()
    }

    async getHouses() {
        try {
            const res = await api.get('houses')
            // console.log(res.data)
            ProxyState.houses = res.data.map(rawHouseData => new House(rawHouseData))
        } catch (error) {
            console.error(error)
        }
    }

    async createHouse(rawHouse) {
        // try {
        //   await api.post('houses', rawHouse)
        //   this.getHouses()
        // } catch (error) {
        //   console.error(error)
        // }

        // NOTE again we could just manually add this to our local data
        try {
            const res = await api.post('houses', rawHouse)
            ProxyState.houses = [...ProxyState.houses, new House(res.data)]
        } catch (error) {
            console.error(error)
        }


    }

    async bid(id) {
        let car = ProxyState.houses.find(c => c.id === id)
        car.price += 100
        try {
            const res = await api.put('houses/' + id, car)
            console.log(res.data)
            // NOTE this is another opportunity to go and fetch the data and make sure it is the most up to date with our database
            ProxyState.houses = ProxyState.houses
        } catch (error) {

        }
    }

    async deleteHouse(id) {
        try {
            // await api.delete('houses/'+id)
            const res = await api.delete(`houses/${id}`)
            // NOTE We can retrieve the houses again from the method we already know works
            // con is this is another serve request
            this.getHouses()
            // NOTE we could also splice the item out of our local array using the id
            // con is we dont know if our local data is synced with our db anymore
            // let index = ProxyState.houses.findIndex(c => c.id == id)
            // ProxyState.houses.splice(index, 1)
            // ProxyState.houses = ProxyState.houses
            // OR
            // ProxyState.houses = ProxyState.houses.filter(c=> c.id != id)
            // console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }
}

export const housesService = new HousesService()