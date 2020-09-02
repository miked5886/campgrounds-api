"use strict";

const npApiKey = "W3z4SRUGadAQVbNPSeSNZyOkELlM2EXveuUJU3wk";
const natParkURL = "https://api.nps.gov/api/v1/campgrounds";
$(document).ready(function() {
  watchSubmitForm();
});
const center = {lat:38.2017581,lng: -99.2785583}
//Watch for form submit
function watchSubmitForm() {
  console.log("watchSumbitForm works!");
  $("#search-form").submit(e => {
    e.preventDefault();
    let searchState = $("#state-code").val();
    let numResults = $("#number-input").val();
    getParks(searchState, numResults);
    initMap(searchState);
  });
}

//Format Search Query
function formatQueryParams(params) {
  console.log("formatQueryParams function works!");
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

//GET Request to nat parks API
function getParks(query, limit = 10) {
  console.log("getParks works!");

  const params = {
    stateCode: query,
    limit,
    api_key: npApiKey
  };

  const queryString = formatQueryParams(params);
  const urlNatApi = natParkURL + "?" + queryString;

  //Test query in console
  console.log(urlNatApi);

  fetch(urlNatApi)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      console.log(err);
      alert("Something went wrong, try again!");
    });
}

//Display Results to the dom
function displayResults(responseJson) {
  console.log("displayResult function works");
  $("#results-list").empty();
  $("#results-list").addClass("hidden");
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(`<br> <br><ul>
      <li><h3>${responseJson.data[i].name}</h3></li>
      <li><p>${responseJson.data[i].description}</p></li>
    
      <br><br>
      
      <li><a  target="_blank" href="https://nps.gov/${responseJson.data[i].parkCode}/planyourvisit">More info & Reservations</a></li>
      </ul><p id="top"><a href="#title"><i class="fas fa-angle-double-up"></i></a></p>
      `);
      
  $("#map").removeClass("hidden")
  $("#results-list").removeClass("hidden");
}
}

function initMap(){
  var options = {
    zoom: 4,
    center
  }
  var map = new google.maps.Map(document.getElementById('map'), options)
} 








