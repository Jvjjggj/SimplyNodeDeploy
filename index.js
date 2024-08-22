// Import packages
const express = require("express");
const home = require("./routes/home");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/home", home);

app.use("/",(req,res)=>{
    res.send(`<h1>Home Page</h1>`)
})

// connection
const port = 3010;
app.listen(port, () => console.log(`http://localhost:${port}`));