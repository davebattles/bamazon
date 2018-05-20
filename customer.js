var inquirer = require("inquirer");
var table = require("cli-table");
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors");
var ora = require("ora");
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
    // TODO:  productPurchase();    
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
        type: "confirm",
        message: "Are you sure?",
        name: "confirm",
        default: true
      }
    ])
    .then(function (inquirerResponse) {
      if (inquirerResponse.confirm) {
        console.log("Much todo");
        //TODO: Check if item is in stock

        // console.log("\nWelcome " + inquirerResponse.username);
        // console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
        // typeOfProductIn = inquirerResponse.typeOfProduct;
        // nameOfProductIn = inquirerResponse.nameOfProduct;
        // currentBidOfProductIn = inquirerResponse.currentBidOfProduct;
        // addProductInquirer(typeOfProductIn, nameOfProductIn, currentBidOfProductIn);
      } else {
        queryAllProductsCLI();
      }

    });
}

function loading() {
  var spinner = ora('Processing').start();
  setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';
  }, 1000);
}

function title() {
  var table = new Table({
    head: ["                          ----- Welcome to Bamazon -----".green],
    colWidths: [84]
  });
  console.log(table.toString());
};