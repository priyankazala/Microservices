// Setup server, session and middleware here.

const express = require("express");
const app = express();
const static = express.static(__dirname + "/views");

const session = require('express-session');
const cookieParser = require('cookie-parser');

const configRoutes = require("./routes");
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(express.json());
app.use(
	session({
        name: 'AuthCookie',
        secret: 'Secret string',
        resave: false,
        saveUninitialized: true,
        cookie: { 
            path: '/',
            _expires: null,
            originalMaxAge: null,
            httpOnly: true },
            loggedIn: true,
            username:true
            
    },
    )
);

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
 