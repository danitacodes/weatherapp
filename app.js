const baseApiUrl = 'https://www.metaweather.com/api/location'
const searchApiUrl = '${baseApiUrl}/search'

class requestController {
    getLocation() {
        $.getJSON(baseApiUrl, 'Los Angeles').done(data => console.log(data));
    }
}