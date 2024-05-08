# Basic Server with User Sign-up, Login, and Logging Middleware

This project aims to create a basic server using Node.js and Express that includes functionality for user sign-up, user login, and logging middleware. User information will be stored securely with hashed passwords using the bcrypt library, and session management will be implemented using the express-session middleware.

## Installation

To install the required npm packages, run the following command:

```bash
npm install bcrypt express express-session
```

## Usage

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run the server using the following command:

```bash
node server.js
```

4. Access the server endpoints using a web browser or an API testing tool like Postman.

## Endpoints

### User Sign-up

- **Endpoint:** `/signup`
- **Method:** POST
- **Body Parameters:**
  - `username`: The desired username for the new user.
  - `password`: The desired password for the new user.
- **Response:**
  - `200 OK`: User successfully signed up.
  - `400 Bad Request`: Invalid request body.

### User Login

- **Endpoint:** `/login`
- **Method:** POST
- **Body Parameters:**
  - `username`: The username of the user trying to log in.
  - `password`: The password of the user trying to log in.
- **Response:**
  - `200 OK`: User successfully logged in.
  - `401 Unauthorized`: Incorrect username or password.

### Logging Middleware

The logging middleware logs each incoming request to the server along with relevant information such as the request method, endpoint, and timestamp.

## Dependencies

- **bcrypt:** A password hashing library used to securely store user passwords.
- **express:** A web application framework for Node.js used to create the server.
- **express-session:** A session middleware for Express used for session management.

## Notes

- If there are issues with installing the `bcrypt` module due to C++ bindings, consider using `bcrypt.js`, which has the same API but is written in 100% JavaScript.

## Author

- Priyanka Zala

## License

This project is licensed under the MIT License