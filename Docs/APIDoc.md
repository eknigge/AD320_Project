# Hot Dog Tycoon API Documentation

This is the detailed API documentation for our Hot Dog Tycoon web app

Quick Navigation:

- [Customer](#customer-view)
- [Vendor](#vendor-view)
- [System Admin](#system-admin)

## Customer view

### Shows the map of all available carts

Request: `GET /customer`  
Return data format: `JSON`  
Default response: `Status 200 OK`  
Description:

- Shows 2-D map that with pins for locations
- Users can zoom in and out and are able to see local streets and landmarks
- API request should retrieve all carts’ location data
- Location data should be in a format digestible by the Maps API
- If no cart available, API should respond with empty object

Example request: `/customer`

Example response:

`Status 200`  

```json
{
    "carts":
    [
        {
            "cartID": 1,
            "cartLocation": "45.3423, 123.3456",
            "cartAvailable": "Yes"
        },
        {
            "cartID": 2,
            "..."
        },
        "..."
    ]
}
```

Error handling:

- Status 500: Server error or database error

### Shows a specific cart’s information

Request: `GET /customer/:cartId`  
Return data format: `JSON`  
Default response: `Status 200 OK`  
Description:

- Shows a summary of that location when clicked or selected
- Present a link to the menu

Example request: `/customer/12`

Example response:

`Status 200 OK`

```json
{
  "cartID": 12,
  "cartAvailable": "Yes",
  "cartLocation": "42.3456, 123,3456",
  "vendor": {
    "vendorID": 3,
    "vendorName": "Joe Smith"
  },
  "menu": {
    "menuID": 1
  }
}
```

Error handling:

- Status 400: Invalid cart ID

`Status 400 Bad request`

```json
{ "error": "Invalid cart ID" }
```

### Shows the menu

Request: `GET /customer/:cartId/menu`  
Return data format: `JSON`  
Default response: `Status 200 OK`  
Description:

- Shows all items on the menu
- Shows the menu’s availability
- Receives cart ID as request
- API should respond menu data

Example request: `/customer/12/menu`

Example response:

`Status 200 OK`

```json
{
    "cartID": 12,
    "menu": {
        "menuID": 1,
        "items": [
            {
                "itemID": 1,
                "itemName": "Hot Dog",
                "itemAvailable": "Yes",
                "itemPrice": 3.00
            },
            {
                "itemID": 2,
                "..."
            },
            "..."
        ]
    }
}
```

Error handling:

- Status 400: Invalid cart ID

`Status 400 Bad request`

```json
{ "error": "Invalid cart ID" }
```

### Submit the order

Request: `POST /customer/:cartId/menu`  
Return data format: `text`  
Default response: `Status 201 Created`  
Description:

- Grabs the items user has selected on the page
- Sends the selected items to the server
- Sends customer's user ID as part of the request
- Respond with request successful or failed
- Display response message on page

Example request: `/customer/12/menu`

Example response:

`Status 201 Created`

```text
"Successfully submitted order ID 234"
```

Error handling:

- Status 400: Order with unavailable items, invalid menu ID, vendor ID or item ID
- Status 500: Server error

`Status 400 Invalid Request`

```text
"Order failed: item ID 2 is not available"
```

---

## Vendor view

[Back to Top](#hot-dog-tycoon-api-documentation)

### Shows my cart’s location and availability

Request: `GET /vendor`  
Return data format: `JSON`  
Query parameter: vendorID as `id`  
Default response: `Status 200 OK`  
Description:

- Receives the vendor’s ID as request
- API should respond with the cart’s current location and availability
- If error occurs, respond with error message

Example request: `/vendor?id=13`

Example response:

`Status 200 OK`

```json
{
  "vendorID": 13,
  "vendorName": "Joe Smith",
  "cart": {
    "cartID": 1,
    "cartLocation": "45.3245, 123.4544",
    "cartAvailable": "Yes"
  },
  "menu": {
    "menuID": 2
  }
}
```

Error handling:

- If vendor has no cart associated with them, respond with status 400
- Unauthorized user receives status 401

`Status 400 Invalid Request`

```json
{ "error": "No cart associated with vendor ID 13" }
```

### Shows the page where I can edit my location and availability

Request: `GET /vendor/edit`  
Return data format: `JSON`  
Query parameter: vendorID as `id`  
Default response: `Status 200 OK`  
Description:

- API should direct user to page with form
- API should respond with the same response as `/vendor`

Example request: `/vendor/edit?id=13`

Example response:

`Status 200 OK`

```json
{
  "vendorID": 13,
  "vendorName": "Joe Smith",
  "cart": {
    "cartID": 1,
    "cartLocation": "45.3245, 123.4544",
    "cartAvailable": "Yes"
  },
  "menu": {
    "menuID": 2
  }
}
```

### Update the cart’s location and availability

Request: `PUT /vendor/edit`  
Return data format: `text`  
Query parameter: vendorID as `id`  
Default response: `Status 204 No Content`  
Description:

- Grabs updated location and availability and send as request
- Return whether request was successful or failed
- API should include message detailing the result

Example request: `/vendor/edit?id=13`

Example response:

`Status 204 No Content`

Error handling:

- Status 400: invalid location
- Status 401: unauthorized request

```text
"Update failed: invalid location"
```

### Shows all my orders

Request: `GET /vendor/orders`  
Return data format: `JSON`  
Query parameter: vendorID as `id`  
Default response: `Status 200 OK`  
Description:

- Receives vendor ID as query parameter
- API should respond with all orders data
- Orders data should include customer name, items, item quantity, total price, order completion

Example request: `/vendor/orders?id=13`

Example response:

`Status 200 OK`

```json
{
    "vendorID": 13,
    "orders": [
        {
            "orderID": 1,
            "customerFirstName": "Sean",
            "customerLastName": "McGuire",
            "totalPrice": 10.05,
            "completed": "No",
            "items": [
                {
                    "itemID": 1,
                    "itemName": "Hot dog",
                    "itemPrice": 2.00,
                    "..."
                },
                "..."
            ]
        },
        {
            "orderID": 2,
            "..."
        },
        "..."
    ]
}
```

Error handling:

- Status 400 for invalid vendor ID

```json
{ "error": "Invalid vendor ID" }
```

### Update an order's completion status

Request: `PUT /vendor/orders`  
Return data format: `text`  
Query parameter: vendorID as `id`  
Default response: `Status 204 No Content`  
Description:

- Receives the order ID in the body of the request
- API should respond with update success or failure

Example request: `/vendor/orders?id=12`

Example response:

`Status 204 No Content`

Error handling:

- Status 400: invalid order ID or vendor ID

`Status 400 Invalid Request`

```text
"Error: invalid order ID 999"
```

### Show a page where vendor can edit an order's details

Request: `GET /vendor/orders/edit`  
Return data format: `JSON`  
Query parameter: vendorID as `id`  
Default response: `Status 200 OK`  
Description:

- API should direct user to the appropriate page
- API should respond with the same response as `GET /vendor/orders`

Example request: `/vendor/orders/edit?id=12`

Example response:

```json
{
    "vendorID": 13,
    "orders": [
        {
            "orderID": 1,
            "customerFirstName": "Sean",
            "customerLastName": "McGuire",
            "totalPrice": 10.05,
            "completed": "No",
            "items": [
                {
                    "itemID": 1,
                    "itemName": "Hot dog",
                    "itemPrice": 2.00,
                    "..."
                },
                "..."
            ]
        },
        {
            "orderID": 2,
            "..."
        },
        "..."
    ]
}
```

Error handling:

- Status 400 for invalid vendor ID

```json
{ "error": "Invalid vendor ID" }
```

### Update an order's details

Request: `PUT /vendor/orders/edit`  
Return data type: `text`  
Query parameter: vendorID as `id`  
Default response: `Status 204 No Content`  
Description:

- Grabs updated item's information and send as body of the request
- API should respond with update success or failure

Example request: `vendor/orders/edit?id=12`

Example response:

`Status 204 No Content`

Error handling:

- Status 400 for invalid vendor ID

```text
"Error: invalid vendor ID 549"
```

### Shows the screen where I can see my menu

Request: `GET /vendor/menu`
Return data format: `JSON`  
Query parameter: vendorID as `id`  
Default response: `Status 200 OK`  
Description:

- Receives vendor ID as request
- API should respond with all menu data
- Menu data should contain menu ID, item name, item quantity, item availability

Example request: `/vendor/menu?id=12`

Example response:

```json
{
    "vendorID": 12,
    "menu": [
        {
            "itemID": 1,
            "itemName": "Hot dog",
            "itemPrice": 2.00,
            "itemAvailable": "Yes"
        },
        {
            "itemID": 2,
            "itemName": "Coke",
            "..."
        },
        "..."
    ]
}
```

Error handling:

- Status 400 for invalid vendor ID

```json
{ "error": "Invalid vendor ID" }
```

### Shows the screen where I can edit my menu

Request: `GET /vendor/menu/edit`  
Return data format: `JSON`  
Query parameter: vendorID as `id`  
Default response: `Status 200 OK`  
Description:

- Receives vendor ID as request
- API should respond with the same response as `GET /vendor/menu`

Example request: `/vendor/menu/edit?id=12`

Example response:

```json
{
    "vendorID": 12,
    "menu": [
        {
            "itemID": 1,
            "itemName": "Hot dog",
            "itemPrice": 2.00,
            "itemAvailable": "Yes"
        },
        {
            "itemID": 2,
            "itemName": "Coke",
            "..."
        },
        "..."
    ]
}
```

Error handling:

- Status 400 for invalid vendor ID

```json
{ "error": "Invalid vendor ID" }
```

---

## System Admin

[Back to Top](#hot-dog-tycoon-api-documentation)

### Shows a page where we can see a list of all carts

Request: `GET /admin/cart`  
Return data type: `JSON`  
Default response: `Status 200 OK`  
Description:

- Receives the admin ID as request
- Returns a page with all carts information
- API should respond with all cart data that's currently in our system
- Page should contain a form where we can enter new carts

Example request: `/admin/cart`

Example return:

```json
{
    "adminID": 1,
    "cart": [
        {
            "cartID": 21,
            "associatedVendorID": null,
            "location": "45.2342, 123.5434",
            "available": "No"
        },
        {
            "cartID": 22,
            "..."
        },
        "..."
    ]
}
```

Error handling:

- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```json
{ "error": "You do not have permission to access this page" }
```

### Submits request to create new cart

Request: `POST /admin/cart`  
Return data format: `text`  
Default response: `Status 201 Created`  
Description:

- Sends form data containing new cart info as request
- Attach admin ID as part of the request
- API should respond with creation success or failure

Example request: `/admin/cart`

Example response:

```text
"Successfully created new cart ID 20"
```

Error handling:

- Status 400: Invalid cart info
- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```text
"Failed to create new cart, invalid cart info"
```

### Shows a page where we can edit an existing cart

Request: `GET /admin/cart/edit`  
Return data type: `JSON`  
Default response: `Status 200 OK`  
Description:

- Direct to a page where admin can edit existing cart
- API should respond with all/specified cart's data

Example request: `/admin/cart/edit`

Example response:

```json
{
    "adminID": 1,
    "cart": [
        {
            "cartID": 21,
            "associatedVendorID": 20,
            "location": "45.2342, 123.5434",
            "available": "No"
        },
        {
            "cartID": 22,
            "..."
        },
        "..."
    ]
}
```

Error handling:

- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```json
{ "error": "You do not have permission to access this page" }
```

### Update information of an existing cart

Request: `PUT /admin/cart/edit`  
Return data format: `text`  
Default response: `Status 204 No Content`  
Description:

- Sends updated cart info in the request
- Include admin ID as part of the request
- API should respond whether update is successful

Example request: `/admin/cart/edit`

Example response:

```text
"Cart ID 12 successfully updated"
```

Error handling:

- Status 400: Invalid cart infomation
- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```text
"Invalid cart information"
```

### Delete a specific cart

Request: `DELETE /admin/cart/edit`  
Return data form: `text`  
Default response: `Status 204 No Content`  
Description:

- Include Cart ID and admin ID as part of the request
- API should respond whether deletion is successful or not

Example request: `/admin/cart/edit`

Example response:

```text
"Successfully deleted cart ID 13"
```

Error handling:

- Status 400: Invalid cart ID
- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```text
"Cannot delete cart ID 1000"
```

### Show a page where we can see a list of vendors

Request: `GET /admin/vendor`  
Return data format: `JSON`  
Default response: `Status 200 OK`  
Description:

- Direct to a page where a list of vendor is shown
- API should respond with all vendor data
- Vendor data should include vendor ID, vendor name, associated cart, availability

Example request: `/admin/vendor`

Example response:

```json
{
    "adminID": 1,
    "vendors": [
        {
            "vendorID": 12,
            "vendorName": "John Carter",
            "vendorAvailable": "Yes",
            "associatedCartID": 4
        },
        {
            "vendorID": 15,
            "vendorName": "Webber Spyder",
            "..."
        },
        "..."
    ]
}
```

Error handling:

- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```json
{ "error": "You do not have permission to view this page" }
```

### Create new user/vendor

Request: `POST /admin/vendor`  
Return data format: `text`  
Default response: `Status 201 Created`  
Description:

- Grabs new vendor data and send as body of request
- API should respond with creation successful or failure

Default response: `Status 201 Created`

Example request: `/admin/vendor`

Example Response:

```text
Status: 201 Created

"Successfully created vendor ID 15"
```

### Shows a page where we can edit information about a vendor

Request `GET /admin/vendor/edit`  
Return data format: `JSON`  
Query parameter: vendorID or "all" as `id`  
Default response: `Status 200 OK`  
Description:

- Direct user to a page where a form is present to edit vendor information
- API should respond with all/specified vendor data
- Vendor data should include vendor ID, vendor name, associated cart, availability

Example request: `/admin/vendor/edit?id=all`

Example response:

```json
{
    "adminID": 1,
    "vendors": [
        {
            "vendorID": 12,
            "vendorName": "John Carter",
            "vendorAvailable": "Yes",
            "associatedCartID": 4
        },
        {
            "vendorID": 15,
            "vendorName": "Webber Spyder",
            "..."
        },
        "..."
    ]
}
```

Error handling:

- Status 400: Invalid vendor ID
- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```json
{ "error": "Cannot find vendor ID 66" }
```

### Update information of an existing user/vendor

Request `PUT /admin/vendor/edit`  
Return data format: `text`  
Default response: `Status 204 No Content`  
Description:

- Sends updated vendor information in body of request
- API should respond whether the update is successful

Example request: `/admin/vendor/edit`

Example response:

```text
"Successfully updated Vendor ID 14"
```

Error handling:

- Status 400: Invalid vendor ID
- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```text
"Cannot find vendor ID 50"
```

### Delete a specific vendor

Request: `DELETE /admin/vendor/edit`  
Response data format: `text`  
Default response: `Status 204 No Content`  
Description:

- Sends vendor ID in body of request
- API should respond whether deletion is successful

Example request: `/admin/vendor/edit`

Example response:

```text
"Successfully deleted vendor ID 11"
```

Error handling:

- Status 400: Invalid vendor ID
- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```text
"Cannot find vendor ID 50"
```

### Shows information about a specific menu

Request: `GET /admin/menu`  
Response data format: `JSON`  
Query parameter: menuID or "all" as `id`  
Default Response: `Status 200 OK`  
Description:

- Direct to a page where admin can see all data on a specific menu
- API should respond with a list of menus and its data
- Menu data should contain menu ID, item name, item quantity, item availability

Example request: `/admin/menu?id=2`

Example response:

```json
{
    "adminID": 1,
    "menu": {
        "menuID": 2,
        "items": [
        {
            "itemID": 1,
            "itemName": "Hot dog",
            "itemPrice": 2.00,
            "itemAvailable": "Yes"
        },
        {
            "itemID": 2,
            "itemName": "Coke",
            "..."
        },
        "..."
    ]
    }
}
```

Error handling:

- Status 400: Invalid menu ID
- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```json
{ "error": "Cannot find menu ID 40" }
```

### Shows a page where admin can edit a menu

Request: `GET /admin/menu/edit`  
Response data format: `JSON`  
Query parameter: menuID as `id`  
Default response: `Status 200 OK`  
Description:

- Direct to a page where admin can edit a specified menu
- API should respond with all data within the specified menu
- Menu data should contain menu ID, item name, item quantity, item availability

Example request: `/admin/menu/edit?id=5`

Example response:

```json
{
    "adminID": 1,
    "menu": {
        "menuID": 2,
        "items": [
        {
            "itemID": 1,
            "itemName": "Hot dog",
            "itemPrice": 2.00,
            "itemAvailable": "Yes"
        },
        {
            "itemID": 2,
            "itemName": "Coke",
            "..."
        },
        "..."
    ]
    }
}
```

Error handling:

- Status 400: Invalid menu ID
- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```json
{ "error": "Cannot find menu ID 50" }
```

### Add new menu items

Request: `POST /admin/menu/edit`  
Response data format: `text`  
Default response: `Status 201 Created`  
Description:

- Grabs information on new menu item and send as body of request
- API should respond whether creation is successful

Example request: `/admin/menu/edit`

Example response:

```text
"Successfully created menu item ID 9"
```

Error handling:

- Status 400: Invalid menu ID
- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```text
"Cannot find menu ID 50"
```

### Update information on menu items

Request: `PUT /admin/menu/edit`  
Response data format: `text`  
Default response: `Status 204 No Content`  
Description:

- Grabs updated information on menu item and send as body of request
- API should respond whether update on menu item is successful

Example request: `/admin/menu/edit`

Example response:

```text
"Successfully updated menu item ID 4"
```

Error handling:

- Status 400: Invalid menu ID
- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```text
"Cannot find menu ID 50"
```

### Delete a specific menu item

Request: `DELETE /admin/menu/edit`  
Response data format: `text`  
Default response: `Status 204 No Content`  
Description:

- Sends the menu item ID and menu ID as body of request
- API should respond whether deletion is successful

Example request: `/admin/menu/edit`

Example response:

```text
"Successfully deleted menu item ID 5
```

Error handling:

- Status 400: Invalid menu ID
- Status 401: unauthorized, unrecognized user
- Status 403: users without admin permission

```text
"Cannot find menu ID 50"
```

---

#### End of document

[Back to Top](#hot-dog-tycoon-api-documentation)
