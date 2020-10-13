var express = require('express')
var app = express();
const port = 3333
const path = require('path');
app.use(express.static('client'));


var fs = require('fs');
// let data = require('./output.json');
app.use(express.json())
app.use(express.urlencoded())


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://fabian:qwerty12345@cluster.ptzqt.mongodb.net/?w=majority";





// app.get('/:param',(req,res)=>{
//   res.send('Hi, nice to meet your on our resorse '+req.params.param)
// })

app.post('/formhandler',(req,res)=>{
  fs.writeFile('./output.json',JSON.stringify(req.body),()=>{
    res.send('your form was sended succfully')
  });
})

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname+'/client/index.html'))
})

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
  
  
  MongoClient.connect(uri, (err,client) => {
    if(err){
      res.json(err)
    }else{
      const collection = client.db("Fabian").collection("budgetApp");
      
      collection.insertOne(req.body,(err,result)=>{
        if(err){
          res.json(err)
        }else{
          res.json(result)
        }
        client.close();
      })
    }
    
  })


  
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

app.listen(port, ()=>console.log(`hello app is running om port: ${port}`))