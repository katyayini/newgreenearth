var formEl = document.querySelector('#city-form');
var cityEl = document.querySelector('#city');
var historyEl = document.querySelector('#search-history');
var dataEl = document.querySelector('#info-container');
var searchEl = document.querySelector('#search-term');
var tempEl = document.querySelector('#temp');
var windEl = document.querySelector('#wind');
var humidityEl = document.querySelector('#humidity');
var uvIndex1El = document.querySelector('#uv-index1');
var uvIndex2El = document.querySelector('#uv-index2');
var uvIndex3El = document.querySelector('#uv-index3');
var containerEl = document.querySelector('#c1');
var headingEl = document.querySelector('.heading');
var ut1, ut2, ut3, ut4, ut5, t1, t2, t3, t4, t5, K1, K2, K3, K4, K5, ws1, ws2, ws3, ws4, ws5, h1, h2, h3, h4, h5;
var wCard1 = document.createElement("div");
var wCard2 = document.createElement("div");
var wCard3 = document.createElement("div");
var wCard4 = document.createElement("div");
var wCard5 = document.createElement("div");
var p1 = document.createElement("p");
var p2 = document.createElement("p");
var p3 = document.createElement("p");
var p4 = document.createElement("p");
var p5 = document.createElement("p");



var formSubmit = function (event) {
  event.preventDefault();
  
  var cityname = cityEl.value.trim();

  if (cityname) {
    localStorage.setItem("city", cityname);
    var citySearched = localStorage.getItem("city");
    var citySearchBtn = document.createElement("button");
    citySearchBtn.textContent = citySearched;
    citySearchBtn.style.margin = "2px";
    historyEl.appendChild(citySearchBtn);
    getWeatherData(cityname);  

  }
}

function getWeatherData(cname) {

  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cname + "&appid=c67ea5f40944551ef230a0ed16ca9f58")
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayWeatherInfo(data, cname);
        });
      } else {
        alert('Error: Not found');
      }
    })

}

function displayWeatherInfo(wData, searchTerm) {

  if (wData.length === 0) {
    dataEl.textContent = 'No data found!';
    return;
  }


  var longitude = wData['coord']['lon'];
  var latitude = wData['coord']['lat'];
  getUvForecasts(longitude, latitude, searchTerm);

}

function getUvForecasts(lon, lat, searchTerm) {
  fetch("https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=c67ea5f40944551ef230a0ed16ca9f58")
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayUvForecasts(data, searchTerm);
        });
      }
    });
}

