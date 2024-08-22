const express = require('express');

const cors=require("cors")
const app = express();
const PORT = 3010;

app.use(cors())

app.use("/",(req,res)=>{
    res.send(`<h1>Home Page Node</h1>`)
})

// Start the server
app.listen(PORT, () => {
  // console.log(`Server is running on http://localhost:${PORT}`); // Commented out for production
});