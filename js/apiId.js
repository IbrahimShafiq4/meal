export class ApiId {
    constructor (id) {
        this.i = id;
    }

    getApiReady() {
        return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.i}`;
    }

    async getIdApi() {
        let response = (await (await (fetch(this.getApiReady()))).json());
        let arr = response.meals[0];
        return arr;
    }
}