const BucketlistData = require("./models/bucketlistData.js");
const BucketlistView = require("./views/bucketlistView.js");

const app = function () {
  const bucketlistData = new BucketlistData("http://localhost:5000/api/bucketlist")
  const bucketlistView = new BucketlistView(document.querySelector("#bucketlist-list"))
  bucketlistData.onLoad = bucketlistView.render;
  bucketlistData.getData();

  window.addEventListener('load', function() {
    var url = 'https://restcountries.eu/rest/v2';


    makeRequest(url, function () {
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var countries = JSON.parse(jsonString);
      render(countries);
    });
  });

  var makeRequest = function (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
  }

  var render = function (countries) {
    var storedCountry = localStorage.getItem('selectedCountry');
    var countryToBeDisplayed = null;

    if(storedCountry) {
      countryToBeDisplayed = JSON,parse(storedCountry);
      var select = document.querySelector('countries');
      select.selectedIndex = countryToBeDisplayed.index;
    }
    else {
      countryToDisplay = countries[0];
    }

    populateSelect(countries);
    updateInfo(countryToDisplay);
  }

  var populateSelect = function (countries) {
    var select = document.querySelector('#countries');

    countries.forEach(function (item, index) {
      item.index = index;
      var option = document.createElement('option');
      option.value = index;
      option.text = item.name;
      select.appendChild(option);
    });

    select.addEventListener('change', function (event) {
      var index = this.value;
      var country = countries[index];

      updateInfo(country);

      var jsonString = JSON.stringify(country);
      localStorage.setItem('selectedCountry', jsonString);
    });
  }

  var updateInfo = function (country) {
    var pTags = document.querySelectorAll('#info p');
    pTags[0].innerText = country.name;
    pTags[1].innerText = country.population;
    pTags[2].innerText = country.capital;
  }

}



document.addEventListener("DOMContentLoaded", app);
