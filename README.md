<h1 align="center" id="title">Chatapp-Socketio</h1>

## Description

  Chat app allows users to do real time communication, send and receive messages with each othe using web sockets.

## Technologies 

Technologies  and Tools

  * Node.js
  * express
  * MongoDB
  * NPM
  * JWT
  * cookie-parser
  * bcryptjs
  * socket.io
  * cors
  * nodemon
  * dotenv
  * multer
  * express-async-handler
  * express-validator
  * morgan

## **Key Features:** 

- **User Authentication:** Secure user authentication endpoints using JWT tokens.
- **User Profile:** Fetch and update user profile, including profile image, and contact information.
- **Upload Image:** Upload and manage image to be included in user profiles.
- **Messages Management:** Create and get messages.

## Installation

1. **Clone the Repository:**
   Use the `git clone` command to clone the GitHub repository to your local machine.
   ```bash
   git clone https://github.com/Yasmine007Mohammed/Chatapp-Socketio.git
  ```

 2. **Initialize a Package.json File (if not already done):**
   If your project doesn't already have a `package.json` file, you can create one by running:
   ```bash
   npm init
  ```

3. **Install depends**
   ```bash
      npm install
  ```

4. **Run Application**
  ```bash
     npm start
  ```

## Project Structure
 ```powershell

.
├── config/
|    └── database.js
├── controllers/
|   ├── authController.js
|   ├── messageController.js
|   ├── uploadImageController.js
|   ├── userController.js
├── middlewares/
|   ├── authMiddleware.js
|   ├── errorMiddleware.js
|   ├── uploadImageMiddleware.js
|   └── validatorMiddleware.js
├── models/
|   ├── conversationModel.js
|   ├── messageModel.js
|   ├── userModel.js
├── routes/
|   ├── authRoute.js
|   ├── messageRoute.js
|   ├── userRoute.js
├── socketio/
|   ├── socket.js
├── utils/
|   ├── validators/
|   |   ├── userValidator.js
|   ├── apiError.js
|   ├── createToken.js
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```

 ## **Postman Documentation Link**
  
  URL = [https://documenter.getpostman.com/view/19502055/2sAYk8u2sD]

































