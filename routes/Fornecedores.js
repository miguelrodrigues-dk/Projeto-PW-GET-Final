const express = require("express");
const router = express.Router();

let fornecedores = [
    { id: 1, nome: "Nike", telephone: "(11) 5039-9711-9999" },
    { id: 2, nome: "Apple", telephone: "0800-761-0867" },
    { id: 3, nome: "Nasa", telephone: "(202) 358-0001 " }
];
//Rota para mostrar todos os fornecedores
router.get("/", (req, res) => {
    res.status(200).json(fornecedores);
});

//rota por ID(1,2 ou 3) para mostrar a categoria correspondente
//http://localhost:3000/categorias/3
router.get("/:id", (req, res) => {
    let id = Number(req.params.id);
    let fornecedor = fornecedores.find(cat => cat.id === id);
    if (!fornecedor) {
        return res.status(404).json({
            message: 'Fornecedor não encontrado'
        });
    }


    res.status(200).json(fornecedor);
});


//salvar uma nova categoria - Post
router.post("/", (req, res) => {
    let { nome, telephone } = req.body;

    if (!nome) {
        return res.status(400).json({
            message: "Fornecedor é obrigatório"
        })
    }

    let novoRegistro = {
        id: fornecedores.length + 1,
        nome,
        telephone
    };

    fornecedores.push(novoRegistro);
    res.status(201).json(novoRegistro);

});


// Rota para atualizar uma categoria existente - Put
router.put("/:id", (req, res) => {
    let id = Number(req.params.id);
    let fornecedor = fornecedores.find(cat => cat.id === id);
    let { nome, telephone } = req.body;

    if (!fornecedor) {
        return res.status(404).json({
            message: 'Fornecedor não encontrado'
        });
    }

    fornecedor.nome = nome;
    fornecedor.telephone = telephone;


    res.status(200).json({
        message: 'Fornecedor atualizado com sucesso',
        fornecedor
    });
});

module.exports = router;