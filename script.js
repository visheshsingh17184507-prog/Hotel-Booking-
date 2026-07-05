const sortFilter = document.getElementById("sortFilter");

let selectedSort = "default";
let selectedLocation = "All";
let selectedPrice = "All";
let selectedRating = "All";
let searchText = "";
const ratingFilter = document.getElementById("ratingFilter");
const priceFilter = document.getElementById("priceFilter");
const locationButtons = document.getElementById("locationButtons");
const hotelContainer = document.getElementById("hotelContainer");
const searchInput = document.getElementById("searchInput");
const resetBtn = document.getElementById("resetBtn");

let hotels = [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleWishlist(id){

    if(wishlist.includes(id)){
        wishlist = wishlist.filter(item => item !== id);
    }
    else{
        wishlist.push(id);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    displayHotels(hotels);

}

// View Details
function viewDetails(id){

    const hotel = hotels.find(item => item.id == id);

    localStorage.setItem("selectedHotel", JSON.stringify(hotel));

    window.location.href = "details.html";

}

// Fetch Hotels
async function fetchHotels(){

    try{

        hotelContainer.innerHTML =
        "<h2 class='loading'>Loading Hotels...</h2>";

        const response = await fetch("https://demohotelsapi.pythonanywhere.com/hotels/");

        const result = await response.json();

        hotels = result.data;

localStorage.setItem("allHotels", JSON.stringify(hotels));

displayHotels(hotels);

loadLocations();

    }
    catch(error){

        console.log(error);

        hotelContainer.innerHTML =
        "<h2 class='loading'>Failed to load hotels.</h2>";

    }

}

// Display Hotels
function displayHotels(data){

    hotelContainer.innerHTML = "";

    if(data.length === 0){

        hotelContainer.innerHTML =
        "<h2 class='loading'>No Hotels Found</h2>";

        return;

    }

    data.forEach(hotel=>{

        hotelContainer.innerHTML += `

<div class="hotel-card">

    <img src="${hotel.thumbnail}" alt="${hotel.name}">

    <div class="heart" onclick="toggleWishlist(${hotel.id})">
    ${wishlist.includes(hotel.id) ? "❤️" : "🤍"}
</div>

    <h2>${hotel.name}</h2>

    <p>📍 ${hotel.location}</p>

    <p>💰 ₹${hotel.price}</p>

    <p>⭐ ${hotel.rating}</p>

    <button onclick="viewDetails(${hotel.id})">
        View Details
    </button>

</div>

`;

    });

}

// Create Location Buttons
function loadLocations(){

    locationButtons.innerHTML = "";

    locationButtons.innerHTML +=
    `<button class="active" onclick="filterLocation('All',this)">All</button>`;

    const locations =
    [...new Set(hotels.map(hotel=>hotel.location))];

    locations.forEach(location=>{

        locationButtons.innerHTML +=

        `<button onclick="filterLocation('${location}',this)">
            ${location}
        </button>`;

    });

}

function applyFilters(){

    let filtered = hotels;

    // Search
    if(searchText !== ""){
        filtered = filtered.filter(hotel =>
            hotel.name.toLowerCase().includes(searchText) ||
            hotel.location.toLowerCase().includes(searchText)
        );
    }

    // Location
    if(selectedLocation !== "All"){
        filtered = filtered.filter(hotel =>
            hotel.location === selectedLocation
        );
    }

    // Price
    if(selectedPrice === "3000"){
        filtered = filtered.filter(hotel => hotel.price < 3000);
    }
    else if(selectedPrice === "6000"){
        filtered = filtered.filter(hotel => hotel.price >= 3000 && hotel.price <= 6000);
    }
    else if(selectedPrice === "6001"){
        filtered = filtered.filter(hotel => hotel.price > 6000);
    }

    // Rating
    if(selectedRating !== "All"){
        filtered = filtered.filter(hotel =>
            hotel.rating >= Number(selectedRating)
        );
    }
  
// Sort
if (selectedSort === "lowToHigh") {
    filtered.sort((a, b) => a.price - b.price);
}
else if (selectedSort === "highToLow") {
    filtered.sort((a, b) => b.price - a.price);
}
else if (selectedSort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
}

    displayHotels(filtered);

}

// Filter Hotels
function filterLocation(location,btn){

    document.querySelectorAll(".location-buttons button")
    .forEach(button=>button.classList.remove("active"));

    btn.classList.add("active");

    selectedLocation = location;

applyFilters();

}

// Search
searchInput.addEventListener("input", () => {

    searchText = searchInput.value.toLowerCase();

    applyFilters();

});

priceFilter.addEventListener("change", () => {

    selectedPrice = priceFilter.value;

    applyFilters();

});

ratingFilter.addEventListener("change", () => {

    selectedRating = ratingFilter.value;

    applyFilters();

});

sortFilter.addEventListener("change", () => {

    selectedSort = sortFilter.value;

    applyFilters();

});

resetBtn.addEventListener("click",()=>{

    searchInput.value="";
    priceFilter.value="All";
    ratingFilter.value="All";
    sortFilter.value="default";

    selectedLocation="All";
    selectedPrice="All";
    selectedRating="All";
    selectedSort="default";
    searchText="";

    document.querySelectorAll(".location-buttons button")
    .forEach(btn=>btn.classList.remove("active"));

    document.querySelector(".location-buttons button")
    .classList.add("active");

    applyFilters();

});

// Start
fetchHotels();