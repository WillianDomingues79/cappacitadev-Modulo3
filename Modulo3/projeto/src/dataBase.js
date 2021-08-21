const sequence = {
    _id: 1,
    get id(){return this._id++}
}/* Logica para pegar a sequencia pelo ID caso não tenha nenhuma */

const pokemons = []

function salvarPokemons(pokemon) {
    if(!pokemon.id) pokemon.id = sequence.id    /**Se não pegar o ID pega da sequencia*/
    pokemons[pokemon.id] = pokemon   /**O pokemon.id que foi incluido na sequencia vai receber o pokemon(É O MESMO QUE ESTÁ NOS PARAMETROS LA NO COMEÇO DA FUNÇÃO) */           
    return pokemon
    /**Lembrando que aqui a inclusão é manual pelo POSTMAN, então salva os pokemons por la e o ID passa para o proximo */
}

function mostrarPokemon(id){ /**Retorna o ID do pokemon cadastrado(MOSTRA 1 POKEMON SÓ) */
    return pokemons[id] || {}  /**mostra o ID do pokemon ou se não tiver nada mostra um vazio */
}

function mostrarPokemons(){  /**Mostra TODOS os pokemons */
    return Object.values(pokemons)
}

function atualizarPokemon(id, pokemon){/**Pega o ID do pokemon já criado e salva em cima dele mesmo */
    pokemons[id] = pokemon
    return pokemon
}

function deletarPokemon(id){
    sequence._id = sequence._id - 1 /**Usado para diminuir uma posição no ID do ultimo deletado */
    const pokemonDeletado = pokemons[id] /**Usado só para armazenar o pokemon deletado para mostrar depois quando excluir */
    pokemons.splice(id, 1) /**Exclui a id do pokemon com o tamanho de apenas 1 */
    pokemons.forEach(pokemon => { /**Percorre a ID do pokemon que for maior que o ID do pokemon que passei nos parametros dessa função, tira 1(Se ID == 4 tira 1 e vai para 3) */
        if(pokemon.id > id){
            pokemon.id = pokemon.id - 1
        }
    });
    return pokemonDeletado
}

function batalhaPokemon(id1, id2){
    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

    if(pokemon1.hp != 0 && pokemon2.hp != 0){
        if(pokemon1.tipo == pokemon2.fraqueza){
            pokemon2.hp = pokemon2.hp - superEfetivo
        }else if(pokemon1.tipo == pokemon2.resistencia){
            pokemon2.hp = pokemon2.hp - naoEfetivo
        }else{
            pokemon2.hp == pokemon2.hp - efetivo
        }
    }

    if(pokemon1.hp != 0 && pokemon2.hp != 0){
        if(pokemon2.tipo == pokemon1.fraqueza){
            pokemon1.hp = pokemon1.hp - superEfetivo
        }else if(pokemon2.tipo == pokemon1.resistencia){
            pokemon1.hp = pokemon1.hp - naoEfetivo
        }else{
            pokemon1.hp == pokemon1.hp - efetivo
        }
    }

    if(pokemon1.hp < 0) pokemon1.hp = 0
    if(pokemon2.hp < 0) pokemon2.hp = 0

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`
}

function curaPokemon(id){ /** Curar o pokemon com poção de 20HP a cada requisição, e se chegar a 110HP, voltar para 100HP*/
    const cura = 20
    const pokemonCura = pokemons[id]

    pokemonCura.hp = pokemonCura.hp + cura
    
    if (pokemonCura.hp > 100) pokemonCura.hp = 100
    /**Trecho tirado pois para efeito de avaliação não ficaria visível que o HP já estava com 100% recuperado e não contando mais para 120HP,140HP .. */
    //if (pokemonCura.hp == 100) return `Seu Pokemon ${pokemonCura.nome} foi 100% recuperado e está pronto para a batalha! =)`

    return `${pokemonCura.nome}: ${pokemonCura.hp} HP`
}
module.exports = {salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon,deletarPokemon, batalhaPokemon,curaPokemon}