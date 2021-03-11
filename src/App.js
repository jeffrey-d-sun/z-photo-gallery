import React from 'react'
import { Button, Gallery, Loading } from './components'
import './App.css';

class App extends React.Component {
  state = {
    pokemons: [],
    index: 0,
    isLoading: true,
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
        details.imgSrc = `https://pokeres.bastionbot.org/images/pokemon/${id}.png` 
        details.stats = {
          height,
          weight,
          types: types.map(({ type: { name }}) => name)
        }
        return details
      })
  }

  getPokemonDetails = (pokemonArray) => {
    Promise.all([...pokemonArray.map((pokemon) => this.getPokemonStats(pokemon))])
      .then((data) => {
        this.setState({ pokemons: data, isLoading: false })
      })
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
    const { pokemons, index, isLoading } = this.state
    const pokemon = pokemons[index]
    const isFirst = index === 0
    const isLast = index === pokemons.length - 1

    return (
      <main className="main">
        <Button
          label='previous'
          type='prev'
          isDisabled={isFirst}
          handleClick={this.handleClick}
        />
        {isLoading && <Loading />}
        {!isLoading && pokemon && (<Gallery pokemon={pokemon} />)}
        <Button
          label='next'
          type='next'
          isDisabled={isLast}
          handleClick={this.handleClick}
        />
      </main>
    );
  }
}

export default App;
