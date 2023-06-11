const productData = JSON.parse(data);
console.log(productData);
const contentEl = document.querySelector('.content');

let cartProducts = [];

const productBox = document.createElement('div');
productBox.classList.add('product-box');

productData.product.forEach(product => {
    const productEl = document.createElement('div');
    productEl.classList.add('product');

    const productImg = document.createElement("img");
    productImg.classList.add('product__img');
    productImg.src = product.img;
    productImg.setAttribute('alt', "photo");
    productImg.setAttribute('onmouseover', "this.src='img/Hover.png';");
    productImg.setAttribute('onmouseout', `this.src='${product.img}';`);

    const productName = document.createElement('p');
    productName.classList.add('product__Name');
    productName.textContent = product.name;

    const productDescription = document.createElement('p');
    productDescription.classList.add('product__description');
    productDescription.textContent = product.description;

    const productPrice = document.createElement('p');
    productPrice.classList.add('product__price');
    productPrice.textContent = product.price;

    productEl.appendChild(productImg);
    productEl.appendChild(productName);
    productEl.appendChild(productDescription);
    productEl.appendChild(productPrice);

    productBox.appendChild(productEl);
    contentEl.appendChild(productBox);

    productImg.addEventListener('click', () => {
        let i = 0; 
        
        cartProducts.forEach( elem => {
            if (elem.id === product.id) {
                elem.Quantity++;
                i++;
            }
        });
        if (i == 0)  {
            cartProducts.push({'id':product.id, 'Quantity': 1 });
            i = 0;
        }
        checkingElements();
        console.log(cartProducts);
        cartList();
    });
});


const cartItems = document.querySelector('.cart__items');

const cartTitles = document.createElement('h2');
cartTitles.classList.add('title', 'cart__titles');
cartTitles.textContent = "Cart Items";

const cartItemsBox = document.createElement('div');
cartItemsBox.classList.add('cartItems-box');

function cartList() {
    deleteCart();
    cartProducts.forEach(item => {
        productData.product.forEach(product => {
            if (item.id === product.id) {

                const cartProduct = document.createElement('div');
                cartProduct.classList.add('cart__product');
    
                const cartImg = document.createElement("img");
                cartImg.classList.add('cart__img');
                cartImg.src = product.img;
                cartImg.setAttribute('alt', "photo");
    
                const productText = document.createElement('div');
                productText.classList.add('product__text');
    
                const closeButton = document.createElement('div');
                closeButton.classList.add('close__button');
    
                const cartTitle = document.createElement('p');
                cartTitle.classList.add('cart__title');
                cartTitle.textContent = product.name;
    
                const cartPrice = document.createElement('p');
                cartPrice.classList.add('cart__desc', 'cart__price');
                cartPrice.textContent = 'Price: ' + product.price;
    
                const cartColor = document.createElement('p');
                cartColor.classList.add('cart__desc', 'cart__color');
                cartColor.textContent = 'Color: ' + product.color;
    
                const cartSize = document.createElement('p');
                cartSize.classList.add('cart__desc', 'cart__size');
                cartSize.textContent = 'Size: ' + product.size;
    
                const cartQuantity = document.createElement('p');
                cartQuantity.classList.add('cart__desc', 'cart__quantity');
                cartQuantity.textContent = 'Quantity:     ' + item.Quantity;
    
                const cross = document.createElement("img");
                cross.classList.add('cross');
                cross.src = "img/close.png";
                cross.setAttribute('alt', "close");
                cross.setAttribute('onmouseover', "this.src='img/close_hov.png';");
                cross.setAttribute('onmouseout', `this.src='img/close.png';`);
    
                productText.appendChild(cartTitle);
                productText.appendChild(cartPrice);
                productText.appendChild(cartColor);
                productText.appendChild(cartSize);
                productText.appendChild(cartQuantity);
    
                closeButton.appendChild(cross);
    
                cartProduct.appendChild(cartImg);
                cartProduct.appendChild(productText);
                cartProduct.appendChild(closeButton);
    
                cartItemsBox.appendChild(cartProduct);
    
                cartItems.appendChild(cartTitles);
                cartItems.appendChild(cartItemsBox);

                cross.addEventListener('click', () => {
                    let pos = cartProducts.indexOf(item);
                    cartProducts.splice(pos, 1);
                    console.log(cartProducts);
                    checkingElements();
                    cartList();
                });
            }
        })
        
    })
}

function deleteCart() {
    let child = cartItemsBox.lastElementChild; 
    while (child) {
        cartItemsBox.removeChild(child);
        child = cartItemsBox.lastElementChild;
    }

}

function checkingElements() {
    if (cartProducts.length == 0) {
        cartItems.style.display = 'none';
    } else {
        cartItems.style.display = 'contents';
    }
}