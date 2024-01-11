export function deleteHotel(id) {
    return fetch(`http://localhost:8080/hotel/${id}`, {
        method: 'DELETE'
    });
}