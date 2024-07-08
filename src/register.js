import { navigation } from "./navigation.js";
import { dashboardData } from "./dashboard.js";

export function registerGuest(e) {
    e.preventDefault()

  
    let email = document.getElementById('register-email').value
    let password = document.getElementById('register-password').value
    let rePass = document.getElementById('repeat-password').value

    if (email === '' || password === '' || rePass === '') {
        window.alert('fields are empty')
        return
    }
    if (password !== rePass) {
        window.alert('password and repassword don\t match')
        return
    }

    fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error("Network response was not ok");
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