
# Ecommerce API Documentation

This document outlines the API endpoints available for our Ecommerce website.

Base URL

https://ecommercev2-gtu9.onrender.com/api

## User Endpoints 

- POST /user/register

Description: Registers a new user.

Request Body:

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "customer" // 'admin', 'customer'
}

Response:

{
  "message": "User registered successfully",
  "token": "your_jwt_token"
}

- POST /user/login

Description: Authenticates an existing user.

Request Body:

{
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "admin"
}


Response:

{
  "message": "Login successful",
  "token": "your_jwt_token"
}

- POST /user/logout

Description: Logs out the current user.

Request Body:

None

Response:

{
  "message": "Logout successful"
}

- GET /user/login

Description: Retrieves the current user's information.

Request Body:

None

Response:

{
  "user": {
    "id": "user_id",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "role": "customer" 
  }
}



## Product Endpoints

- POST /product

Description: Creates a new product.

Request Body:

{
  "name": "Product Name",
  "brand": "Brand Name",
  "category": "Category",
  "price": 19.99,
  "description": "Product description",
  "inStock": true,
  "inventory": 100
}


Response:

{
  "message": "Product created successfully",
  "product": {
    "id": "product_id",
    // ...other product details
  }
}

- GET /product

Description: Retrieves a list of all products.

Request Body:

None

Response:

[
  {
    "id": "product_id",
    // ...product details
  },
  // ...other products
]

- GET /product/:id

Description: Retrieves a specific product by ID.

Request Parameters:

id: Product ID

Response:

{
  "id": "product_id",
  // ...product details
}

- DELETE /product/:id

Description: Deletes a specific product by ID.

Request Parameters:

id: Product ID

Response:

{
  "message": "Product deleted successfully"
}

- POST /product/addToWishlist/:productID

Description: Adds a product to the user's wishlist.

Request Parameters:

productID: Product ID

Response:

{
  "message": "Product added to wishlist"
}

- POST /product/rating

Description: Submits a rating and comment for a product.

Request Body:

{
  "starRating": 4,
  "comment": "Great product!",
  "productID": "product_id"
}


Response:

{
  "message": "Rating submitted successfully"
}

## Cart Endpoints
- POST /cart/add

Description: Adds products to the user's cart.

Request Body:

{
  "cart": [
    {
      "productID": "product_id",
      "quantity": 2
    },
    // ...other products
  ]
}


Response:

{
  "message": "Products added to cart"
}

##Coupon Endpoints

- POST /coupon/create

Description: Creates a new coupon.

Request Body:

{
  "code": "SUMMER10",
  "discount": 10,
  "isPercentage": true,
  "expiryDate": "2024-12-31",
  "isActive": true,
  "applicableProducts": ["product_id1", "product_id2"],
  "minimumPurchaseAmount": 50,
  "usageLimit": 10,
  "usedCount": 0
}


Response:

{
  "message": "Coupon created successfully",
  "coupon": {
    "id": "coupon_id",
    // ...other coupon details
  }
}

- POST /coupon/activate

Description: Activates a coupon.

Request Body:

{
  "couponID": "coupon_id"
}


Response:

{
  "message": "Coupon activated successfully"
}



