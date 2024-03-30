import {cart, removeCartProducts} from '../data/cart.js'
import {products} from "../data/products.js"
import { currency } from './utils/money.js';

let cartHtml=''
cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    let matchingItem;
    products.forEach((item)=>{
        if(productId===item.id){
            matchingItem=item
        }
    })
    // console.log(matchingItem)
    cartHtml+=`
    <div class="cart-item-container js-item-container-${matchingItem.id}">
                <div class="delivery-date">
                Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingItem.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingItem.name}
                    </div>
                    <div class="product-price">
                    ${currency(matchingItem.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingItem.id}>
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                    <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                    <div>
                        <div class="delivery-option-date">
                        Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                        FREE Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                    <div>
                        <div class="delivery-option-date">
                        Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                        $4.99 - Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                    <div>
                        <div class="delivery-option-date">
                        Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                        $9.99 - Shipping
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
`
})

// console.log(cartHtml)

document.querySelector('.js-order-summary').innerHTML=cartHtml

document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        // console.log(link.dataset.productId)//find productid
        const productId=link.dataset.productId
        removeCartProducts(productId)
        // console.log(cart) //size of cart after delete
        const container=document.querySelector(`.js-item-container-${productId}`)//for find particular caontainer productid
        container.remove()//remove from dom
    })
})