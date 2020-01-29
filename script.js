$(document).ready(function(){
//console.log("jquery is loaded")
var apiKey = "2d3aa53f78a11592d87368ceec320725"
var cityNames = []

function weatherApi(city){
var url = `https://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}&units=imperial&q=${city}`;
$.ajax({
    method: "GET", 
    url: url
}).then(function(response){
    console.log(response) 
    console.log(city) 

    var title = $("<h2>").addClass("card-title").text(response.name)
    var temp = $("<p>").addClass("card-text").text("temp: " + response.main.temp)
    var wind = $("<p>").addClass("card-text").text("wind: " + response.wind.speed) 
    var humid =$("<p>").addClass("card-text").text("humid: " + response.main.humidity)
    var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
    var card = $("<div>").addClass("card")
    var cardBody = $("<div>").addClass("card-body")
    
    cardBody.append(title, temp, humid, wind, img) 
    card.append(cardBody)
    $("#today").append(card)

    forecastApi(city);
})
}

function forecastApi(city){
    var url = `https://api.openweathermap.org/data/2.5/forecast?APPID=${apiKey}&units=imperial&q=${city}`;
    $.ajax({
        method: "GET", 
        url: url
    }).then(function(res){
        console.log(res) 
        console.log(city) 

        $("#forecast").html("<h4 class=\"mt-3\">5 Day Forecast:</h4>").append("<div class=\"row\">");

        for (var i = 0; i < 5; i++ ) {

            var col = $("<div>").addClass("col-md-2.5")
            var card = $("<div>").addClass("card bg-primary text-white")
            var body = $("<div>").addClass("card-body p-2")
            var title =$("<h2>").addClass("card-title").text(res.city.name) 
            var img =$("<img>").attr("src", "http://openweathermap.org/img/w/" + res.list[i].weather[0].icon + ".png")
            var temp = $("<p>").addClass("card-text").text("Temp: " + res.list[i].main.temp)
            var humid = $("<p>").addClass("card-text").text("Humidity: " + res.list[i].main.humidity)

            col.append(card.append(body.append(title, img, temp,humid)))
            $("#forecast .row").append(col)
         }
    })
}

function uvApi(lat, long){

}

$("#citySearch").on("click", function(){
    var input = $("#cityName").val()
    if (!cityNames.includes(input)){
        cityNames.push(input)
        //API calls go here
        weatherApi(input)
        forecastApi(input)
    } 
    $("#cityName").val("")
})

})

