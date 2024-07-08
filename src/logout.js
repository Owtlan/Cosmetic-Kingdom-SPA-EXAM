import { navigation } from "./navigation.js";
import { dashboardData } from "./dashboard.js";

export function logout(e) {
 e.preventDefault()
    const accessToken = sessionStorage.getItem('accessToken')

    fetch('http://localhost:3030/users/logout', {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken.replace(/"/g, ''),
        },
    })
        .then(response => {
            if (response.ok) {
                sessionStorage.removeItem('accessToken')
                sessionStorage.removeItem('userData')
                dashboardData(e)
                navigation()
            } else {
                console.error('Logout failed:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
        })
}