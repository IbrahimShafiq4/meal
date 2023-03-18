export class ImageApi {
    constructor (country) {
        this.c = country
    }
    getApiReady() {
        return `https://pixabay.com/api/?key=34151716-f290a2560fe2cabe085079335&q=${this.c}&image_type=photo`;
    }

    async getCountryImageApi() {
        let response = (await (await (fetch(this.getApiReady()))).json());
        return response.hits[0].largeImageURL;
    }
}