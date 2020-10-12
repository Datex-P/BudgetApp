var express = require('express')
var app = express();

app.use(express.json())


let users = {};
app.get('/:param',(req,res)=>{
  res.send('Hi, nice to meet your on our resorse '+req.params.param)
})
app.post('/', (req,res)=>{

  let {occupation,city,...other} = req.body
  if(!(occupation in users)){
    users[occupation] = {}
  }
  if(!(city in users[occupation])){
    users[occupation][city] = []
  }
  users[occupation][city].push(other)
  
  console.log(JSON.stringify(users, null, 3))
  res.send('ok')
})
app.get('/:occupation/:city/', (req,res)=>{
  let {occupation,city} = req.params
  let answer = null
  if(users[occupation] && users[occupation][city]){
    answer = users[occupation][city]
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



app.listen(3333, ()=>console.log('hello'))