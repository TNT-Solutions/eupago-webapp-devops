const express = require('express');
const path = require('path');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const sql = require('mssql');

const app = express();

const bodyParser = require('body-parser');
const req = require('express/lib/request');

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));

app.use(express.static(__dirname + '/public'));


const connStr = "Server=sqlserver-rm88469.database.windows.net;Port=1433;Database=challengedb;User Id=admsql;Password=devops@fiap21;";


sql.connect(connStr)
   .then(console.log("conectou!"))
   .catch(err => console.log("erro! " + err));

function execSQLQuery(sqlQry, res){
          sql.query(sqlQry)
             .then(result => res.json(result.recordset))
             .catch(err => res.json(err));
}


app.get('/', (req, res) =>{
    return res.render("index.html")
})

app.get('/usuarios', (req, res) =>{
  sql.query(`
      SELECT 
    	id_usuario,
        id_celular,
        nr_cpf,
        ds_nome_completo,
    	FORMAT (dt_nascimento,'dd/MM/yyyy') as dt_nascimento,
        st_visao,
        ds_email,
        st_cadastro,
        dt_cadastro,
        dt_atualizacao
      from [dbo].[TB_USUARIO]
  `, (error, result) =>{
    if(error){
      throw error
    }
    users = result.recordset
    return res.render("usuarios.html", {users})
  })
})


app.post("/cadastro", (req, res) => {
  const name = req.body.name;
  const date = req.body.date;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const visao = req.body.visao;

  execSQLQuery(`INSERT INTO TB_USUARIO(id_celular, nr_cpf, ds_nome_completo, dt_nascimento, st_visao, ds_email, st_cadastro, dt_cadastro) 
  VALUES('1', '${cpf}','${name}','${date}','${visao}','${email}', '1', '2022-08-09')`, res);

  return res.redirect('/usuarios')
});


app.get('/edit', (req, res) =>{
  sql.query(`
      SELECT 
    	id_usuario,
        id_celular,
        nr_cpf,
        ds_nome_completo,
    	FORMAT (dt_nascimento,'dd-MM-yy') as dt_nascimento,
        st_visao,
        ds_email,
        st_cadastro,
        dt_cadastro,
        dt_atualizacao
      from [dbo].[TB_USUARIO]
  `, (error, result) =>{
    if(error){
      throw error
    }
    users = result.recordset
    return res.render("edit.html", {users})
  })
})

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  execSQLQuery(`UPDATE funcionario SET wage = '${wage}' where id = ${id}`, res);
});


app.post('/delete/api/',(req, res) => {
  const id = req.body.reqDelete
  console.log(id);
  execSQLQuery('DELETE TB_USUARIO WHERE id_usuario =' + id, res);
  res.redirect('/usuarios')
});

app.post('/update/api/',(req, res) => {
  const id = req.body.reqDelete
  const name = req.body.nome;
  const date = req.body.dateNasc;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const visao = req.body.visao;

  console.log(req.body)

  execSQLQuery(`UPDATE TB_USUARIO SET ds_nome_completo = '${name}', nr_cpf = '${cpf}', ds_email = '${email}', st_visao = '${visao}' where id_usuario = ${id}`, res);
  res.redirect('/usuarios')
});



app.delete("/delete/:id", (req, res) => {
  execSQLQuery('DELETE TB_USUARIO WHERE id_usuario =' + req.params.id, res);
  res.redirect('/usuarios')
});


app.listen(8080, ()=>{
  console.log('listening on port 8080')
})

