var inquirer = require("inquirer");
var table = require("cli-table");
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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
    console.log("-- ----------------------------- --");
    console.log("---- -----    Bamazon    ----- ----");
    console.log("------ --------------------- ------");
      // formatting for npm: cli-table
          var table = new Table({
              head: ["ItemID", "ProductName", "Department" ,"MSRP(usd)", "Inventory"],
              colWidths: [10, 40, 10, 10, 10]
          });
      for (var i=0; i < res.length; i++) {
          var productArray = [res[i].item_id, res[i].productName, res[i].productPrice, res[i].productDepartment, res[i].productStock];
          table.push(productArray);
      }
      console.log(table.toString());
     // TODO:  productPurchuse();    
      });
};