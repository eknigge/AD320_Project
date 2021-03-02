import fetch from "node-fetch";

export function getCartItems(){
    return fetch('http://localhost:5000/customer/1')
    .then(data => data.json())
}