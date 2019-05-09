const Sequelize = require('sequelize');
const sequelize = require('./database.js');

let User = sequelize.define('User', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    address_line_1: Sequelize.STRING,
    address_line_2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.INTEGER,
    phone_number: Sequelize.INTEGER,
    credit_card: Sequelize.INTEGER,
    expiry_date: Sequelize.INTEGER,
    cvv: Sequelize.INTEGER,
    billing_zip: Sequelize.INTEGER 
  }
);

User.sync();

module.exports = User;