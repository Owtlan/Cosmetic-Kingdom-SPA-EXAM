import { html, render } from '/node_modules/lit-html/lit-html.js'
import { registerGuest } from './register.js';
import { loginUser } from './login.js';
import { logout } from './logout.js';
import { dashboardData } from './dashboard.js';
import { addItem } from './create.js';
const main = document.querySelector('main')





//register
const registerPageBtn = document.querySelector('a[href="/register"]');
registerPageBtn.addEventListener('click', registerPage)

function registerPage(e) {
    e.preventDefault()

    const template = html`
    <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="register-form">
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="#">Login</a></p>
      </form>
    </div>
  </section>
    `
    render(template, main)
    const registerBtn = document.querySelector('.register-form button')
    console.log(registerBtn);
    registerBtn.addEventListener('click', registerGuest)
}
//login
const loginPageBtn = document.querySelector('a[href="/login"]');
loginPageBtn.addEventListener('click', loginPage)

function loginPage(e) {
    e.preventDefault()

    const template = html`
    <section id="login">
    <div class="form">
      <h2>Login</h2>
      <form class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="#">Create an account</a>
        </p>
      </form>
    </div>
  </section>
    `
    render(template, main)


    const loginBtn = document.querySelector('.login-form button')
    loginBtn.addEventListener('click', loginUser)
}
//logout
const logoutBtn = document.querySelector('a[href="/logout"]');
logoutBtn.addEventListener('click', logout)

//dashboard
const dashboardBtn = document.querySelector('a[href="/dashboard"]');
console.log(dashboardBtn);
dashboardBtn.addEventListener('click', dashboardData)


//create
const createPageView = document.querySelector('a[href="/create"]');
createPageView.addEventListener('click', createPage)

function createPage(e) {
    e.preventDefault()

    const template = html`
    <section id="create">
    <div class="form">
      <h2>Add Product</h2>
      <form class="create-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Product Name"
        />
        <input
          type="text"
          name="imageUrl"
          id="product-image"
          placeholder="Product Image"
        />
        <input
          type="text"
          name="category"
          id="product-category"
          placeholder="Category"
        />
        <textarea
          id="product-description"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
        ></textarea>

        <input
          type="text"
          name="price"
          id="product-price"
          placeholder="Price"
        />

        <button type="submit">Add</button>
      </form>
    </div>
  </section>
  `
    render(template, main)

    const createBtn = document.querySelector('.create-form button')
    createBtn.addEventListener('click', addItem)
}

//homepage
export function homePage() {

    const template = html`
    <section id="home">
    <img src="./images/beauty-g0d19af267_1920-removebg.png" alt="home" />
    <h2>Looking for the best beauty products?</h2>
    <h3>You are in the right place!</h3>
  </section>
    `
    render(template, main)
}