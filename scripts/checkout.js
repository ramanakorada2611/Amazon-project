import {cart, removeCartProducts,updateDeliveryOption} from '../data/cart.js'
import {products} from "../data/products.js"
import { currency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions } from '../data/deliveryOptions.js';
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

    const deliveryOptionId = cartItem.deliveryOptionId
    console.log(deliveryOptionId)
    let deliveryOption ;
    deliveryOptions.forEach((option)=>{
        if(deliveryOptionId===option.id){
            deliveryOption = option
        }
    })
   console.log(deliveryOption)
    const todayDate = dayjs()
    const addDays = todayDate.add(deliveryOption.deliveryDays,'days')
    const deliveryDate =  addDays.format('dddd, MMMM D')
    cartHtml+=`
    <div class="cart-item-container js-item-container-${matchingItem.id}">
                <div class="delivery-date">
                Delivery date: ${deliveryDate}
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
                    <span class="update-quantity-link link-primary js-update-link " data-product-id=${matchingItem.id}>
                        Update
                        <input class="quantity-input">
                        <span class="save-quantity-link">Save</span>
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingItem.id}>
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options ">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                   ${deliveryOptionFun(matchingItem,cartItem)}
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


//date code
// const todayDate = dayjs()
// const deliveryDate = todayDate.add(7,'days')
// const formatDate =  deliveryDate.format('dddd, MMMM D')
// console.log(formatDate)

function deliveryOptionFun(matchingItem,cartItem){
    let html = ''
   
    deliveryOptions.forEach((deliveryOption)=>{
        const todayDate = dayjs()
        const addDays = todayDate.add(deliveryOption.deliveryDays,'days')
        const deliveryDate =  addDays.format('dddd, MMMM D')
        const free = deliveryOption.priceCents===0 ? 'FREE' :`$${currency(deliveryOption.priceCents)}`
        const isChecked =  deliveryOption.id === cartItem.deliveryOptionId
        html+= `<div class="delivery-option js-delivery-option"
        data-product-id=${matchingItem.id}
        data-delivery-option-id = ${deliveryOption.id}>
        <input type="radio" ${isChecked ? 'checked':''}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
        <div>
            <div class="delivery-option-date">
            ${deliveryDate}
            </div>
            <div class="delivery-option-price">
            ${free} - Shipping
            </div>
        </div>
        </div>`
    })
    return html
}


document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
        const {productId,deliveryOptionId} = element.dataset
        updateDeliveryOption(productId,deliveryOptionId)
    })
})


























function updatecartQuantity(){
    let cartQuantity=0;
    cart.forEach((item)=>{
       cartQuantity+=item.quantity
    })
    document.querySelector('.js-return-link-quantity').innerHTML=cartQuantity
}
updatecartQuantity()

document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click',()=>{
  const {productId} = link.dataset
  console.log(productId)
    })
  })


