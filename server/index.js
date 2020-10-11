var express = require('express')
var app = express();

let users = {};

app.get('/:occupation/:city/', (req,res)=>{
  // console.log(req.params)
  // console.log(req.query)
  // mongo.find({...req.params,...req.query})
  let {occupation,city} = req.params
  if(!(occupation in users)){
    users[occupation] = {}
  }
  if(!(city in users[occupation])){
    users[occupation][city] = []
  }
  users[occupation][city].push(req.query)
  

  res.send(`Hi you visited: 
  <ul>
    <li>protocol: ${req.protocol}</li>
    <li>host: ${req.get('host')}</li>
    <li>url: ${req.originalUrl}</li>
  </ul>
  ${JSON.stringify(users)}
  `)
})

// app.post()

app.listen(3333, ()=>console.log('hello'))