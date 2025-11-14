var http = require('http');
var express = require('express');
var colors = require('colors');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', './views');

var server = http.createServer(app);
server.listen(80);

console.log('Servidor rodando ...'.rainbow);

app.get('/', function (requisicao, resposta){
resposta.redirect('/aula11/cadastrar_post.html')
})

app.post('/inicio', function (requisicao, resposta){
var data = requisicao.body.data;
console.log(data);
})

// conectando ao mongodb
var mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const uri = 'mongodb+srv://banco_senha:senha_do_banco@cluster.h0wnutr.mongodb.net/?appName=Cluster';
const client = new MongoClient(uri, { useNewUrlParser: true });

// Verificar Conexão com Mongo

client.connect(err => {
    if (err) {
        console.error('Erro na conexão com o MongoDB:', err);
        return;
    }
    console.log('Conectado ao MongoDB');

    // Banco e coleção
    var dbo = client.db("exemplo_bd");
    var posts = dbo.collection("posts");

    // Comprando um carro
    app.post("/car", (req, resp) => {
        stock.cars -= 1
        resp.send(`<h1>You bought a car! Remaining: ${stock.cars}</h1>`)
      });
    });
