export class Category {
    getApiReady() {
        return `https://www.themealdb.com/api/json/v1/1/categories.php`;
    }

    async getCategoryApi() {
        let response = (await (await (fetch(this.getApiReady()))).json());
        let arr = response.categories;
        // console.log(arr);
        return arr;
    }
}