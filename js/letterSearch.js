export class LetterApi {
    constructor (letter) {
        this.l = letter;
    }
    getApiReady() {
        return `https://www.themealdb.com/api/json/v1/1/search.php?f=${this.l}`;
    }

    async getLetterApi() {
        let response = (await (await (fetch(this.getApiReady()))).json());
        let arr = response.meals;
        return arr;
    }
}