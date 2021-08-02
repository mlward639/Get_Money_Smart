# Project 2

<img src='https://img.shields.io/badge/License-MIT-yellow.svg'>

## Description

Educational online banking application that allows students to manage their virtual finances including bank accounts and credit cards. Features include ability to open new account, transfer money between bank accounts, and make payment on credit card. Tooltips and educational modals with descriptive comments are added to assist students in learning about finance.

## User Story

AS A teacher of basic financial management
I WANT TO have an instructional banking application
SO THAT I can show students how to navigate an online banking platform in an instructional manner

## Acceptance criteria:

- GIVEN a bank site
- WHEN I visit the site for the first time
- THEN I am presented with the homepage, which includes login and sign up options
- WHEN I choose to sign up
- THEN I am prompted to create a username and password and enter first name and last name
- WHEN I click on the sign-up button
- THEN my user credentials are saved and I am logged into the site
- WHEN I revisit the site at a later time and choose to sign in
- THEN I am prompted to enter my username and password
- WHEN I am logged into the site,
- THEN I am taken to my dashboard where I can view my accounts with their balances, as well as my credit card with its balance- WHEN I click on the Open New Account option in the navigation
- THEN I am taken to the Open New Account page and presented with a form to enter the current balance and submit
- WHEN I click on Deposit Money option in the navigation
- THEN I am taken to a form where I can choose which account and amount to deposit
- WHEN I click on Transfer Money option in the navigation
- THEN I am taken to a form where I can choose which account to withdraw money from and which account or loan to transfer that money
- WHEN I click on Charge Card option in the Card section of dashboard
- THEN I am taken to a form where I can choose an amount to spend of my credit card and add a reason
- WHEN I click on the Make Payment option for my credit card
- THEN I am taken to the transfer page to make a payment on my card
- WHEN I click on the logout option in the navigation
- THEN I am signed out of the site
- WHEN I am idle on the site for more than a set time
- THEN I am logged out

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Contribution Guidelines](#contribution-guidelines)
- [Test Instructions](#test-instructions)
- [License](#license)

## Installation

- Use package.json to download dependencies. In terminal, type:

        npm install

- To begin application, type the following in the terminal:
  
  npm start

## Usage

- Homepage: takes user to homepage to sign up/login
- Dashboard: user's homepage once signed in. displays user's accounts and loans with their balances
  - Navigation links:
    - Deposit Money
    - Transfer Money
    - Make payment on credit card
    - Create charges on credit card
    - Logoff

## Credits

Libraries:

- Node.js and Express.js: RESTful API
- Handlebar.js: template engine (express-handlebars package to implement Handlebar.js)
- MySQL2 and Sequelize ORM: DB
- Foundation: CSS framework
- Bootstrap: CSS framework
- Hatchful: logo
- Lucid: wireframe
- Bcrypt: hash password
- Dotenv: store sensitive info using environmental variables
- UUID: create unique acct number
- Express-session and connect-session-sequelize: authentication
- css-tooltip: tooltips
- Heroku: deploy
- <a href='https://youth.handsonbanking.org/grades/middle-school-course/'>Hands on Banking</a>: educational banking information
- <a href='https://www.bankrate.com/'>Bankrate</a>: check image and credit card information

## Contribution Guidelines

Utilize <a href= "https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md">The Contributor Covenant</a> as reference for appropriate contribution guidelines.

## Test Instructions

n/a

## License

License type: MIT

    "Copyright 2021 <COPYRIGHT HOLDER>

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE."

Source for licensing information: <a href="https://opensource.org/licenses/MIT">Link to MIT license information</a>

## Screenshots

Screenshot of

<img src='' alt = 'Screenshot of '>

## URLs

<a href="https://github.com/mlward639/Project2">Link to GitHub Repository</a>
----------update link if name changes

<a href="https://polar-river-76787.herokuapp.com/">Link to Deployed Heroku Site</a>
