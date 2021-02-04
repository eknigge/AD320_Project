# Hot Dog Tycoon API Design Doc

This is the routing and API design document for our hot dog tycoon web app.

For more detailed API documentation, see `APIDoc.md`

## Customer view

`GET    /customer` - Shows the map of all available carts  
`GET    /customer/:cartId` - shows a specific cart’s information  
`GET    /customer/:cartId/menu` - shows the menu only  

`POST   /customer/:cartId/menu` - submit the order  

## Vendor view

`GET    /vendor` - shows my cart’s location and availability  
`GET    /vendor/edit` - shows the page where I can edit my location and availability  
`POST   /vendor/edit` - update the cart’s location and availability  

`GET    /vendor/orders` - shows all my orders  
`PUT   /vendor/orders` - update an order's completion status  

`GET    /vendor/orders/edit` - show a page where vendor can edit an order's details  
`POST   /vendor/orders/edit` - update an order's details

`GET    /vendor/menu` - shows the screen where I can see my menu  
`GET    /vendor/menu/edit` - shows the screen where I can edit my menu  
`POST   /vendor/menu/edit` - update the menu

## System Admin

`GET    /admin` - shows main page where I can add carts and products

### Carts

`GET    /admin/cart` - shows a page where we can see a list of all carts  
`POST   /admin/cart` - submits request to create new cart

`GET    /admin/cart/edit` - shows a page where we can edit an existing cart  
`PUT    /admin/cart/edit` - update information of an existing cart  
`DELETE /admin/cart/edit` - delete a specific cart

### User/Vendors

`GET    /admin/vendor` - shows a page where we can see a list of vendors  
`POST   /admin/vendor` - submits request to create new user/vendor  

`GET    /admin/vendor/edit` - shows a page where we can edit information about a vendor  
`PUT    /admin/vendor/edit` - update information of an existing user/vendor  
`DELETE /admin/vendor/edit` - delete a specific vendor

### Menu

`GET    /admin/menu` - shows information about a specific menu  
`GET    /admin/menu/edit` - shows a page where admin can edit a menu  
`POST   /admin/menu/edit` - submit request to edit menu items  
`PUT    /admin/menu/edit` - update information on menu items  
`DELETE /admin/menu/edit` - delete a specific menu item  
