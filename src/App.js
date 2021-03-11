import React, { useEffect, useState } from 'react'
import { Button, Gallery, Loading } from './components'
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([])
  const [index, setIndex] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const getPokemonStats = (pokemon) => {
    const { name, url } = pokemon
    const details = { name, url }

    // adding neccessary attributes of pokemon
    // as first API does not provide such information
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

  const getPokemonDetails = (pokemonArray) => {
    Promise.all([...pokemonArray.map((pokemon) => getPokemonStats(pokemon))])
      .then((data) => {
        setPokemons(data)
        setLoading(false)
      })
  }

  const handleClick = (e, type) => {
    if (e) {
      e.preventDefault()
    }

    if (type === 'next') {
      setIndex((index) => index + 1)
    } else {
      setIndex((index) => index - 1)
    }
  }

  useEffect(() => {
    // fetches the first 9 first-gen pokemons :)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=9')
      .then(res => res.json())
      .then(({ results }) => {
        getPokemonDetails(results)
      })
  }, [])


  const pokemon = pokemons[index]
  const isFirst = index === 0
  const isLast = index === pokemons.length - 1

  return (
    <main className="main">
      <Button
        label='previous'
        type='prev'
        isDisabled={isFirst}
        handleClick={handleClick}
      />
      {isLoading && <Loading />}
      {!isLoading && pokemon && (<Gallery pokemon={pokemon} />)}
      <Button
        label='next'
        type='next'
        isDisabled={isLast}
        handleClick={handleClick}
      />
    </main>
  );
}

export default App;
