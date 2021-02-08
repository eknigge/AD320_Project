USE mydb;


INSERT INTO ITEMS (ITEM_NAME, ITEM_CATEGORY, PRICE)
VALUES 	("Seattle Dog", "Food", 499),
		("Plain Hot Dog", "Food", 349),
        ("HOT HOT HOT Dog", "Food", 699),
        ("Soda", "Drinks", 199),
        ("Beer", "Drinks", 399),
        ("Bacon Bits", "Side", 99),
        ("Cream Cheese", "Side", 99)
;

INSERT INTO MENU(DESCRIPTION)
VALUES 	("This is the cart located in Ballard"),
		("This is the cart located in Belltown"),
        ("This is the cart located in Capitol Hill")
;

INSERT INTO USERS (EMAIL, PASSWORD, FIRST_NAME, LAST_NAME, PERMISSION)
VALUES 	("user1@website.com", "pass1", "user1", "user1_last", "CUSTOMER"),
		("user2@website.com", "pass1", "user2", "user2_last", "CUSTOMER"),
        ("vendor1@website.com", "vpass1", "vendor1", "vendor1_last", "VENDOR"),
        ("vendor2@website.com", "vpass2", "vendor2", "vendor2_last", "VENDOR"),
        ("admin@website.com", "apass1", "admin1", "admin_last", "ADMIN")
;

INSERT INTO ITEMS_MENU(MENU_ITEM_ID, ITEM_ID, AVAILABLE)
VALUES 	(1, 1, "Y"),
		(1, 2, "Y"),
        (1, 3, "N"),
        (1, 4, "Y"),
        (1, 6, "N"),
        (2, 1, "N"),
		(2, 2, "Y"),
        (2, 3, "Y"),
        (2, 4, "Y"),
        (2, 6, "Y"),
        (3, 1, "Y"),
		(3, 2, "Y"),
        (3, 3, "Y"),
        (3, 4, "Y"),
        (3, 6, "Y")
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

INSERT INTO mydb.ORDER(ITEM_ID, QUANTITY)
VALUES 	(1,1),
		(1,1),
        (1,4),
        (1,2)
;

INSERT INTO ORDER_USERS(USER_ID, ORDER_ID)
VALUES 	(1,4),
		(2,1),
        (2,3)
;

INSERT INTO CART(LOCATION, MENU_ID)
VALUES 	("47.6828977,-122.3917439", 1)
		("47.6150395,-122.347419", 2),
        ("47.6124525,-122.3190042", 3)
;

select * from cart;
select * from menu;
