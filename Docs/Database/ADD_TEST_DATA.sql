USE mydb;

INSERT INTO ITEMS (ITEM_NAME, ITEM_CATEGORY, PRICE, DESCRIPTION_ITEM)
VALUES 	("Seattle Dog", "Food", 499, "Our most popular item the Seattle Dog. Cream cheese, relish, beef dog, on brioche bun."),
		("Plain Hot Dog", "Food", 349, "Keeping it simple"),
        ("Bailey Dog", "Food", 777, "Named after Eric's lovely dog. An all beef dog with extra awesome bacon bits and cheedar cheese."),
        ("Double Dog", "Food", 599, "Take a plain and make it double"),
        ("Chicago", "Food", 499, "Mustard, onion, relish, dill pickle, sport peppers, and tomato"),
        ("New York", "Food", 499, "Mustard, sauerkraut, onion sauce"),
        ("HOT HOT HOT Dog", "Food", 499, "Like a plain dog, but with a spicy twist"),
        ("BBQ", "Food", 499, "Plain with sweet and tangy BBQ Sauce"),
        ("Vegetarian", "Food", 499, "Locally sourced organic vegetarian meat substitute"),
        ("Chili Cheese", "Food", 499, "Chili, cheddar, and onions"),
        ("Water", "Drinks", 99, ""),
        ("Soda", "Drinks", 199, "Coke, Pepsi, and some local favorites available"),
        ("Beer", "Drinks", 399, "Rotating tap and assortment of Fremont Brewery's best ales."),
        ("Bacon Bits", "Side", 99, "In case you didn't get enough on your dog"),
        ("Cream Cheese", "Side", 99, "Extra fat for your arteries."),
        ("Chili", "Side", 99, "Home super secret family recipe"),
        ("Sauerkraut", "Side", 99, "Home super secret family recipe"),
        ("Chips", "Side", 199, "Assortment of regular favorites")
;

INSERT INTO MENU(DESCRIPTION_MENU, MENU_TITLE)
VALUES 	("This is the cart located in Ballard", "Ballard"),
		("This is the cart located in Belltown", "Belltown"),
        ("This is the cart located in Capitol Hill", "Cap Hill"),
		("This is the cart located in North Gate", "North Gate"),
        ("This is the cart located in Queen Anne", "Queen Anne")
;

INSERT INTO USERS (EMAIL, PASSWORD, FIRST_NAME, LAST_NAME, PERMISSION)
VALUES 	("admin@website.com", "adminpass", "Default", "Admin", "ADMIN"),
        ("user1@website.com", "pass1", "Homer", "Simpson", "CUSTOMER"),
		("user2@website.com", "pass1", "Baby", "Huey", "CUSTOMER"),
        ("user3@url.com", "pass1", "Juicy", "J", "CUSTOMER"),
        ("vendor1@website.com", "vpass1", "Bobby", "Flay", "VENDOR"),
        ("vendor2@website.com", "vpass2", "Wolfgang", "Puck", "VENDOR"),
        ("admin@website.com", "apass1", "Best", "Boss", "ADMIN"),
        ("angrychef@gmail.com", "itsraw", "Gordan", "Ramsey", "VENDOR"),
        ("ilikedonuts@simpson.com", "yumyum", "Homer", "Simpson", "VENDOR"),
        ("ilikedonuts@simpson.com", "yumyum", "Rick", "Sanchez", "VENDOR"),
        ("unemployed@me.com", "yikes", "Donald", "Duck", "VENDOR")
;

