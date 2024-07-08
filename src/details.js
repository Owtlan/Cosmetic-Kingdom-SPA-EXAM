import { html, render } from '/node_modules/lit-html/lit-html.js'
import { editPage } from './edit.js'
import { deletePage } from './delete.js'




export function showDetails(e) {
    e.preventDefault()

    let productId = e.target.id
    // equal if user chek the details
    let owner = e.target.getAttribute('data-owner')
    let userId = sessionStorage.userData ? JSON.parse(sessionStorage.userData)._id : null;

    fetch(`http://localhost:3030/data/products/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch event details');
            }
            return response.json()
        })
        .then(data => {
            console.log(data);
            const main = document.querySelector('main')
            const isOwner = owner === userId;

            const template = html`
            <section id="details">
                <div id="details-wrapper">
                            <img id="details-img" src="${data.imageUrl}" alt="${data.name}" />
                              <p id="details-title">${data.name}</p>
                       <p id="details-category">
                         Category: <span id="categories">${data.category}</span>
                       </p>
                        <p id="details-price">
                          Price: <span id="price-number">${data.price}</span>$
                        </p>
                        <div id="info-wrapper">
                          <div id="details-description">
                            <span>${data.description}</span>
                          </div>
                        </div>
                        ${isOwner ? html`
                        <div id="action-buttons">
                        <a href="" id="edit-btn" data-attribute="${data._id}">Edit</a>
                        <a href="" id="delete-btn" data-attribute="${data._id}">Delete</a>
                        </div>
                    ` : ''}
                </div>

            </section>
            `

            render(template, main);

            const editBtn = document.getElementById('edit-btn')
            editBtn.addEventListener('click', editPage)
            console.log(editBtn);
            const deleteBtn = document.getElementById('delete-btn')
            deleteBtn.addEventListener('click', deletePage)

        })
}