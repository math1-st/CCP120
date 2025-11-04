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
resposta.redirect('/aula10/cadastro.html')
})

app.get('/', function (requisicao, resposta){
resposta.redirect('/aula10/login.html')
})

app.get('/inicio', function (requisicao, resposta){
var nome = requisicao.query.info;
console.log(nome);
})

app.post('/inicio', function (requisicao, resposta){
var data = requisicao.body.data;
console.log(data);
})

app.get('/login',function (requisicao, resposta){
var usuario = requisicao.query.usuario;
var senha = requisicao.query.senha;
resposta.render('resposta', {usuario, senha})
})

app.get('/cadastra',function (requisicao, resposta){
var usuario = requisicao.query.usuario;
var senha = requisicao.query.senha;
resposta.render('resposta', {usuario, senha})
})

app.get('/logar_usuario',function (requisicao, resposta){
var usuario = requisicao.query.usuario;
var senha = requisicao.query.senha;
resposta.render('resposta', {usuario, senha})
})


// AULA 11

// conectando ao mongodb
var mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const uri = 'mongodb+srv://MN_FS:<senhadb1>@fs-ccp120.mnd13sv.mongodb.net/?appName=FS-CCP120';
const client = new MongoClient(uri, { useNewUrlParser: true });

//buscando um usuário

app.post("/logar_usuario", function(req, resp) {
    var data = {db_login: req.body.login, db_senha: req.body.senha };

usuarios.find(data).toArray(function(err, items) {
    console.log(items);
    if (items.length == 0) {
    resp.render('resposta_usuario', {resposta: "Usuário/senha não encontrado!"})
    }else if (err) {
    resp.render('resposta_usuario', {resposta: "Erro ao logar usuário!"})
    }else {
    resp.render('resposta_usuario', {resposta: "Usuário logado com sucesso!"})        
    };
});

});

// atualizando um usuário

app.post("/atualizar_usuario", function(req, resp) {
    var data = { db_login: req.body.login, db_senha: req.body.senha };
    var newData = { $set: {db_senha: req.body.novasenha} };

usuarios.updateOne(data, newData, function (err, result) {
    console.log(result);
    if (result.modifiedCount == 0) {
    resp.render('resposta_usuario', {resposta: "Usuário/senha não encontrado!"})
    }else if (err) {
    resp.render('resposta_usuario', {resposta: "Erro ao atualizar usuário!"})
    }else {
    resp.render('resposta_usuario', {resposta: "Usuário atualizado com sucesso!"})        
    };
});

});

// removendo um usuário

app.post("/remover_usuario", function(req, resp) {
    var data = { db_login: req.body.login, db_senha: req.body.senha };
   
usuarios.deleteOne(data, function (err, result) {
    console.log(result);
    if (result.deletedCount == 0) {
    resp.render('resposta_usuario', {resposta: "Usuário/senha não encontrado!"})
    }else if (err) {
    resp.render('resposta_usuario', {resposta: "Erro ao remover usuário!"})
    }else {
    resp.render('resposta_usuario', {resposta: "Usuário removido com sucesso!"})        
    };
});

});

client.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        return;
    }
    console.log("Conectado ao MongoDB!");

    // Aqui você pode criar referências para suas coleções 
    usuarios = client.db("nome_do_banco").collection("usuarios");
});

// --- coleções ---
let usuarios;
let posts;

// conexão com MongoDB
client.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    return;
  }
  console.log("Conectado ao MongoDB!");

  const db = client.db("nome_do_banco");
  usuarios = db.collection("usuarios");
  posts = db.collection("posts"); // 👈 nova coleção
});

// --- rotas ---
// Rota principal redireciona para Projects.html
app.get('/', (req, res) => {
  res.redirect('/Projects.html');
});

// Página do blog
app.get('/blog', async (req, res) => {
  try {
    const lista = await posts.find().toArray();
    res.render('blog', { posts: lista });
  } catch (error) {
    console.error(error);
    res.render('blog', { posts: [] });
  }
});

// Cadastrar post
app.post('/cadastrar_post', async (req, res) => {
  const { titulo, resumo, conteudo } = req.body;

  try {
    await posts.insertOne({ titulo, resumo, conteudo });
    res.redirect('/blog');
  } catch (error) {
    res.send('Erro ao cadastrar post.');
  }
});
