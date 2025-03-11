const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const apiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const connectDB = require('./config/database');
dotenv.config();

const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const conversationRoute = require('./routes/conversationRoute');
const messageRoute = require('./routes/messageRoute');
const { app, server, io  } = require('./socketio/socket');

connectDB();

// const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/message', messageRoute);

app.all('*', (req,res,next) =>{
    next(new apiError(`can't find this route ${req.originalUrl}`, 400));
});

app.use(globalError);

const PORT = process.env.PORT || 8001

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});