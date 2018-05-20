var inquirer = require("inquirer");
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
    .prompt([{
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
          var purchase_id = inquirerResponse.item_id;
          var item_id = purchase_id - 1;
          var purchaseAmount = inquirerResponse.amount;
          var availAmount = res[item_id].productStock;
          if (purchaseAmount > availAmount) {
            console.log("There is currently nout enough stock to fill your order")
          } else {
            console.log("Thank you for your purchase!");
            var updatedAmount = availAmount - purchaseAmount;

            connection.query("UPDATE products SET ? WHERE ?", [{
              productStock: updatedAmount
            }, {
              item_id: purchase_id
            }], function (err, res) {
              if (err) throw err;
            });

            connection.query("SELECT * FROM products", function (err, res) {
              var calcPrice = res[item_id].productPrice * purchaseAmount;
              console.log("\nYour total is today is: $" + calcPrice + "usd");
              process.exit();
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
    head: ["                          ----- Welcome to Bamazon -----".white],
    colWidths: [84]
  });
  console.log(table.toString());
};