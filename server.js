const express = require('express');
const app = express();

app.get('/', (req, res, next)=>{
  res.send("hello there");
})





const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  `Listening on port ${ port }`
})
