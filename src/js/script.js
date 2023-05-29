const pokemonList = document.getElementById('pokemon-list')
const loadBtn = document.getElementById('loadMoreBtn')
const maxRecords = 151
let offset = 0;
const limit = 9
// const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

function pokemonHTML(pokemon) {
    return`
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type)=>`<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src=${pokemon.photo} alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemon(offest, limit) {
    pokeApi.getPokemons(offest, limit).then((pokemons = []) => {
        const newPokeList = pokemons.map(pokemonHTML).join('')//nova listagem de pokemons

        pokemonList.innerHTML += newPokeList
    })    
}

loadPokemon(offset, limit)

loadBtn.addEventListener('click', () => {
    offset += limit
    const qtdNextPage = offset + limit

    if (qtdNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemon(offset, newLimit)
        loadBtn.parentElement.removeChild(loadBtn)
    } else {
        loadPokemon(offset, limit)     
    } 
})