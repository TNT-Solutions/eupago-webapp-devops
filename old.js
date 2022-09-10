const express = require("express");
const app = express();
const sql = require('mssql');
const cors = require("cors");

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

app.use(cors());
app.use(express.json());

const connStr = "Server=sqlserver-rm88469.database.windows.net;Port=1433;Database=challengedb;User Id=admsql;Password=devops@fiap21;";


sql.connect(connStr)
   .then(console.log("conectou!"))
   .catch(err => console.log("erro! " + err));

app.get("/", (req, res) => {
  res.send("API NO AR")
})

function execSQLQuery(sqlQry, res){
          sql.query(sqlQry)
             .then(result => res.json(result.recordset))
             .catch(err => res.json(err));
}

router.get('/clientes', (req, res) =>{
  execSQLQuery("SELECT * FROM funcionario", res)
})

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  execSQLQuery(`INSERT INTO funcionario(name, age, country, position, wage) 
  VALUES('${name}','${age}','${country}','${position}','${wage}')`, res);
});

app.get("/employees", (req, res) => {
  execSQLQuery("SELECT * FROM funcionario", res)
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  execSQLQuery(`UPDATE funcionario SET wage = '${wage}' where id = ${id}`, res);
});

app.delete("/delete/:id", (req, res) => {
  execSQLQuery('DELETE funcionario WHERE id =' + req.params.id, res);
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});