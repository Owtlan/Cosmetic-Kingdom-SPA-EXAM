import { html, render } from '/node_modules/lit-html/lit-html.js'
import { showDetails } from './details.js'
const main = document.querySelector('main')


export function dashboardData(e) {
    e.preventDefault()

    fetch('http://localhost:3030/data/products?sortBy=_createdOn%20desc', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json()
        })
        .then(data => {
console.log(data);
            if (data.length === 0) {
                const template = html`
                <h2>Products</h2>
            <section id="dashboard">
            <h2>No products yet.</h2>
                </section>
              `
                render(template, main)
            } else {

                const itemsTemplate = data.map(item => html`
              <div class="product">
                <img src="${item.imageUrl}" alt="example1" />
                <p class="title">${item.name}</p>
                <p><strong>Price:</strong><span class="price">${item.price}</span>$</p>
                <a class="details-btn" href="#" id="${item._id}" data-owner="${item._ownerId}">Details</a>
              </div>
        
        `);

                const template = html`
                <h2>Products</h2>
            <section id="dashboard">
                ${itemsTemplate}
            </section>
        `;
                render(template, main);
                const detailBtn = document.querySelectorAll('.details-btn')

                detailBtn.forEach(x => {
                    x.addEventListener('click', showDetails)
                })
            }
        })
}