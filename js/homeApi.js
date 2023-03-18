export class HomeApi {
    getApiReady() {
        return `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
    }

    async getHomeApi() {
        let response = (await (await (fetch(this.getApiReady()))).json());
        let arr = response.meals;
        return arr;
    }
}