INSERT INTO ITEMS_MENU(MENU_ID, ITEM_ID, AVAILABLE)
VALUES 	
	(1,1,"Y"),
	(1,2,"Y"),
	(1,3,"Y"),
	(1,4,"Y"),
	(1,5,"Y"),
	(1,6,"Y"),
	(1,7,"Y"),
	(1,8,"Y"),
	(1,9,"Y"),
	(1,10,"Y"),
	(1,11,"Y"),
	(1,12,"Y"),
	(1,13,"Y"),
	(1,14,"Y"),
	(1,15,"Y"),
	(1,16,"Y"),
	(1,17,"Y"),
	(2,1,"Y"),
	(2,2,"Y"),
	(2,3,"Y"),
	(2,4,"Y"),
	(2,5,"Y"),
	(2,6,"Y"),
	(2,7,"Y"),
	(2,8,"Y"),
	(2,9,"Y"),
	(2,10,"Y"),
	(2,11,"Y"),
	(2,12,"Y"),
	(2,13,"Y"),
	(2,14,"Y"),
	(2,15,"Y"),
	(2,16,"Y"),
	(2,17,"Y"),
	(3,1,"Y"),
	(3,2,"Y"),
	(3,3,"Y"),
	(3,4,"Y"),
	(3,5,"Y"),
	(3,6,"Y"),
	(3,7,"Y"),
	(3,8,"Y"),
	(3,9,"Y"),
	(3,10,"Y"),
	(3,11,"Y"),
	(3,12,"Y"),
	(3,13,"Y"),
	(3,14,"Y"),
	(3,15,"Y"),
	(3,16,"Y"),
	(3,17,"Y"),
    (4,1,"Y"),
    (4,2,"Y"),
    (4,3,"Y"),
    (4,4,"Y"),
    (4,5,"Y"),
    (4,6,"Y"),
    (4,7,"N"),
    (4,8,"Y"),
    (4,9,"Y"),
    (4,10,"N"),
    (4,12,"Y"),
    (4,13,"N"),
    (4,14,"Y"),
    (4,15,"N"),
    (4,16,"Y"),
    (4,17,"Y"),
	(5,1,"Y"),
    (5,2,"Y"),
    (5,3,"Y"),
    (5,4,"N"),
    (5,5,"Y"),
    (5,6,"Y"),
    (5,7,"N"),
    (5,8,"Y"),
    (5,9,"Y"),
    (5,10,"N"),
    (5,12,"Y"),
    (5,13,"N"),
    (5,14,"Y"),
    (5,15,"N"),
    (5,16,"Y"),
    (5,17,"Y")
; 

INSERT INTO LOG(DATETIME, EVENT)
VALUES 	("2021-01-01 05:05:10", "INSERT NEW USER"),
		("2021-01-01 10:15:10", "ADDED NEW STAND"),
        ("2021-01-01 12:18:10", "UPDATE MENU")
;

INSERT INTO USER_LOGS(USER_ID, LOG_ITEM_ID)
VALUES 	(1, 1),
		(5, 2),
        (4, 3)
;

INSERT INTO ORDERS(DATE)
VALUES 
	("2021-01-01 18:03:25"),
	("2021-01-01 14:06:06"),
	("2021-01-01 23:05:47"),
	("2021-01-01 13:30:13"),
	("2021-01-02 07:33:30"),
	("2021-01-02 19:03:53"),
	("2021-01-02 19:29:40"),
	("2021-01-02 13:40:44"),
	("2021-01-03 12:52:05"),
	("2021-01-03 01:33:21"),
	("2021-01-03 07:09:32"),
	("2021-01-03 14:16:23")
 	
;

INSERT INTO ORDER_USERS(ORDER_ID, USER_ID)
VALUES 	
	(1,4),
	(2,3),
	(3,3),
	(4,3),
	(5,3),
	(6,3),
	(7,3),
	(8,2),
	(9,4),
	(10,4),
	(11,4),
	(12,3),
	(1,2)
;

INSERT INTO CART(LOCATION, MENU_ID, AVAILABLE)
VALUES 	("47.6828977,-122.3917439", 1, 'Y'),
		("47.6150395,-122.347419", 2, 'Y'),
        ("47.623098, -122.320866", 3, 'Y'),
        ("47.701554, -122.335143", 4, 'N'),
        ("47.629567, -122.359785", 5, 'N')
;


INSERT INTO CART_ORDERS(ORDER_ID, CART_ID, COMPLETE)
VALUES 	
	(1, 3, "Y"), 
	(2, 1, "N"), 
	(3, 1, "Y"), 
	(4, 3, "Y"), 
	(5, 2, "N"), 
	(6, 2, "Y"), 
	(7, 1, "Y"), 
	(8, 3, "N"), 
	(9, 1, "Y"), 
	(10, 3, "N"), 
	(11, 1, "Y"), 
	(12, 2, "N")
;

INSERT INTO ORDERS_ITEMS(ORDER_ID, ITEM_ID, QUANTITY)
VALUES 
	(1, 2, 2), 
	(2, 6, 1), 
	(3, 6, 1), 
	(4, 8, 1), 
	(5, 5, 1), 
	(5, 6, 1), 
	(6, 1, 1), 
	(6, 8, 2), 
	(7, 7, 1), 
	(7, 3, 2), 
	(8, 4, 1), 
	(9, 2, 1), 
	(9, 8, 1), 
	(10, 5, 1), 
	(11, 1, 1), 
	(12, 8, 2), 
	(12, 9, 1)
;

INSERT INTO USERS_CART(USER_ID, CART_ID)
VALUES 	(5, 1),
		(6, 2),
		(8, 3),
        (9, 4),
        (10, 5)
;

