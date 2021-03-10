import React from 'react'
import './App.css';

class App extends React.Component {
  state = {
    gallery: [],
    index: 0
  }

  componentDidMount() {
    // fetches the first 9 first-gen pokemons :)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=9')
      .then(res => res.json())
      .then(({ results }) => {
        const normalizedData = this.getPokemonDetails(results)
        this.setState({ gallery: normalizedData })
      })
  }

  getPokemonDetails = (pokemonArray) => {
    pokemonArray.forEach(({ url }, index, arr) => {
      fetch(url)
        .then(res => res.json())
        .then(({ height, weight, types, id }) => {
          arr[index].id = id
          arr[index].height = height
          arr[index].weight = weight
          arr[index].types = types.map(({ type: { name }}) => name)
        })
    })

    return pokemonArray
  }

  render() {
    const { gallery, index } = this.state

    return (
      <main>
        <div className="gallery-container">
          {gallery[index]?.name}
        </div>
      </main>
    );
  }
}

export default App;
