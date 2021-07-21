import $ from 'jquery';
import _ from 'underscore';

class Forecast {

    constructor() {

        this.id = _.uniqueId('cid');
        this.apiKey = '0037a205884c254c3fe1eb531093170a';
        this.apiURL = 'https://api.openweathermap.org/data/2.5/forecast';
    }
    init() {
            var _this = this;

            _this.getForecast($('#txt-location').val());

            $('#btn-submit-loc').on('click', function() {
                if($('#txt-location').val() != '') {
                    $('#forecast-container').html('');
                    _this.getForecast($('#txt-location').val());
                }
            });

            $('#txt-location').on('keyup', function(e) {
                if (e.keyCode == 13) {
                    $('#btn-submit-loc').click();
                }
            });
    }

    getForecast(thisLocation) {
        var _this = this;
        $.get( this.apiURL + "?q=" + thisLocation + "&appid=" + this.apiKey, function(data) {
            console.dir(data);
            var thisHTML = '';
            var thisCurrentDay = 0;
            var thisIndex = 1;

            for (let index = 0; index < data.list.length; index++) {
                let thisList = data.list[index];
                        
                // Get weather description
                let thisWeatherDescription = thisList.weather[0].description;

                // Get weather icon
                let thisWeatherIcon = thisList.weather[0].icon;

                // Get date 
                let thisDT = new Date(thisList.dt_txt);

                // Get kelvin 
                let thisKelvin = thisList.main.temp;
                
                // Check if current item/list day was already called
                if(thisCurrentDay != thisDT.getDay()) {

                    // Assign new item/list day
                    thisCurrentDay = thisDT.getDay();

                    // Limit to 4 items
                    if(thisIndex <= 4) {
                        thisIndex++;
                        
                        thisHTML += `
                            <div class="card card--forecast card--` + thisWeatherDescription.replace(" ", "-") + `">
                                <div class="card__date">
                                    ` + _this.getFullDay(thisDT.getDay()) + ` ` + _this.getOrdinal(thisDT.getDate()) + `
                                </div>
                                <div class="card__icon">
                                    <img src="./assets/icons/` + thisWeatherIcon + `.svg" alt="` + thisWeatherDescription.replace(" ", "-") + `">
                                </div>
                                <div class="card__description">
                                    ` + thisWeatherDescription + `
                                </div>
                                <div class="card__celcius">
                                    <strong>` + _this.getCelcius(thisKelvin) + `</strong>&deg;C
                                </div>
                                <div class="card__fahrenheit">
                                    ` + _this.getFahrenheit(thisKelvin) + `&deg;F
                                </div>
                                <img src="./assets/icons/` + thisWeatherIcon + `.svg" class="card__floating-image" alt="` + thisWeatherDescription.replace(" ", "-") + `">
                            </div>`;
                    }
                }
            }

            $("#forecast-container").append($(thisHTML));
        })
        .fail(function(data) {
            console.log("ERROR");
            console.log(data);
        });
    }

    getFullDay(d) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return days[d];
    }

    getOrdinal(n) {
        return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    }

    getCelcius(x) {
        return Math.round(x-273.15);
    }

    getFahrenheit(x) {
        return Math.round(((x-273.15)*1.8)+32);
    }


}

export { Forecast };