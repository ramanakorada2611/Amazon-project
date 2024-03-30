// const product = [
//     {
//         image:'images/products/athletic-cotton-socks-6-pairs.jpg',
//         name:'Black and Gray Athletic Cotton Socks - 6 Pairs',
//         rating:{
//             stars:4.5,
//             count:87
//         },
//         priceCents:1090
//     },
//     {
//         image:'images/products/intermediate-composite-basketball.jpg',
//         name:'Intermediate Size Basketball',
//         rating:{
//             stars:4,
//             count:127
//         },
//         priceCents:2095
//     },
//     {
//         image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//         name:'Adults Plain Cotton T-Shirt - 2 Pack',
//         rating:{
//             stars:4.5,
//             count:56
//         },
//         priceCents:799
//     }
// ]
 
// i am taking products from data folder

let product=''
products.forEach((eachProduct)=>{
    product+=`
    <div class="product-container">
    <div class="product-image-container">
        <img class="product-image"
        src="${eachProduct.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
        ${eachProduct.name}
    </div>

    <div class="product-rating-container">
        <img class="product-rating-stars"
        src="images/ratings/rating-${eachProduct.rating.stars*10}.png">
        <div class="product-rating-count link-primary">
        ${eachProduct.rating.count}
        </div>
    </div>

    <div class="product-price">
        ${(eachProduct.priceCents/100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
        <select class="js-cart-selector-${eachProduct.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id=${eachProduct.id}>
        Add to Cart 
    </button>
    </div>`
    // console.log(html)
})

// console.log(product)

// for getting product name or any data we have use data  in element
document.querySelector('.js-products').innerHTML=product

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
 button.addEventListener('click',()=>{
    // for getting data from use button and dataset and kehab case covert to camelcase so i wrote productId
    // const productId = button.dataset.productId

    const {productId} = button.dataset // destructuring

    //if you find same product quatnity increase
    let matchingItem;
    cart.forEach((item)=>{
        if(productId===item.productId){
          matchingItem=item
        }
    })
    if(matchingItem){
        matchingItem.quantity+=1
    }
    else{
        cart.push({
            // productId:productId,
            productId,//shorthand property if proeprty and value  same
            quantity:1
        })
    }
    //increse quantity in cart
    // let cartQuantity=0;
    // cart.forEach((item)=>{
    //    cartQuantity+=item.quantity
    // })
    // document.querySelector('.js-cart-quantity').innerHTML=cartQuantity
    // console.log(cartQuantity)
    // console.log(cart)
   
    // selector quantity increase code
    const selectorValue = document.querySelector(`.js-cart-selector-${productId}`).value
    // console.log(selectorValue)"3"
    const selectorNumber = Number(selectorValue)
    document.querySelector('.js-cart-quantity').innerHTML=selectorNumber

 })
})
