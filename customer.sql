DROP DATABASE IF EXISTS bamazon	;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (   
item_id INT NOT NULL AUTO_INCREMENT,
productName VARCHAR(60) NOT NULL,
productDepartment VARCHAR(20) NOT NULL,
productPrice DECIMAL(6,2) NOT NULL,
productStock int null default 1,
PRIMARY KEY(item_id)
);

INSERT INTO products (productName, productDepartment, productPrice, productStock)
Values ("Monster Energy", "produce", "2.25", 100);

INSERT INTO products (productName, productDepartment, productPrice, productStock)
Values ("Ikea Hooded Sweater", "clothing", "34.99", 10);

INSERT INTO products (productName, productDepartment, productPrice, productStock)
Values ("Semiconductors", "electronics", "60.00", 100);

INSERT INTO products (productName, productDepartment, productPrice, productStock)
Values ("Oven Light", "electronics", "5.99", 15);

INSERT INTO products (productName, productDepartment, productPrice, productStock)
Values ("Nuka-Cola", "produce", "2.75", 100);

INSERT INTO products (productName, productDepartment, productPrice, productStock)
Values ("Fiber optics", "electronics", "19.99", 5);

INSERT INTO products (productName, productDepartment, productPrice, productStock)
Values ("Ducky RGB Mechanical Keyboard", "electonics", "120.99", 50);

INSERT INTO products (productName, productDepartment, productPrice, productStock)
Values ("Fiberglass", "hardware", "14.99", 50);

INSERT INTO products (productName, productDepartment, productPrice, productStock)
Values ("Baseball Cap", "clothing", "25.00", 50);

INSERT INTO products (productName, productDepartment, productPrice, productStock)
Values ("Adhesive", "produce", "1.99", 2);

INSERT INTO products (productName, productDepartment, productPrice, productStock)
Values ("Nails", "hardware", "4.99", 2);

INSERT INTO products (productName, productDepartment, productPrice, productStock)
Values ("Aluminum", "hardware", "3.99", 2);