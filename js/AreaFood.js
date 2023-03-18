export class AreaFood {
    constructor (country) {
        this.c = country;
    }
    getApiReady() {
        return `https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.c}`;
    }

    async getAreaFoodApi() {
        let response = (await (await (fetch(this.getApiReady()))).json());
        let arr = response.meals;
        return arr;
    }
}