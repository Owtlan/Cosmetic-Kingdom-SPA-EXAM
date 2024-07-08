import { dashboardData } from "./dashboard.js";

export function addItem(e) {
    e.preventDefault();
    const name = document.getElementById('name').value
    const imageUrl = document.getElementById('product-image').value
    const category = document.getElementById('product-category').value
    const description = document.getElementById('product-description').value
    const price = document.getElementById('product-price').value
 

    if (name === '' || imageUrl === '' || category === '' || description === '' || price === '') {
        window.alert('you need to fill all fields')
        return
    }


    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
        window.alert('User is not logged in.');
        return;
    }

    fetch(`http://localhost:3030/data/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken.replace(/"/g, ''),
        },
        body: JSON.stringify({
            name,
            imageUrl, 
            category, 
            description, 
            price          
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        dashboardData(e);
    });
}
