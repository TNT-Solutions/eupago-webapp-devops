const sql = require('mssql');

const connStr = "Server=sqlserver-rm88469.database.windows.net;Port=1433;Database=challengedb;User Id=admsql;Password=devops@fiap21;";

sql.connect(connStr)
   .then(console.log("conectou!"))
   .catch(err => console.log("erro! " + err));


function execSQLQuery(sqlQry, res){
    sql.query(sqlQry)
       .then(result => res.json(result.recordset))
       .catch(err => res.json(err));
}

const getUsers = (request, response) => {
    execSQLQuery("SELECT * FROM funcionario", request)
    console
}

// const getUsersEdit = (request, response) => {
//   pool.query(`SELECT
//                 u.name,
//                 u.age,
//                 u.email,
//                 u.occupation,
//                 up.phone
//                 FROM users u 
//                 join users_phone up on u.id_phone = up.id
//                 `, (error, results) => {
//     if (error) {
//       throw error
//     }
//     //response.status(200).json(results.rows)
//     users = results.rows
//     return response.render("edit.html", { users })
//   })
// }

// const getUserById = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const createUser = (request, response) => {
//   const { name, age, email, occupation } = request.body
  
//   let id_phone = 2
//   console.log(request.body)
//   pool.query('INSERT INTO users (name, age, email, occupation, id_phone) VALUES ($1, $2, $3, $4, $5)', [name, age, email, occupation, id_phone] , (error, results) => {
//     if (error) {
//       throw error
//     }
//     //response.status(201).send(`User added with ID: ${results.insertId}`)
//     response.redirect('/')
//   })
// }

// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id)
//   const { name, email } = request.body

//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User modified with ID: ${id}`)
//     }
//   )
// }

// const updUser = (request, response) => {
//   const id = parseInt(request.body.reqDelete)
//   const { name, age, email, occupation } = request.body

//   pool.query(
//     'UPDATE users SET name = $1, age= $2,email = $3, occupation = $4 WHERE id = $5',
//     [name, age, email, occupation, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       //response.status(200).send(`User modified with ID: ${id}`)
//       response.redirect('/')
//     }
//   )
// }

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`User deleted with ID: ${id}`)
//   })
// }

// const delUser = (request, response) => {
//   const id = parseInt(request.body.reqDelete)

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     //response.status(200).send(`User deleted with ID: ${id}`)
//     response.redirect('/')
//   })
// }

module.exports = {
//   delUser,
//   updUser,
//   getUsersEdit,
  getUsers
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
}