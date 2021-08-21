const express = require('express')/**cria um objeto e recebe a importação do express */
const app = express()
const dataBase = require('./dataBase') /** Importa lá no database as funções de salvar e mostrar */
const bodyParser = require('body-parser') /**Cria uma requisição para o Body Parser */

app.use(bodyParser.urlencoded( {extended: true })) /**Usar o Body parser no URLENCODED que tem lá no Postman */

app.get('/pokemons',(req,res) =>{
    res.send(dataBase.mostrarPokemons())
})

app.get('/pokemons/:id',(req,res) =>{ /**Instancia como pokemons:id pq só quer mostrar 1 pokemon */
    res.send(dataBase.mostrarPokemon(req.params.id))
})

app.post('/pokemons',(req,res) =>{
    const pokemon = dataBase.salvarPokemons({
        nome: req.body.nome, /**Pega no corpo da requisição feita la no postman e salva dentro dessas variaveis */
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100
    })
    res.send(pokemon)
})

app.put('/pokemons/:id',(req,res) => { 
    const pokemon = dataBase.atualizarPokemon(req.params.id,{
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100,
        id: parseInt(req.params.id)
    })
    res.send(pokemon)
})

app.delete('/pokemons/:id',(req,res) =>{ /**Instancia como pokemons:id pq só quer mostrar 1 pokemon */
    res.send(dataBase.deletarPokemon(req.params.id))
})

app.post('/batalha',(req,res) =>{ 
    res.send(dataBase.batalhaPokemon(req.body.id1, req.body.id2))
})

app.post('/cura/:id',(req,res) =>{ 
    res.send(dataBase.curaPokemon(req.params.id))
})

app.listen(3003)