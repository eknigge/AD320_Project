# API Design Doc

## Customer view

`GET    /customer` - Shows the map of all available carts  
`GET    /customer/:cartId` - shows a specific cart’s information  
`GET    /customer/:cartId/menu` - shows the menu only  

`POST   /customer/:cartId/menu` - submit the order  

## Vendor view

`GET    /vendor` - shows my cart’s location and availability  
`GET    /vendor/orders` - shows all my orders  
`GET    /vendor/menu` - shows the screen where I can edit my menu  

`POST   /vendor/cart` - update the cart’s location and availability  
`POST   /vendor/menu` - update the menu  

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