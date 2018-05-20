var inquirer = require("inquirer");
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors");
let $console = require('Console');
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

function title() {
  var table = new Table({
    head: ["                          -----    Manager View    -----                          ".red.bgWhite],
    colWidths: [84]
  });
  console.log(table.toString());
};
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
    managerConsole();
  });
};

function managerConsole() {
  inquirer
    .prompt([{
      type: "list",
      message: "What would you like to do?",
      choices: ["View Low Inventory", "Restock Existing Inventory", "Add New Product"],
      name: "query"
    }, ])
    .then(function (inquirerResponse) {
      if (inquirerResponse.query == "View Low Inventory") {
        console.log(inquirerResponse.query);
        lowInventory();
      }
      if (inquirerResponse.query == "Restock Existing Inventory") {
        console.log(inquirerResponse.query);
      }
      if (inquirerResponse.query == "Add New Product") {
        console.log(inquirerResponse.query);
      }
    });
}

function lowInventory() {
  title();
  connection.query("SELECT * from products", function (err, res) {
    var table = new Table({
      head: ["ItemID", "ProductName", "Department", "MSRP(usd)", "Inventory"],
      colWidths: [10, 40, 10, 10, 10]
    });
    for (var i = 0; i < res.length; i++) {
      if (res[i].productStock < 10) {
        var productArray = [res[i].item_id, res[i].productName, res[i].productDepartment, res[i].productPrice, res[i].productStock];
        table.push(productArray);
      }
    }
    console.log(table.toString());
    managerConsole();
  });
}

function addNewProduct(){
  title();
  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "list",
      message: "What is the type of the product you wish to add?",
      choices: ["produce", "electonics", "clothing", "hardware"],
      name: "productDepartment"
    },
    {
      type: "input",
      message: "What is the name of the product?",
      name: "productName"
    },
    {
      type: "input",
      message: "How many do you have in stock?",
      name: "productStock"
    },
    {
      type: "input",
      message: "What is the price of the Item?",
      name: "productPrice"
    },
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }

  ])
  .then(function (inquirerResponse) {
    if( inquirerResponse.confirm == true){
       addProductInquirer(inquirerResponse.productName, inquirerResponse.productDepartment, inquirerResponse.productPrice, inquirerResponse.productStock);
      } else {
        managerConsole();
      }
  });

}
function addProductInquirer( productNameInput, productDepartmentInput, productPriceInput, productStockInput) {
  
  var query = connection.query(
    "INSERT INTO products SET ?", {
      typeOfProduct: typeOfProductInput,
      nameOfProduct: nameOfProductInput,
      currentBidOfProduct: currentBidOfProductInput
    },
    function (err, res) {
      console.clear();
      queryAllProducts();
    }
  );
  connection.end();
}