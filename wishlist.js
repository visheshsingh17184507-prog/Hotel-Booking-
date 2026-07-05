const wishlistContainer = document.getElementById("wishlistContainer");

const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const hotels = JSON.parse(localStorage.getItem("allHotels")) || [];

const wishlistHotels = hotels.filter(hotel =>
    wishlist.includes(hotel.id)
);

if (wishlistHotels.length === 0) {

    wishlistContainer.innerHTML = `
        <h2 class="loading">No Hotels in Wishlist ❤️</h2>
    `;

}
else {

    wishlistHotels.forEach(hotel => {

        wishlistContainer.innerHTML += `

        <div class="hotel-card">

            <img src="${hotel.thumbnail}" alt="${hotel.name}">

            <h2>${hotel.name}</h2>

            <p>📍 ${hotel.location}</p>

            <p>💰 ₹${hotel.price}</p>

            <p>⭐ ${hotel.rating}</p>

        </div>

        `;

    });

}