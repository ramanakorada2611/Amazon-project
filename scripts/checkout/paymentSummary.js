import { cart } from "../../data/cart.js";
import { getDeliveryOptions } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { currency } from "../utils/money.js";
export function renderPaymentSummary(){
    let  productPrice=0
    let shippingPriceCents=0
    cart.forEach(element => {
       const product = getProduct(element.productId)
       productPrice+= product.priceCents*element.quantity
       const deliveryOption = getDeliveryOptions(element.deliveryOptionId)
       shippingPriceCents+=deliveryOption.priceCents
    });
    const totalBeforeTax = productPrice+shippingPriceCents
    const taxPrice = totalBeforeTax*0.1
    const totalPrice =totalBeforeTax+taxPrice
    // console.log(productPrice,shippingPriceCents,totalPrice)

    let paymentHtml =` 
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${currency(productPrice)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${currency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${currency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${currency(taxPrice)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${currency(totalPrice)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
`
document.querySelector('.js-payment-summary').innerHTML= paymentHtml
}