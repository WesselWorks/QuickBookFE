export function deleteHotel(id) {
    return fetch(`http://localhost:8080/deletehotel/${id}`, {
        method: 'DELETE'
    });
}