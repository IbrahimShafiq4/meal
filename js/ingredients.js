export class IngredientsApi {
    getApiReady() {
        return `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
    }

    async getIngredientsApi() {
        let response = (await (await (fetch(this.getApiReady()))).json());
        let arr = response.meals.slice(0, 20);
        return arr;
    }
}