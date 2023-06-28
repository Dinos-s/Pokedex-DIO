const pokeApi = {}

function detailPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokeDetails = (pokemon) => {
    return axios(pokemon.url)
    .then((res) => {return res.data})
    .then(detailPokemon)
    // .catch((error) => {console.log(error)})
}

// pokeApi.getPokeDetails = (pokemon) => {
//     return fetch(pokemon.url)
//         .then((response) => response.json())
//         .then(detailPokemon)
// }

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return axios(url)
            .then((res) => res.data) // Trnasformando o body em json
            .then((jsonBody) => jsonBody.results) // resultados do jsonBody
            .then((pokemons) => {
                return pokemons.map((pokeApi.getPokeDetails))
            }) // detalhes do pokemon no formato json
            .then((detailRequest) => Promise.all(detailRequest))
            // .then((pokeDetails) => pokeDetails)
}