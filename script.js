// "https://api.openweathermap.org/data/2.5/weather?q=London&appid={API_KEY}"
// document.querySelector(".card-img");
// document.querySelector(".card-img-2");
// document.querySelector(".country");
// document.querySelector(".airdeg");


var cityName = document.querySelector(".form-control");
var formBttn = document.querySelector(".btn-success");

formBttn.addEventListener("click", (event) => {
    event.preventDefault();
    sendIt();
    if (document.querySelector(".supply").classList.contains("crd")) {
        document.querySelector(".supply").classList.add("card-2");
        document.querySelector(".supply").classList.remove("crd");
    }
})

function sendIt() {
    navigator.geolocation.getCurrentPosition(data => {
        var latitude = data.coords.latitude;
        var longitude = data.coords.longitude;
        var API_KEY = "c52f25e516f275f4f5e3f814c57b9a37";

        try {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${API_KEY}`).then(response => response.json()).then(api => {
                console.log(api);
                var degree = api.main.temp;
                const ktoc = degree - 273;
                const humidity = api.main.humidity;
                var weat = (api.main.feels_like - 273).toFixed();
                let wthear = api.weather[0].main;

                if (0 < ktoc && 13 > ktoc) {
                    var air = "fa-cloud";
                    calculateAir(ktoc, humidity, air, weat, wthear);
                } else if (13 < ktoc && 28 > ktoc) {
                    var air = "fa-feather-pointed";
                    calculateAir(ktoc, humidity, air, weat, wthear);
                } else if (28 < ktoc && 42 > ktoc) {
                    var air = "fa-sun";
                    calculateAir(ktoc, humidity, air, weat, wthear);
                } else if (ktoc < 0) {
                    var air = "fa-snowflake";
                    calculateAir(ktoc, humidity, air, weat, wthear);
                }
            });
        } catch (error) {
            console.log(error);
        }
    });
};

var toggle = document.querySelector(".showOpen");

toggle.addEventListener("click", () => {
    if (document.querySelector(".supply").classList.contains("crd")) {
        document.querySelector(".supply").classList.add("card-2");
        document.querySelector(".supply").classList.remove("crd");
    } else if (document.querySelector(".supply").classList.contains("card-2")) {
        document.querySelector(".supply").classList.remove("card-2");
        document.querySelector(".supply").classList.add("crd");
    }
})

function calculateAir(a, b, air, weat, stats) {
    this.temp = parseInt(a.toFixed());
    this.humidity = b;
    this.stats = stats;
    this.air = air;
    this.weat = weat + "°C"; //Büyük Olan

    var hmdty = document.querySelector(".humy");
    var feels_like = document.querySelector(".temp");
    var adress = document.querySelector(".location");
    var degree = document.querySelector(".degree");
    var sun = document.querySelector("#fff");
    var dcmnt = document.querySelector(".cld");

    degree.innerHTML = this.temp + "°C";
    adress.innerHTML = cityName.value;
    dcmnt.innerText = this.stats;
    feels_like.innerHTML = this.weat;
    hmdty.innerHTML = this.humidity;

    if (sun.classList.contains("fa-sun")) {
        sun.classList.remove("fa-sun");
        sun.classList.add(`${this.air}`);
    } else if (sun.classList.contains("fa-cloud")) {
        sun.classList.remove("fa-cloud");
        sun.classList.add(`${this.air}`);
    } else if (sun.classList.contains("fa-wind")) {
        sun.classList.remove("fa-wind");
        sun.classList.add(`${this.air}`);
    } else if (sun.classList.contains("fa-snowflake")) {
        sun.classList.remove("fa-snowflake");
        sun.classList.add(`${this.air}`);
    }

    cityName.value = "";
}