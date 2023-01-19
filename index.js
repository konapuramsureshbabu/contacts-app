const express = require("express");
const app = express();
const bodyParser=require('body-parser');
const mysql=require('mysql2')
const cors=require('cors')
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

const db = mysql.createPool({
  host:"localhost",
  user:"root",
  password:"Suresh@1997",
  database:"user_details",
})

app.get('/api/get',(req,res)=>{
  const selQuery="SELECT * FROM user_details.user_table";
  db.query(selQuery,(err,result)=>{
    console.log('err',err)
    console.log('res',res)
    res.send(result)
  })
})
app.delete('/api/remove/:id',(req,res)=>{
  const{id}=req.params;
  const sqlRemove="DELETE FROM user_table WHERE id=?";
  db.query(sqlRemove,id,(err,result)=>{
    if(err){
      console.log(err)
    }
  })
})


app.post('/api/post',(req,res)=>{
  const{name,email,contact}=req.body;
  const sqlInsert="INSERT INTO user_details.user_table (name,email,contact) VALUES(?,?,?)";
  db.query(sqlInsert,[name,email,contact],(err,result)=>{
    if(err){
      console.log(err)
    }
  })
})

app.get('/api/get/:id',(req,res)=>{
  const {id}=req.params;
  const selQuery="SELECT * FROM user_details.user_table WHERE id=?";
  db.query(selQuery,id,(err,result)=>{
    if (err){
      console.log(err)
    }
    res.send(result)
  })
})

app.put('/api/update/:id',(req,res)=>{
  const {id}=req.params;
  const {name,email,contact}=req.body;
  const selUpdate="UPDATE user_table SET name=?,email=?,contact=? WHERE id=?";
  db.query(selUpdate,[name,email,contact,id],(err,result)=>{
    if (err){
      console.log(err)
    }
    res.send(result)
  })
})

//app.get('/',  (request,response)=>{
    //const sqlInsert="INSERT INTO user_details.user_table (name,email,contact) VALUES('rajesh','rajeshbabu@gmail.com',2356746545)";
    //const result = db.query(sqlInsert,(err,success)=>{
        //console.log('error',err)
        //console.log('result',success)
        //response.send('details sent successfully')
//})
//})

const port=process.env.PORT || 3009;

// for deployment 
if(process.env.NODE_ENV==='production'){
  app.use(express.static("client/build"))
}

app.listen(port,()=>{
  console.log('server is running at 3009/')
})


