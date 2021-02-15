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
        ("This is the cart located in Capitol Hill"),
        ("This is the cart located in North Gate")
;

INSERT INTO USERS (EMAIL, PASSWORD, FIRST_NAME, LAST_NAME, PERMISSION)
VALUES 	("user1@website.com", "pass1", "user1", "user1_last", "CUSTOMER"),
		("user2@website.com", "pass1", "user2", "user2_last", "CUSTOMER"),
        ("vendor1@website.com", "vpass1", "vendor1", "vendor1_last", "VENDOR"),
        ("vendor2@website.com", "vpass2", "vendor2", "vendor2_last", "VENDOR"),
        ("admin@website.com", "apass1", "admin1", "admin_last", "ADMIN"),
        ("angrychef@gmail.com", "itsraw", "Gordan", "Ramsey", "VENDOR"),
        ("ilikedonuts@simpson.com", "yumyum", "Homer", "Simpson", "VENDOR")
;

INSERT INTO ITEMS_MENU(MENU_ID, ITEM_ID, AVAILABLE)
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
        (3, 6, "Y"),
        (4, 1, "Y"),
		(4, 2, "Y"),
        (4, 3, "Y"),
        (4, 4, "Y"),
        (4, 5, "N"),
        (4, 6, "Y"),
        (4, 7, "N")        
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
VALUES 	("2021-01-02 20:00:10"),
		("2021-01-02 19:13:11"),
        ("2021-01-02 12:41:18")
;

INSERT INTO ORDER_USERS(USER_ID, ORDER_ID)
VALUES 	(1,2),
		(2,1),
        (2,3)
;

INSERT INTO CART(LOCATION, MENU_ID, AVAILABLE)
VALUES 	("47.6828977,-122.3917439", 1, "Y"),
		("47.6150395,-122.347419", 2, "N"),
        ("47.6124525,-122.3190042", 3, "Y"),
        ("47.6345345,-122.5423423", 4, "Y")
;


INSERT INTO CART_ORDERS(CART_ID, ORDER_ID, COMPLETE)
VALUES 	(1, 1, "N"),
		(2, 2, "N"),
        (3, 3, "N")
;

INSERT INTO ORDERS_ITEMS(ORDER_ID, ITEM_ID, QUANTITY)
VALUES 	(1, 1, 1),
		(1, 4, 1),
		(2, 2, 2),
        (3, 3, 1)
;

INSERT INTO USERS_CART(USER_ID, CART_ID)
VALUES 	(3, 1),
		(7, 2),
		(4, 3),
        (6, 4)
;

-- show menu's and available items
SELECT * FROM MENU
JOIN ITEMS_MENU USING (MENU_ID)
JOIN ITEMS USING (ITEM_ID)
ORDER BY MENU_ID;

-- show history of user actions
SELECT * FROM USERS
JOIN USER_LOGS USING (USER_ID)
JOIN LOG USING (LOG_ITEM_ID);

-- show items odrdered by users
select * FROM USERS
JOIN ORDER_USERS USING (USER_ID)
JOIN ORDERS USING (ORDER_ID)
JOIN ORDERS_ITEMS USING (ORDER_ID)
JOIN ITEMS USING (ITEM_ID)
ORDER BY USER_ID
;

select * from users;
select * from cart;

-- get the menu information associated with a vendor 
SELECT User_ID, First_Name, Last_Name, Cart_ID, Menu_ID, Item_ID, Item_Name, 
		Item_Category, Price, Items_Menu.Available, Items.Description
FROM Users
	JOIN Users_Cart USING (user_ID)
	JOIN Cart USING (cart_ID)
	JOIN Menu USING (menu_ID)
	JOIN Items_Menu USING (menu_ID)
	JOIN Items USING (item_ID)
WHERE User_ID = 6;