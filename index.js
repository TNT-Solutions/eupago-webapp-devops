const express = require('express');
const path = require('path');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const sql = require('mssql');

const app = express();

const bodyParser = require('body-parser');

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.set('view engine', 'html');


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
        u.id_usuario,
        u.id_celular,
        u.nr_cpf,
        u.ds_nome_completo,
    	  FORMAT (dt_nascimento,'dd/MM/yyyy') as dt_nascimento,
        u.st_visao,
        u.ds_email,
        u.st_cadastro,
        u.dt_cadastro,
        u.dt_atualizacao,
        c.nr_celular
      from TB_USUARIO u
      join TB_CELULAR c on u.id_celular = c.id_celular
  `, (error, result) =>{
    if(error){
      throw error
    }
    users = result.recordset
    //console.log(users)
    return res.render("usuarios.html", {users})
  })
})

app.get('/edit', (req, res) =>{
  sql.query(`
    SELECT 
      u.id_usuario,
      u.id_celular,
      u.nr_cpf,
      u.ds_nome_completo,
      FORMAT (dt_nascimento,'dd/MM/yyyy') as dt_nascimento,
      u.st_visao,
      u.ds_email,
      u.st_cadastro,
      u.dt_cadastro,
      u.dt_atualizacao,
      c.nr_celular
    from TB_USUARIO u
    join TB_CELULAR c on u.id_celular = c.id_celular
  `, (error, result) =>{
    if(error){
      throw error
    }
    users = result.recordset
    return res.render("edit.html", {users})
  })
})


app.get('/transacoes', (req, res) =>{
  sql.query(`
    SELECT 
      id_trasacao,
      id_compra,
      FORMAT (dt_transacao,'dd/MM/yyyy') as dt_transacao,
      st_parcelado,
      nr_parcelas,
      vl_parcelas,
      st_transacao,
      vl_total_cartao
    from TB_TRANSACAO 
    `, (error, result) =>{
  if(error){
    throw error
  }
  transacoes = result.recordset
  console.log(transacoes)
  return res.render("transacoes.html", {transacoes})
  })
})



app.post("/cadastro", (req, res) => {
  const name = req.body.name;
  const date = req.body.date;
  const cpfString = req.body.cpf;
  let cpf = cpfString.replace(/\D/g, "");
  const email = req.body.email;
  const celularString = req.body.celular;
  const celularDDD = celularString.slice(0, 2)
  const celular = celularString.slice(2)
  const visao = req.body.visao;

  console.log(req.body)
  //console.log(celularDDD)
  //console.log(celular)

  sql.query(`INSERT INTO TB_CELULAR (nr_ddd, nr_celular) VALUES (${celularDDD}, ${celular})`)
  sql.query(`INSERT INTO TB_USUARIO(id_celular, nr_cpf, ds_nome_completo, dt_nascimento, st_visao, ds_email, st_cadastro, dt_cadastro) 
  VALUES(2, '${cpf}','${name}','${date}','${visao}','${email}', '1', '2022-08-09')`)
  // execSQLQuery(`INSERT INTO TB_USUARIO(id_celular, nr_cpf, ds_nome_completo, dt_nascimento, st_visao, ds_email, st_cadastro, dt_cadastro) 
  // VALUES((SELECT id_celular FROM TB_CELULAR where nr_celular = '${celular}'), '${cpf}','${name}','${date}','${visao}','${email}', '1', '2022-08-09')`, res);
  setTimeout(() => { 
    return res.redirect('/usuarios')
  }, 1000);
});



app.put("/update", (req, res) => {
  const id = req.body.reqDelete
  const name = req.body.nome;
  const date = req.body.dateNasc;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const visao = req.body.visao;
  execSQLQuery(`UPDATE TB_USUARIO SET ds_nome_completo = '${name}', nr_cpf = '${cpf}', ds_email = '${email}', st_visao = '${visao}' where id_usuario = ${id}`, res);
  res.redirect('/usuarios')
});


app.post('/delete/api/',(req, res) => {
  const id = req.body.reqDelete
  //console.log(id);
  execSQLQuery('DELETE TB_USUARIO WHERE id_usuario =' + id, res);
  res.redirect('/usuarios')
});

app.post('/update/api/',(req, res) => {
  const id = req.body.reqDelete
  const id_celular = req.body.reqCelular

  const name = req.body.nome;
  const date = req.body.dateNasc;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const visao = req.body.visao;
  const celular = req.body.celular;


  sql.query(`update TB_CELULAR set nr_celular = ${celular} where id_celular = ${id_celular}
  `, (error, result) =>{
    if(error){
      throw error
    }
  })

  setTimeout(() => { 
    execSQLQuery(`UPDATE TB_USUARIO SET ds_nome_completo = '${name}', nr_cpf = '${cpf}', ds_email = '${email}', st_visao = '${visao}' where id_usuario = ${id}`, res);
    res.redirect('/usuarios')
  }, 1000);
});



app.delete("/delete/:id", (req, res) => {
  execSQLQuery('DELETE TB_USUARIO WHERE id_usuario =' + req.params.id, res);
  res.redirect('/usuarios')
});


app.listen(8080, ()=>{
  console.log('listening on port 8080')
})

