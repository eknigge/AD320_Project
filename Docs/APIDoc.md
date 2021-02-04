# API Documentation

## Customer view

### Shows the map of all available carts 

Request: `GET /customer`  
Return data format: render `HTML`  
Description:

- Shows 2-D map that with pins for locations
- Users can zoom in and out and are able to see local streets and landmarks
- API request should retrieve all carts’ location data
- Location data should be in a format digestible by the Maps API
- If no cart available, API should respond with empty

Example request: `/customer`

Example response: `index.html`

### Shows a specific cart’s information 

Request: `GET /customer/:cartId`  
Return data format: `JSON`  
Description:

- Shows a summary of that location when clicked or selected
- Present a link to the menu

Example request: `/customer/12`

Example response:

```json
{
    cartID: 12,
    cartAvailable: "Yes",
    cartLocation: "42.3456, 123,3456",
    vendor: {
        vendorID: 3,
        vendorName: "Joe Smith"
    },
    menu: {
        menuID: 1
    }
}
```

Error handling:

- Invalid ID respond with status 400 and JSON containing error message

```json
{ error: "Invalid cart ID" }
```

### Shows the menu

Request: `GET /customer/:cartId/menu`  
Return data format: `JSON`  
Description: 

- Shows all items on the menu
- Shows the menu’s availability
- Receives cart ID as request
- API should respond menu data

Example request: `/customer/12/menu`

Example response:

```json
{
    cartID: 12,
    menu: {
        menuID: 1,
        items: [
            {
                itemID: 1,
                itemName: "Hot Dog"
                itemAvailable: "Yes"
                itemPrice: 3.00
            },
            {
                itemID: 2,
                ...
            },
            ...
        ]
    }
}
```

Error handling:

- Invalid cart ID respond with status 400 and JSON containing error message

```json
{ error: "Invalid cart ID" } 

or

{ error: "No menu associated with cart 12" }
```

### Submit the order

Request: `POST   /customer/:cartId/menu`  
Return data format: `JSON`  
Description:

- Grabs the items user has selected on the page
- Sends the selected items to the server
- Respond with request successful or failed
- Display response message on page

Example request: `/customer/12/menu`

Example response:

```json
{ status: "order successful placed!"}
```

Error handling:

- Status 400: Order with unavailable items, invalid menu ID, vendor ID or item ID
- Status 500: Server error

```json
{ error: "Item ID 2: Coke is not available at this location" } 

or

{ error: "Invalid item ID" }
```

## Vendor view

### Shows my cart’s location and availability

Request: `GET    /vendor`  
Return data format: render `JSON`  
Description:

- Receives the vendor’s ID as request
- API should respond with the cart’s current location and availability
- If error occurs, respond with error message

Example request: `/vendor`

Example response:

```json
{ 
    vendorID: 13,
    vendorName: "Joe Smith",
    cart: {
        cartID: 1,
        cartLocation: "45.3245, 123.4544",
        cartAvailable: "Yes"
    },
    menu: {
        menuID: 2
    }
}
```

Error handling:

- If vendor has no cart associated with them, respond with status 400
- Unauthorized user receives status 401

```json
{ error: "No cart associated with vendor ID 13" }
```

### Shows all my orders

Request: `GET    /vendor/orders`  
Return data format: `JSON`  
Query parameter: `id = vendorID`  
Description:

- Receives vendor ID as query parameter
- API should respond with all orders data
- Orders data should include customer name, items, item quantity, total price, order completion

Example request: `/vendor?id=13`

Example response:

```json
{
    vendorID: 13,
    orders: [
        {
            orderID: 1,
            customerFirstName: "Sean",
            customerLastName: "McGuire",
            totalPrice: 10.05,
            completed: "No",
            items: [
                {
                    itemID: 1,
                    itemName: "Hot dog",
                    itemPrice: 2.00,
                    ...
                },
                ...
            ]
        },
        {
            orderID: 2,
            ...
        },
        ...
    ]
}
```

Error handling:

- Status 400 for invalid vendor ID
  
```json
{ error: "No cart associated with vendor ID 13" }
```

### Shows the screen where I can edit my menu

Request: `GET    /vendor/menu`  
Return data format: `JSON`
Query parameter: `id = vendorID`
Description: 

`POST   /vendor/:id` - update the cart’s location and availability  
`POST   /vendor/:id/menu` - update the menu  

## System Admin

`GET    /admin` - shows main page where I can add carts and products  

### Carts

`GET    /admin/cart` - shows popup where we can enter/edit information about the cart  
`POST   /admin/cart` - submits request to create new cart  
`PUT    /admin/cart` - update information of an existing cart  
`DELETE /admin/cart` - delete a specific cart  

### User/Vendors

`GET    /admin/vendor` - shows popup where we can enter/edit information about the vendor  
`POST   /admin/vendor` - submits request to create new user/vendor  
`PUT    /admin/vendor` - update information of an existing user/vendor  
`DELETE /admin/vendor` - delete a specific vendor  

### Menu
`GET    /admin/menu` - shows information about a specific menu  
`POST   /admin/menu` - submit request to edit menu items  
`PUT    /admin/menu` - update information on menu items  
`DELETE /admin/menu` - delete a specific menu item
