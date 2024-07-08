
import { dashboardData } from "./dashboard.js";


export function deletePage(e) {
    e.preventDefault()
    const dataOwner = e.target.getAttribute('data-attribute');
    const isConfirmed = confirm("Are you sure you want to delete this event?");

    if (isConfirmed) {
        const accessToken = sessionStorage.accessToken;

        fetch(`http://localhost:3030/data/products/${dataOwner}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken.replace(/"/g, ''),
            }
        })
        .then(response => {
            if (response.ok) {
                dashboardData(e)
            } else {
                console.error("Failed to delete event:", response.status);
            }
        })
            .catch(error => {
                console.error("Error deleting event:", error);
            });
    } else {
        console.log("Deletion cancelled.");
    }
}