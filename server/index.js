var express = require('express')
var app = express();
var fs = require('fs');
let data = require('./output.json');

app.use(express.json())




// app.get('/:param',(req,res)=>{
//   res.send('Hi, nice to meet your on our resorse '+req.params.param)
// })

app.post('/', (req,res)=>{
  let users = data
  let {occupation,city, ...other} = req.body
  if(!(occupation in users)){
    users[occupation] = {}
  }
  if(!(city in users[occupation])){
    users[occupation][city] = []
  }

  users[occupation][city].push(other)
  
  fs.writeFile('./output.json',JSON.stringify(users),()=>{
    res.json(other)
  });


  
})

app.get('/showUsers/', (req,res)=>{
  // let {occupation,city} = req.query
  let users = data
  let answer = null
  // if(users[occupation] && users[occupation][city]){
  //   answer = users[occupation][city]
  // }
  if(req.query.occupation){
    answer = users[req.query.occupation] || null
    if(req.query.city){
      answer = answer[req.query.city] || 'noone here'
    }
  }

  res.send(`Hi you visited: 
    <ul>
      <li>protocol: ${req.protocol}</li>
      <li>host: ${req.get('host')}</li>
      <li>url: ${req.originalUrl}</li>
    </ul>
    ${JSON.stringify(answer)}
  `)
})

app.use((req,res)=>{
  res.send(`sorry no such directory ${req.originalUrl}` )
})

app.listen(3333, ()=>console.log('hello'))