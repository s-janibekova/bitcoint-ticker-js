
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
  var apiUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"

  var fullUrl = apiUrl + crypto + fiat

  console.log(fullUrl)
  request(fullUrl, (err, response, body)=> {
    var data = JSON.parse(body)
    var price = data.last
    var currentDate = data.display_timestamp
    res.write('<head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></head> <p>Дата ' + currentDate + "</p>")
    res.write("<h1>Текущая цена на  " + crypto + "  равна  " + price +" "+ fiat + "</h1>")
    res.send()
  })
})

app.listen(3000, function(req, res) {
  console.log("Server is running")
})
