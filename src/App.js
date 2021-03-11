import React from 'react'
import { Button } from './components'
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

  handleClick = (e, type) => {
    if (e) {
      e.preventDefault()
    }

    const { index } = this.state
    if (type === 'next') {
      this.setState({ index: index + 1 })
    } else {
      this.setState({ index: index - 1 })
    }
  }

  render() {
    const { pokemons, index, gallery } = this.state
    const pokemonName = pokemons[index]?.name
    const pokemonImgSrc = gallery[index]
    const isFirst = index === 0
    const isLast = index === gallery.length - 1

    return (
      <main>
        <Button label='previous' type='prev' isDisabled={isFirst} handleClick={this.handleClick} />
        <div className="gallery-container">
          <h2>{pokemonName}</h2>
          <img src={pokemonImgSrc} alt={`${pokemonName}`} />
        </div>
        <Button label='next' type='next' isDisabled={isLast} handleClick={this.handleClick} />
      </main>
    );
  }
}

export default App;
