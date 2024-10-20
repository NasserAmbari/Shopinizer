# Shopinizer

Shopinizer is an application built using TypeScript, designed to manage products and categories with ordering features. This application has a complete API interface with Swagger documentation, allowing users to easily manage data.

## Key Features

- **CRUD for Orders, Products, and Categories**: Add, edit, delete, and retrieve lists of products and categories.
- **Order Management**: Manage orders including items, status, and total prices.
- **User Authentication**: Users can register and log in to access specific features.
- **API Documentation with Swagger**: Utilizing Swagger to document and test the API.

## Technologies Used

- **TypeScript**: For safer and more structured application development.
- **Express**: As a web framework for building the API server.
- **MongoDB**: As the database for storing data.
- **Mongoose**: As an ODM for MongoDB.
- **Swagger**: For API documentation.
- **Cloudinary**: API for uploading images.
- **JWS**: Used for authentication with tokens.
- **Vercel**: As the deployment platform.

## Deployment

The project is currently deployed and available online. You can access the live application at:

```bash
https://shopinizer.vercel.app/
```

### Running Locally

**You can clone this project on your local machine 

```bash
https://github.com/NasserAmbari/Shopinizer.git
```

**Install the project using NPM**

```bash
npm install
```
**Set Up Environment Variables**

Create a `.env` file in the root of the project and add the required environment variables. You can use the provided `.env.example` as a reference:

```bash
cp .env.example .env
```

**Try to Run the Application**

Start the server:
```bashgit 
npm run dev
```

## API Documentation

API Documentation written in swagger.js you can check all in 

**Base URL**
```bash
https://shopinizer.vercel.app/documentation/
```
