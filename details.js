const detailsContainer = document.getElementById("detailsContainer");

const hotel = JSON.parse(localStorage.getItem("selectedHotel"));

detailsContainer.innerHTML = `
<div class="hotel-card">

    <img src="${hotel.thumbnail}" alt="${hotel.name}">

    <h1>${hotel.name}</h1>

    <p><b>Location:</b> ${hotel.location}</p>

    <p><b>Price:</b> ₹${hotel.price}</p>

    <p><b>Rating:</b> ⭐ ${hotel.rating}</p>

    <p>${hotel.description}</p>

</div>
`;
const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});