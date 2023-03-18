export class Area {
    getApiReady() {
        return `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
    }

    async getAreaApi() {
        let response = (await (await (fetch(this.getApiReady()))).json());
        let arr = response.meals;
        return arr;
    }
}