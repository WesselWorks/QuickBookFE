export function createHotel(hotelData) {
    return fetch('http://localhost:8080/newhotel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotelData)
    });
}