import {fetchHotels} from "../module/allHotels.js";
import {createHotel} from "../module/createHotel.js";
import {updateHotel} from "../module/updateHotel.js";

window.addEventListener('load', () => {

    const hotelForm = document.getElementById('hotelForm');
    const editHotelForm = document.getElementById('editHotelForm'); // Get the edit form
    const toggleFormButton = document.getElementById('toggleFormButton');

    // Add event listener to toggle the create hotel form
    toggleFormButton.addEventListener('click', () => {
        // Toggle the display of the create hotel form
        if (hotelForm.style.display === 'none' || hotelForm.style.display === '') {
            hotelForm.style.display = 'block';
        } else {
            hotelForm.style.display = 'none';
        }
    });

    hotelForm.style.display = 'none'; // hide create new hotel form

    fetchHotels()

    // Handling the Create New Hotel Form
    hotelForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(hotelForm);
        const hotelData = {
            name: formData.get('name'),
            country: formData.get('country'),
            city: formData.get('city'),
            zip: formData.get('zip'),
            street: formData.get('street')
        };

        createHotel(hotelData)
            .then(() => {
                hotelForm.reset(); // Clear the form after successful submission
                fetchHotels(); // Refresh the hotel list
                hotelForm.style.display = 'none';
            })
            .catch(error => console.error('Error:', error));
    });

    // Event listener for submitting the edit hotel form
    editHotelForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const hotelId = document.getElementById('editHotelId').value;
        const updatedHotelData = {
            name: document.getElementById('editName').value,
            country: document.getElementById('editCountry').value,
            city: document.getElementById('editCity').value,
            zip: document.getElementById('editZip').value,
            street: document.getElementById('editStreet').value,
        };

        updateHotel(hotelId, updatedHotelData)
            .then(() => {
                editHotelForm.style.display = 'none';
                fetchHotels(); // Refresh the hotel list
            })
            .catch(error => console.error('Error:', error));
    });

    fetchHotels();
});
