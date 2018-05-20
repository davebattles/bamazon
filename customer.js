var inquirer = require("inquirer");
var table = require("cli-table");
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors");

// Argv vars init


command = process.argv[2];
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});
connection.connect(function (err) {
  if (err) throw err;
  console.clear();
  console.log("Connected as id: " + connection.threadId);
  queryAllProductsCLI();
});


var queryAllProductsCLI = function () {
  connection.query('SELECT * FROM products', function (err, res) {
    console.clear();
    // formatting for npm: cli-table
    title();
    var table = new Table({
      head: ["ItemID", "ProductName", "Department", "MSRP(usd)", "Inventory"],
      colWidths: [10, 40, 10, 10, 10]
    });
    for (var i = 0; i < res.length; i++) {
      var productArray = [res[i].item_id, res[i].productName, res[i].productDepartment, res[i].productPrice, res[i].productStock];
      table.push(productArray);
    }
    console.log(table.toString());
    productPurchase();
  });
};

function productPurchase() {

  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "What is the ItemID of the Product you want to purchase",
        name: "item_id"
      },
      {
        type: "input",
        message: "How many would you like to purchase?",
        name: "amount"
      },
      {
        type: "confirm",
        message: "Are you sure?",
        name: "confirm",
        default: true
      }
    ])
    .then(function (inquirerResponse) {
      if (inquirerResponse.confirm) {
      connection.query("SELECT * from products", function (err, res) {
       
        var purchase_id = inquirerResponse.item_id; //id number the customer selected
        // var itemID = id - 1; //to match user choice with db item id
        var purchaseAmount = inquirerResponse.amount; //number of units the customer selected
        var availAmount = res[purchase_id].productStock;
        if (purchaseAmount > availAmount) {
          console.log("There is currently nout enough stock to fill your order")
        } else {
          console.log("Thank you for your purchase!");
          var updatedAmount = availAmount - purchaseAmount;

          connection.query("UPDATE products SET ? WHERE ?", [{
            productStock: updatedAmount
          }, {
            item_id: purchase_id
          }], function (err, res) {});

          connection.query("SELECT * FROM products", function (err, res) {
            var calcPrice = res[purchase_id].price * purchaseAmount;
            console.log("\nYour toal is today is: " + calcPrice);
          });
        }
      });
      //inquirer confirm ending
    } else {
      queryAllProductsCLI();
    }
    });

}


function title() {
  var table = new Table({
    head: ["                          ----- Welcome to Bamazon -----".green],
    colWidths: [84]
  });
  console.log(table.toString());
};