import React from 'react'
import './App.css';

class App extends React.Component {
  state = {
    pokemons: [],
    gallery: [],
    index: 0
  }

  componentDidMount() {
    // fetches the first 9 first-gen pokemons :)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=9')
      .then(res => res.json())
      .then(({ results }) => {
        this.getPokemonDetails(results)
      })
  }

  getPokemonStats = (pokemon) => {
    const { name, url } = pokemon
    const details = { name, url }

    return fetch(url)
      .then(res => res.json())
      .then(({ height, weight, types, id }) => {
        details.id = id
        details.height = height
        details.weight = weight
        details.types = types.map(({ type: { name }}) => name)
        return details
      })
  }

  getPokemonDetails = (pokemonArray) => {
    Promise.all([...pokemonArray.map((pokemon) => this.getPokemonStats(pokemon))])
      .then((data) => {
        this.setState({
          pokemons: data,
          gallery: this.getPokemonImages(data)
        })
      })
  }

  getPokemonImages = (pokemons) => {
    return pokemons.map(({ id } ) => `https://pokeres.bastionbot.org/images/pokemon/${id}.png`)
  }

  render() {
    const { pokemons, index, gallery } = this.state
    const pokemonName = pokemons[index]?.name
    const pokemonImgSrc = gallery[index]

    return (
      <main>
        <div className="gallery-container">
          {pokemonName}
          <img src={pokemonImgSrc} alt={`${pokemonName}`} />
        </div>
      </main>
    );
  }
}

export default App;
