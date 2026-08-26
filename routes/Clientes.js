const express = require("express");
const router = express.Router();

let clientes = [
    { id: 1, nome: "Alice", email: "AlexonFire@gmail.com" },
    { id: 2, nome: "Nicolas", email: "Matematico@gmail.com" },
    { id: 3, nome: "Miguel", email: "MiguelDaVince@gmail,com" }
];
//Rota para mostrar todos os clientes
router.get("/", (req, res) => {
    res.status(200).json(clientes);
});

//rota por ID(1,2 ou 3) para mostrar a categoria correspondente
//http://localhost:3000/categorias/3
router.get("/:id", (req, res) => {
    let id = Number(req.params.id);
    let cliente = clientes.find(cat => cat.id === id);
    if (!cliente) {
        return res.status(404).json({
            message: 'Cliente não encontrado'
        });
    }


    res.status(200).json(cliente);
});


//salvar uma nova categoria - Post
router.post("/", (req, res) => {
    let { nome, email } = req.body;

    if (!nome) {
        return res.status(400).json({
            message: "O Nome é obrigatório"
        })
    }

    let novoRegistro = {
        id: clientes.length + 1,
        nome,
        email
    };

    clientes.push(novoRegistro);
    res.status(201).json(novoRegistro);

});


// Rota para atualizar uma categoria existente - Put
router.put("/:id", (req, res) => {
    let id = Number(req.params.id);
    let cliente = clientes.find(cat => cat.id === id);
    let { nome, email } = req.body;

    if (!cliente) {
        return res.status(404).json({
            message: 'Cliente não encontrado'
        });
    }

    cliente.nome = nome;
    cliente.email = email;

    res.status(200).json({
        message: 'Cliente atualizado com sucesso',
        cliente
    });
});


module.exports = router;