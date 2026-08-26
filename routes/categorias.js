const express = require("express");
const router = express.Router();

let categorias = [
    { id: 1, nome: "Ação", descricao: "Categoria de filmes de ação" },
    { id: 2, nome: "Terror", descricao: "Categoria de filmes de terror" },
    { id: 3, nome: "Ficção Científica", descricao: "Categoria de filmes de ficção científica" }
];
//Rota para mostrar todas as categorias
router.get("/", (req, res) => {
    res.status(200).json(categorias);
});


//rota por ID(1,2 ou 3) para mostrar a categoria correspondente
//http://localhost:3000/categorias/3
router.get("/:id", (req, res) => {
    let id = Number(req.params.id);
    let categoria = categorias.find(cat => cat.id === id);
    if (!categoria) {
        return res.status(404).json({
            message: 'Categoria não encontrada'
        });
    }


    res.status(200).json(categoria);
});


//salvar uma nova categoria - Post
router.post("/", (req, res) => {
    let { nome, descricao } = req.body;

    if (!nome) {
        return res.status(400).json({
            message: "O Nome é obrigatório"
        })
    }

    let novoRegistro = {
        id: categorias.length + 1,
        nome,
        descricao
    };

    categorias.push(novoRegistro);
    res.status(201).json(novoRegistro);

});


// Rota para atualizar uma categoria existente - Put
router.put("/:id", (req, res) => {
    let id = Number(req.params.id);
    let categoria = categorias.find(cat => cat.id === id);
    let { nome, descricao } = req.body;

    if (!categoria) {
        return res.status(404).json({
            message: 'Categoria não encontrada'
        });
    }

    categoria.nome = nome;
    categoria.descricao = descricao;

    res.status(200).json({
        message: 'Categoria atualizada com sucesso',
        categoria
    });
});

//Excluir Registro
router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);

    let indice = categorias.findIndex((c) => c.id === id);

    if (indice === -1){
        return res.status(404).json({mensagem: "Categoria não encontrada"})
    }

    categorias.splice(indice, 1);
    
    res.json({mensagem: "Cartegoria removida com Sucesso"});

});

module.exports = router;