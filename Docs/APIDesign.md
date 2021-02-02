# API Design Doc

## Customer view

`GET    /customer` - Shows the map of all available carts  
`GET    /customer/:id` - shows a specific cart’s information  
`GET    /customer/:id/menu` - shows the menu only  

`POST   /customer/:id/menu` - submit the order  

## Vendor view

`GET    /vendor` - shows my cart’s location and availability  
`GET    /vendor/:id` - shows all my orders  
`GET    /vendor/:id/menu` - shows the screen where I can edit my menu  

`POST   /vendor/:id` - update the cart’s location and availability  
`POST   /vendor/:id/menu` - update the menu  

## System Admin

`GET    /admin` - shows main page where I can add carts and products  

### Carts

`GET    /admin/:cartID` - shows popup where we can enter/edit information about the cart  
`POST   /admin/:cartID` - submits request to create new cart  
`PUT    /admin/:cartID` - update information of an existing cart  
`DELETE /admin/:cartID` - delete a specific cart  

### User/Vendors

`GET    /admin/:vendorID` - shows popup where we can enter/edit information about the vendor  
`POST   /admin/:vendorID` - submits request to create new user/vendor  
`PUT    /admin/:vendorID` - update information of an existing user/vendor  
`DELETE /admin/:vendorID` - delete a specific vendor  

### Menu
`GET    /admin/:menuID` - shows information about a specific menu  
`POST   /admin/:menuID` - submit request to edit menu items  
`PUT    /admin/:menuID` - update information on menu items  
`DELETE /admin/:menuID` - delete a specific menu item
