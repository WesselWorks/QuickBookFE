// Import necessary functions from other modules.
import { fetchHotels } from "../module/allHotels.js";
import { createHotel, updateHotel, deleteHotel } from "../module/hotelCRUD.js";

window.addEventListener('load', () =>
{
    // Retrieve references to DOM elements you will interact with.
    const createHotelForm = document.getElementById('createHotelForm');
    const editHotelForm = document.getElementById('editHotelForm');
    const createFormButton = document.getElementById('createFormButton');
    const cancelCreateButton = document.getElementById('cancelCreateButton');
    const cancelEditButton = document.getElementById('cancelEditButton');
    const deleteHotelButton = document.getElementById('deleteHotelButton');
    const searchBar = document.getElementById('searchBar');

    // Initially hide the form used to create new hotels.
    createHotelForm.style.display = 'none';

    // Event listener for 'Create New Hotel' button
    createFormButton.addEventListener('click', function()
    {
        createHotelForm.style.display = 'block';
    });

    // Event listener for 'Cancel' button on the create form
    cancelCreateButton.addEventListener('click', function()
    {
        createHotelForm.style.display = 'none';
    });

    // Event listener for 'Cancel' button on the edit form
    cancelEditButton.addEventListener('click', function()
    {
        editHotelForm.style.display = 'none';
    });

    // Event listener for 'Delete' button
    deleteHotelButton.addEventListener('click', function()
    {
        const hotelId = document.getElementById('editHotelId').value;
        deleteHotel(hotelId)
            .then(() =>
            {
                editHotelForm.style.display = 'none';
                fetchHotels();
            })
            .catch(error => console.error('Error:', error));
    });

    // Event listener for create hotel form submission
    createHotelForm.addEventListener('submit', function(event)
    {
        event.preventDefault();
        submitHotelForm(createHotelForm, createHotel);
    });

    // Event listener for edit hotel form submission
    editHotelForm.addEventListener('submit', function(event)
    {
        event.preventDefault();
        const hotelId = document.getElementById('editHotelId').value;
        submitHotelForm(editHotelForm, (formData) => updateHotel(hotelId, formData));
    });

    // Event listener for search bar input
    searchBar.addEventListener('input', function()
    {
        fetchHotels(searchBar.value.trim());
    });

    // Fetch and display the list of all hotels when the page first loads.
    fetchHotels();
});

function submitHotelForm(form, actionFunction)
{
    const formData = new FormData(form);
    const hotelData = {
        name: formData.get('name'),
        country: formData.get('country'),
        city: formData.get('city'),
        zip: formData.get('zip'),
        street: formData.get('street')
    };

    actionFunction(hotelData)
        .then(() =>
        {
            form.reset();
            fetchHotels();
            form.style.display = 'none';
        })
        .catch(error => console.error('Error:', error));
}