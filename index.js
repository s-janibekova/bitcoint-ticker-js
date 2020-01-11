
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
  var crypto = req.body.crypto
  var fiat = req.body.fiat
  var amount = req.body.amount
  var apiUrl = " https://apiv2.bitcoinaverage.com/convert/global"

  var options = {
    url : apiUrl,
    method: 'GET',
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  }

  request(options, (err, response, body)=> {
    var data = JSON.parse(body)
    console.log(data)
    var price = data.price
    var currentDate = data.time
    res.write(`<head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
    <link href="https://fonts.googleapis.com/css?family=Acme|Baloo+Bhai|Bree+Serif|Ibarra+Real+Nova&display=swap" rel="stylesheet">
    </head>
    <style>
    body {
      background-color: #faf5e4;
      text-align: center;
      color: #35477d;
      font-family: 'Acme', sans-serif;
      }
    </style>
    <p style="padding: 5%">Дата ` + currentDate + "</p>")
    res.write("<h1>Текущая цена на <strong>"+ amount + "</strong> " + crypto + "  равна  <strong>" + price +"  </strong>"+ fiat + "</h1>")
    res.send()
  })
})

app.listen(3000, function(req, res) {
  console.log("Server is running")
})
