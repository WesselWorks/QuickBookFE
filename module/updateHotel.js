export function updateHotel(id, hotelData) {
    return fetch(`http://localhost:8080/updatehotel/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotelData)
    });
}