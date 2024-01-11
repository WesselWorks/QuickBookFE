const URL = 'http://localhost:8080';

export function createHotel(hotelData)
{
    return fetch(`${URL}/hotel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotelData)
    });
}

export function updateHotel(id, hotelData)
{
    return fetch(`${URL}/hotel/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotelData)
    });
}

export function deleteHotel(id)
{
    return fetch(`${URL}/hotel/${id}`, {
        method: 'DELETE'
    });
}