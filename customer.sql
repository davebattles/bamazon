DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id integer(11) AUTO_INCREMENT not null,
  productName varchar(40) not null,
  productDepartment varchar(20) not null,
  productPrice decimal(7,2) not null,
  productStock integer(11) not null,
  PRIMARY KEY (item_id)
);

insert into products (productName, productDepartment, productPrice, productStock)
values ("Monster Energy", "produce", 2.25, 100);

insert into products (productName, productDepartment, productPrice, productStock)
values ("Bananas", "produce", 0.99, 50);