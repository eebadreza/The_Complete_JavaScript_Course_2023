// console.log("Exporting Module"); 

const cart = []
export const addToCart = function(product, quantity, show=false){
    cart.push([product, quantity])
    console.log(`${quantity} ${product} added to cart`);
    if (show === true) {
        console.log(cart);
    }
}