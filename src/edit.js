import { html, render } from '/node_modules/lit-html/lit-html.js'
const main = document.querySelector('main')
// value="${data.category}"
export function editPage(e) {
    e.preventDefault()

    const dataOwner = e.target.getAttribute('data-attribute')
    console.log(dataOwner);
    fetch(`http://localhost:3030/data/products/${dataOwner}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to edit event');
            }
            return response.json()

        })
        .then(data => {
            console.log(data);
            const template = html`
    <section id="edit">
    <div class="form">
      <h2>Edit Product</h2>
      <form class="edit-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Product Name"
          value="${data.name}"
        />
        <input
          type="text"
          name="imageUrl"
          id="product-image"
          placeholder="Product Image"
          value="${data.imageUrl}"
        />
        <input
          type="text"
          name="category"
          id="product-category"
          placeholder="Category"
          value="${data.category}"
        />
        <textarea
          id="product-description"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
        >${data.description}</textarea>

        <input
          type="text"
          name="price"
          id="product-price"
          placeholder="Price"
          value="${data.price}"
        />
        <button type="submit">post</button>
      </form>
    </div>
  </section>
            `
            render(template, main)

            const makeEditBtn = document.querySelector('.edit-form button')
            makeEditBtn.addEventListener('click', makeEdits)
        })


    //make edit
    function makeEdits(e) {
        e.preventDefault()

        const name = document.getElementById('name').value
        const imageUrl = document.getElementById('product-image').value
        const category = document.getElementById('product-category').value
        const description = document.getElementById('product-description').value
        const price = document.getElementById('product-price').value


        if (name === '' || imageUrl === '' || category === '' || description === '' || price === '') {
            window.alert('you need to fill all fields')
            return
        }

        const accessToken = sessionStorage.getItem('accessToken')
        if (!accessToken) {
            window.alert('User is not logged in.');
            return;
        }

        fetch(`http://localhost:3030/data/products/${dataOwner}`, {
            method: 'PUT',
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
                return response.json()
            })
            .then(data => {

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
                <div id="action-buttons">
                        <a href="" id="edit-btn" data-attribute="${data._id}">Edit</a>
                        <a href="" id="delete-btn" data-attribute="${data._id}">Delete</a>
                        </div>
                </section>
    
                `
                render(template, main);

                const editBtn = document.getElementById('edit-btn')
                editBtn.addEventListener('click', editPage)
            })
    }
}