require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require("cors");
const schema = require("./schema/schema");
const colors = require('colors');
const port = process.env.PORT;
const connectDB = require('./config/db');


const app = express();

app.use(cors());

//Connect to database
connectDB();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`Server running on port ${port}`.blue.bold));