export class CategorySearch {
    constructor (category) {
        this.c = category;
    }

    getApiReady() {
        return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.c}`;
    }

    async getCategoryApi() {
        let response = (await (await (fetch(this.getApiReady()))).json());
        let arr = response.meals;
        return arr;
    }
}