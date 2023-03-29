// JavaScript code for the website

// Function to get the user's current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to display the user's current location on the website
function showPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  const latLng = new google.maps.LatLng(lat, lng);
  map.setCenter(latLng);
  map.setZoom(12);

  const marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });
}

// Function to show an error message if there is an issue with geolocation
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

// Function to filter the results based on user input
function filterResults() {
  const filterOptions = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );

  const filteredResults = [];

  for (let i = 0; i < restaurants.length; i++) {
    let isFiltered = true;
    const restaurant = restaurants[i];

    // Check if the restaurant meets the user's filter options
    for (let j = 0; j < filterOptions.length; j++) {
      const option = filterOptions[j].value;
      if (!restaurant.tags.includes(option)) {
        isFiltered = false;
        break;
      }
    }

    // Check if the restaurant is within the user's selected distance
    if (isFiltered && restaurant.distance <= selectedDistance) {
      filteredResults.push(restaurant);
    }
  }

  displayResults(filteredResults);
}

function displayResults(results) {
  // Select the result container
  const resultContainer = document.getElementById("result-container");

  // Clear any existing results
  resultContainer.innerHTML = "";

  // If no results were found, display a message to the user
  if (results.length === 0) {
    resultContainer.innerHTML = "No results found for your search.";
    return;
  }

  // Loop through the results and create a card for each restaurant
  results.forEach((restaurant) => {
    // Create a div for the card and add a class
    const card = document.createElement("div");
    card.classList.add("restaurant-card");

    // Add the restaurant name to the card
    const name = document.createElement("h3");
    name.innerHTML = restaurant.name;
    card.appendChild(name);

    // Add the restaurant address to the card
    const address = document.createElement("p");
    address.innerHTML = restaurant.address;
    card.appendChild(address);

    // Add the restaurant rating to the card
    const rating = document.createElement("p");
    rating.innerHTML = `Rating: ${restaurant.rating}`;
    card.appendChild(rating);

    // Add the restaurant image to the card
    const image = document.createElement("img");
    image.src = restaurant.image;
    card.appendChild(image);

    // Add the card to the result container
    resultContainer.appendChild(card);
  });
}

// Function to filter the restaurants based on user input
function filterRestaurants(restaurants) {
  // Select the user input
  const postcode = document.getElementById("postcode").value;
  const distance = document.getElementById("distance").value;
  const foodType = document.getElementById("food-type").value;

  // Filter the restaurants based on the user input
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Check if the postcode matches and is within the specified distance
    if (
      restaurant.postcode === postcode &&
      restaurant.distance <= distance
    ) {
      // Check if the restaurant offers the specified food type
      if (restaurant.foodTypes.includes(foodType)) {
        return true;
      }
    }

    return false;
  });

  // Display the filtered results on the website
  displayResults(filteredRestaurants);
}
