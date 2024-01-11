function handleRowClick(hotel)
{
    populateEditForm(hotel);
    document.getElementById('editHotelForm').style.display = 'block';

    // Scroll the window to the top to ensure the form is visible.
    window.scrollTo(0, 0);
}

// populateEditForm fills the edit form with data from the selected hotel.
function populateEditForm(hotel)
{
    // Set values in the form based on the selected hotel's properties.
    document.getElementById('editHotelId').value = hotel.id;
    document.getElementById('editName').value = hotel.name;
    document.getElementById('editCountry').value = hotel.country;
    document.getElementById('editCity').value = hotel.city;
    document.getElementById('editZip').value = hotel.zip;
    document.getElementById('editStreet').value = hotel.street;
}

// fetchHotels retrieves the list of hotels, optionally filtering them based on a search query.
export function fetchHotels(searchQuery = '')
{
    return fetch('http://localhost:8080/hotels')
        .then(response => response.json())
        .then(data => {
            let filteredData;
            if (searchQuery)
            {
                filteredData = filterHotels(data, searchQuery);
            } else {
                filteredData = data;
            }
            renderHotelTable(filteredData);
        });
}

// filterHotels filters the hotel data based on the provided search query.
function filterHotels(hotels, query)
{
    const lowerCaseQuery = query.toLowerCase();
    // Return only those hotels that match the search query in name, city, or country.
    return hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(lowerCaseQuery) ||
        hotel.city.toLowerCase().includes(lowerCaseQuery) ||
        hotel.country.toLowerCase().includes(lowerCaseQuery)
    );
}

// renderHotelTable updates the hotel table in the HTML with the provided list of hotels.
function renderHotelTable(hotels)
{
    const tableBody = document.getElementById('hotelsTable').getElementsByTagName('tbody')[0];
    // Clear any existing rows in the table body.
    tableBody.innerHTML = '';

    // For each hotel, append a new row to the table.
    hotels.forEach(hotel => {
        appendHotelRow(tableBody, hotel);
    });
}

function appendHotelRow(tableBody, hotel)
{
    // Insert a new row at the end of the table body.
    let row = tableBody.insertRow();
    // Set the content of each cell in the row.
    row.insertCell(0).innerText = hotel.id;
    row.insertCell(1).innerText = hotel.name;
    row.insertCell(2).innerText = `${hotel.country}, ${hotel.city}, ${hotel.street}`;
    // Check if the hotel has a 'rooms' property and it is not empty.
    if (hotel.rooms && hotel.rooms.length > 0) {
        row.insertCell(3).innerText = hotel.rooms.length;
    } else {
        // If 'rooms' is not available or the array is empty, display 'N/A'.
        row.insertCell(3).innerText = 'N/A';
    }
    row.addEventListener('click', () => handleRowClick(hotel));
}