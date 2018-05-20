var inquirer = require("inquirer");
var table = require("cli-table");
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors");
var ora = require("ora");
var chalkAnimation = require("chalk-animation");

// Argv vars init
command = process.argv[2];


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.clear();
  console.log("Connected as id: " + connection.threadId);
  queryAllProductsCLI();
});



function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("-- ----------------------------- --");
    console.log("---- -----    Bamazon    ----- ----");
    console.log("------ --------------------- ------");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].productName+ " | Department: " + res[i].productDepartment + " |  MSRP: " + res[i].productPrice + " | Stock:" + res[i].productStock);
    }

  });
  connection.end();
}




var queryAllProductsCLI = function() {
  connection.query('SELECT * FROM products', function(err, res) {
    chalkAnimation.rainbow('Lorem ipsum dolor sit amet');
      // formatting for npm: cli-table
          
          var table = new Table({
              head: ["ItemID", "ProductName", "Department" ,"MSRP(usd)", "Inventory"],
              colWidths: [10, 40, 10, 10, 10]
          });
      for (var i=0; i < res.length; i++) {
          var productArray = [res[i].item_id, res[i].productName, res[i].productDepartment, res[i].productPrice, res[i].productStock];
          table.push(productArray);
      }
      console.log(table.toString());
     // TODO:  productPurchase();    
      });
};


function productPurchase () {
  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "list",
      message: "What is the ItemID of the Product you want to purchase",
      choices: ["item","jobs","service"],
      name: "typeOfProduct"
    },
    {
      type: "input",
      message: "What is the name of the product?",
      name: "nameOfProduct"
    },
    {
      type: "input",
      message: "What is your starting bid? (default 1)",
      name: "currentBidOfProduct"
    }

  ])
  .then(function(inquirerResponse){
    typeOfProductIn = inquirerResponse.typeOfProduct;
    nameOfProductIn = inquirerResponse.nameOfProduct;
    currentBidOfProductIn = inquirerResponse.currentBidOfProduct;
    addProductInquirer(typeOfProductIn, nameOfProductIn, currentBidOfProductIn);
  }); 
}