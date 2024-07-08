export function navigation() {

    const user = document.querySelector('.user')
    const guest = document.querySelector('.guest')

    let token = sessionStorage.accessToken



    if (token) {
        user.style.display = 'block'
        guest.style.display = 'none'
        // user.childNodes[1].textContent = `Welcome ${takeUserName.username}`
    } else {
        user.style.display = 'none'
        guest.style.display = 'block'
        // user.childNodes[1].textContent = `Welcome username`
    }
}