function handleRowClick(hotel) {
    // Populate the edit form
    document.getElementById('editHotelId').value = hotel.id;
    document.getElementById('editName').value = hotel.name;
    document.getElementById('editCountry').value = hotel.country;
    document.getElementById('editCity').value = hotel.city;
    document.getElementById('editZip').value = hotel.zip;
    document.getElementById('editStreet').value = hotel.street;
    window.scrollTo(0, 0); // Scrolls to the top when clicked
    // Show the edit form
    document.getElementById('editHotelForm').style.display = 'block';
}


export function fetchHotels() {
    return fetch('http://localhost:8080/allhotels')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('hotelsTable').getElementsByTagName('tbody')[0];

            tableBody.innerHTML = ''; // Clear existing rows in a more concise way

            data.forEach(hotel => {
                let row = tableBody.insertRow();
                row.insertCell(0).innerText = hotel.id;
                row.insertCell(1).innerText = hotel.name;
                row.insertCell(2).innerText = `${hotel.street}, ${hotel.city}, ${hotel.country}`;
                row.insertCell(3).innerText = hotel.rooms ? hotel.rooms.length : 'N/A';
                row.addEventListener('click', () => handleRowClick(hotel));
            });
        });
}