function displayUvForecasts(nData, searchTerm) {
  if (nData.length === 0) {
    uvIndex1El.textContent = 'UV index  and forecasts not found!';
    return;
  }

  var unixTime = nData['current']['dt'];
  var date = new Date(unixTime * 1000);
  var formattedDate = date.toLocaleDateString();
  searchEl.textContent = searchTerm + " " + formattedDate;
  searchEl.style.textTransform = "capitalize";
  var K=nData['current']['temp'];
  var newTemp= (((K-273.15)*1.8)+32).toFixed(2);

  tempEl.textContent = "Temp: " + newTemp + "\u00B0F";
  windEl.textContent = "Wind: " + nData['current']['wind_speed'] + " MPH";
  humidityEl.textContent = "Humidity: " + nData['current']['humidity'] + " %";
  var uvIndex = nData['current']['uvi'];
  var el = document.createElement('div');
  el.innerHTML = uvIndex;

  if (uvIndex < 6) {
    uvIndex1El.textContent = "UV Index: ";
    uvIndex1El.appendChild(el);
    el.style.backgroundColor = "green";
    el.style.paddingTop = "3px";
    el.style.paddingBottom = "3px";
    el.style.paddingRight = "6px";
    el.style.paddingLeft = "6px";
    el.style.margin = "2px";
    el.style.display = "inline";
    el.style.color = "white";
    el.style.fontWeight = "bold";
    el.style.borderRadius = "2px";

  }
  else if (uvIndex >= 6 && uvIndex < 9) {
    uvIndex2El.textContent = "UV Index: ";
    uvIndex2El.appendChild(el);
    el.style.backgroundColor = "yellow";
    el.style.paddingTop = "3px";
    el.style.paddingBottom = "3px";
    el.style.paddingRight = "6px";
    el.style.paddingLeft = "6px";
    el.style.margin = "2px";
    el.style.display = "inline";
    el.style.color = "black";
    el.style.fontWeight = "bold";
    el.style.borderRadius = "2px";
  }

  else {
    uvIndex3El.textContent = "UV Index: ";
    uvIndex3El.appendChild(el);
    el.style.backgroundColor = "red";
    el.style.paddingTop = "3px";
    el.style.paddingBottom = "3px";
    el.style.paddingRight = "6px";
    el.style.paddingLeft = "6px";
    el.style.margin = "2px";
    el.style.display = "inline";
    el.style.color = "white";
    el.style.fontWeight = "bold";
    el.style.borderRadius = "2px";
  }


  //formatting unix dates to easy to read date formats
  ut1 = (nData['daily']['1']['dt']);
  var d1 = new Date(ut1 * 1000);
  var formattedD1 = d1.toLocaleDateString();

  ut2 = (nData['daily']['2']['dt']);
  var d2 = new Date(ut2 * 1000);
  var formattedD2 = d2.toLocaleDateString();

  ut3 = (nData['daily']['3']['dt']);
  var d3 = new Date(ut3 * 1000);
  var formattedD3 = d3.toLocaleDateString();

  ut4 = (nData['daily']['4']['dt']);
  var d4 = new Date(ut4 * 1000);
  var formattedD4 = d4.toLocaleDateString();

  ut5 = (nData['daily']['5']['dt']);
  var d5 = new Date(ut5 * 1000);
  var formattedD5 = d5.toLocaleDateString();

  K1 = nData['daily']['1']['temp']['day'];
  K2 = nData['daily']['2']['temp']['day'];
  K3 = nData['daily']['3']['temp']['day'];
  K4 = nData['daily']['4']['temp']['day'];
  K5 = nData['daily']['5']['temp']['day'];

  t1 = (((K1-273.15)*1.8)+32).toFixed(2);
  t2 = (((K2-273.15)*1.8)+32).toFixed(2);
  t3 = (((K3-273.15)*1.8)+32).toFixed(2);
  t4 = (((K4-273.15)*1.8)+32).toFixed(2);
  t5 = (((K5-273.15)*1.8)+32) .toFixed(2);



  ws1 = nData['daily']['1']['wind_speed'];
  ws2 = nData['daily']['2']['wind_speed'];
  ws3 = nData['daily']['3']['wind_speed'];
  ws4 = nData['daily']['4']['wind_speed'];
  ws5 = nData['daily']['5']['wind_speed'];

  h1 = nData['daily']['1']['humidity'];
  h2 = nData['daily']['2']['humidity'];
  h3 = nData['daily']['3']['humidity'];
  h4 = nData['daily']['4']['humidity'];
  h5 = nData['daily']['5']['humidity'];

  
  p1.innerHTML = "<br>Temp: " + t1 +"\u00B0F"+"<br><br>Wind: " + ws1 +" MPH"+ "<br><br>Humidity: " + h1+" %";
  p2.innerHTML = "<br>Temp: " + t2 +"\u00B0F"+"<br><br>Wind: " + ws2 +" MPH"+ "<br><br>Humidity: " + h2+" %";
  p3.innerHTML = "<br>Temp: " + t3 +"\u00B0F"+"<br><br>Wind: " + ws3 +" MPH"+ "<br><br>Humidity: " + h3+" %";
  p4.innerHTML = "<br>Temp: " + t4 +"\u00B0F"+"<br><br>Wind: " + ws4 +" MPH"+ "<br><br>Humidity: " + h4+" %";
  p5.innerHTML = "<br>Temp: " + t5 +"\u00B0F"+"<br><br>Wind: " + ws5 +" MPH"+ "<br><br>Humidity: " + h5+" %";



  //Displaying next 5 days forecasts  
  headingEl.textContent = "5-Day Forecast:";

  
  wCard1.innerHTML = formattedD1;
  wCard1.appendChild(p1);
  wCard1.style.backgroundColor = "#292597";
  wCard1.style.color = "white";
  wCard1.style.width = "200px";
  wCard1.style.height = "250px";
  wCard1.style.padding = "3px";
  wCard1.style.margin = "5px";
  wCard1.style.fontWeight = "bold";
  containerEl.append(wCard1);


  
  wCard2.innerHTML = formattedD2;
  wCard2.appendChild(p2);
  wCard2.style.backgroundColor = "#292597";
  wCard2.style.color = "white";
  wCard2.style.width = "200px";
  wCard2.style.height = "250px";
  wCard2.style.padding = "3px";
  wCard2.style.margin = "5px";
  wCard2.style.fontWeight = "bold";
  containerEl.append(wCard2);


  
  wCard3.innerHTML = formattedD3;
  wCard3.appendChild(p3);
  wCard3.style.backgroundColor = "#292597";
  wCard3.style.color = "white";
  wCard3.style.width = "200px";
  wCard3.style.height = "250px";
  wCard3.style.padding = "3px";
  wCard3.style.margin = "5px";
  wCard3.style.fontWeight = "bold";
  containerEl.append(wCard3);


  
  wCard4.innerHTML = formattedD4;
  wCard4.appendChild(p4);
  wCard4.style.backgroundColor = "#292597";
  wCard4.style.color = "white";
  wCard4.style.width = "200px";
  wCard4.style.height = "250px";
  wCard4.style.padding = "3px";
  wCard4.style.margin = "5px";
  wCard4.style.fontWeight = "bold";
  containerEl.append(wCard4);

  
  wCard5.innerHTML = formattedD5;
  wCard5.appendChild(p5);
  wCard5.style.backgroundColor = "#292597";
  wCard5.style.color = "white";
  wCard5.style.width = "200px";
  wCard5.style.height = "250px";
  wCard5.style.padding = "3px";
  wCard5.style.margin = "5px";
  wCard5.style.fontWeight = "bold";
  containerEl.append(wCard5);


}

formEl.addEventListener('submit', formSubmit);