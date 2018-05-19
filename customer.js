var inquirer = require("inquirer");
var table = require("cli-table");
var mysql = require("mysql");


const table = new Table();

table.push(
    { 'Some key': 'Some value' }
  , { 'Another key': 'Another value' }
);

console.log(table.toString());