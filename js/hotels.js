import {fetchHotels} from "../module/allHotels.js";
import {createHotel} from "../module/createHotel.js";
import {updateHotel} from "../module/updateHotel.js";
import {deleteHotel} from "../module/deleteHotel.js";

window.addEventListener('load', () => {

    const createHotelForm = document.getElementById('createHotelForm');
    const editHotelForm = document.getElementById('editHotelForm');
    const createFormButton = document.getElementById('createFormButton');
    const cancelCreateButton = document.getElementById('cancelCreateButton');
    const cancelEditButton = document.getElementById('cancelEditButton');
    const deleteHotelButton = document.getElementById('deleteHotelButton');

    // Add event listener to the delete hotel button
    deleteHotelButton.addEventListener('click', () => {
        const hotelId = document.getElementById('editHotelId').value;

        deleteHotel(hotelId)
            .then(() => {
                editHotelForm.style.display = 'none';
                fetchHotels(); // Refresh the hotel list
            })
            .catch(error => console.error('Error:', error));
    });

    // Add event listener to toggle the create hotel form
    createFormButton.addEventListener('click', () =>
    {
        createHotelForm.style.display = 'block';
    });

    // Hides the form is the cancel button in pressed
    cancelEditButton.addEventListener('click', () =>
    {
        editHotelForm.style.display = 'none';
    });

    createHotelForm.style.display = 'none'; // hide create new hotel form

    fetchHotels()

    // Handling the Create New Hotel Form
    createHotelForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(createHotelForm);
        const hotelData = {
            name: formData.get('name'),
            country: formData.get('country'),
            city: formData.get('city'),
            zip: formData.get('zip'),
            street: formData.get('street')
        };

        createHotel(hotelData)
            .then(() => {
                createHotelForm.reset(); // Clear the form after successful submission
                fetchHotels(); // Refresh the hotel list
                createHotelForm.style.display = 'none';
            })
            .catch(error => console.error('Error:', error));
    });

    // Event listener for the cancel button in the create form
    cancelCreateButton.addEventListener('click', () =>
    {
        createHotelForm.style.display = 'none';
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

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', () => {
        fetchHotels(searchBar.value.trim());
    });

    fetchHotels();
});
