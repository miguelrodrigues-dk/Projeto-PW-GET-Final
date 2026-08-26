const express = require("express");
const server = express();

//Permite que o Server entenda o Json
server.use(express.json());
//Permite que o server entenda dados de um Form HTML
server.use(express.urlencoded({ extended: true }));

//importar as rotas de categorias
const categorias = require("./routes/categorias");
//Usar as rotas de Categorias
server.use("/categorias", categorias);

//importar as rotas de clientes
const Clientes = require("./routes/Clientes");
//Usar as rotas de Clientes
server.use("/Clientes", Clientes);

//importar as rotas de fornecedores
const Fornecedores = require("./routes/Fornecedores");
//Usar as rotas de Fornecedores
server.use("/Fornecedores", Fornecedores);

//importar as rotas de fornecedores
const Funcionarios = require("./routes/funcionarios");
//Usar as rotas de Fornecedores
server.use("/Funcionarios", Funcionarios);



// Rota Principal
server.get("/", (req, res) => {
    res.send("Servidor funcionando!")
});

server.listen(3000, () => {
    console.log("Servidor em http://localhost:3000");
});
