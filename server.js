const express = require('express');
const app = express();
 
app.get('/', (req, res) => {
  res.send('<h1> Hello, World! </h1>');
});
 
app.listen(3010, () => {
  console.log(`Server is listening at http://localhost:3010`);
});