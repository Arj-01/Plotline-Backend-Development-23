# My Awesome E-Commerce Application - Plotline Backend Project - 23

Welcome to My Awesome E-Commerce Application! This is a powerful and secure e-commerce platform that allows users to browse and purchase products and services online. The application is built with Node.js, Express.js, and MongoDB, providing a seamless and enjoyable shopping experience for customers.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contribution](#contribution)

## Features

- User Registration and Login: Users can create accounts and log in securely with hashed passwords & logout functionality using JWT token as a cookie for efficient working.
- User Authentication: JWT-based authentication for protected routes.
- Administrator Role: Special privileges for administrators to manage products and services.
- Product and Service Management: Administrators can add new products and services to the platform.
- Shopping Cart: Users can add products and services to their shopping cart.
- Tax-Calculator functionality: adding a separate file to impose tax based on the price of product and services individually. 
- Cart Management: Users can update quantities, remove items, or clear the cart entirely.
- Checkout and Order Confirmation: Users can proceed to checkout that will generate the Total-Bill and confirm their orders.
- Viewing Orders made by the customers: Administration has the previleges to check all the orders that is being made.


## Features Planning to update 

- Product and Service Search: A search functionality allows users to find specific items quickly.
- Order History: Users can view their order history, providing an overview of past purchases.
- User Reviews and Ratings: Customers can leave reviews and ratings for products and services.
- User Profile: Users can update their profiles and manage personal information.

## Getting Started

To get started with the application, follow these steps:

## Installation

1. Clone the repository
2. Install dependencies: `npm install`


## Usage

1. Set up your MongoDB database and JWT key add your connection string & key to `.env` file for security purposes.
2. Create a `.env` file in the root directory with the following environment variables:
Note: Replace `your-mongodb-connection-string` with your MongoDB URI and `your-secret-key-for-jwt` with a hashed secret key for JWT token.
3. Start the server: `npm start`
4. Access the application at `http://localhost:8001`
5. PORT I am using is 8001 for testing purposes.

## API Endpoints

The following API endpoints are available:

- GET `/` will fetch all the items (Products and Services) added by the Admin
- POST `/users/register` will register a user if not already otherwise will give an error if
already registered (Use email, password, and Boolean isAdmin property to register)
- POST `/users/login` will log in the user and create and JWT Token and store this Token as a 
cookie for logout purposes (Use email, password to log in & and all the unauthorized access 
is taken care of)
- GET `/users/logout` will log out the user and delete the generated Cookie of the JWT Token
- GET `/carts` will fetch the cart of the user
- POST `/carts/product/product ID` will add the product to the cart (send the quantity of the 
product from the body itself)
- POST `/carts/service/service ID` will add service to the cart (send the quantity of the service
from the body itself)
- DELETE `/carts/product/product ID` will delete the product from the cart
- DELETE `/carts/service/service ID` will delete service from the cart
- DELETE `/carts` will clear the cart
- POST `/carts/checkout` will check out the cart and generate the Total Bill 
- POST `/carts/confirmOrder` will make the order confirm and add this order to the total 
orders that will be visible to the Admin only
- GET `/orders` will fetch all the orders made by the users, only Admin has the access to this 
Endpoint
- POST `/products/add` Admin will be able to add products to the product collection of the 
database (send product name and the associated price)
- POST `/services/add` Admin will be able to add services to the service collection of the 
database (send the service name and the associated price)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt.js
- Crypto
- Cookie-Parser
- JSON Web Tokens (JWT)
- dotenv
- Nodemon (for development)
- Postman (for API testing)

## Contributing

Contributions are welcome! If you find any bugs or have ideas for new features, please open an issue or submit a pull request.
Or mail me at aarjitgiri@gmail.com for the new feature discussion.
