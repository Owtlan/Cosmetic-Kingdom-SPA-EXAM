import { navigation } from "./navigation.js";
import { dashboardData } from "./dashboard.js";

export function loginUser(e) {
    e.preventDefault()


    const email  = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (email  === '' || password === '') {
        window.alert('fields are empty')
        return
    }


    fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email , password })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }
            return response.json()
        })
        .then(data => {
            sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken))
            sessionStorage.setItem('userData', JSON.stringify(data))
            dashboardData(e)
            navigation()
        })
        .catch(error => {
            window.alert(error.message); // Show error message to the user
        });
}