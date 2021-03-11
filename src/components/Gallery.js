import React, { useState } from "react";
import MouseToolTip from 'react-sticky-mouse-tooltip'

const Gallery = ({ pokemon, imgSrc }) => {
  const { stats, name, id } = pokemon
  const { height, weight, types } = stats
  const [showToolTip, setToolTip] = useState(false)

  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1)
  }

  return (
    <div
      className="gallery-container"
      onMouseEnter={() => setToolTip(true)}
      onMouseLeave={() => setToolTip(false)}
    >
      <h2 className="pokemon-name" onClick={() => window.open(`https://pokemon.fandom.com/wiki/${name}`, "_blank")}>
        {capitalize(name)}
      </h2>
      <figure>
        <img
          className="image"
          src={imgSrc}
          alt={`${name}`}
          onClick={() =>
            window.open(`https://pokemon.fandom.com/wiki/${name}`, "_blank")
          }
        />
          <hr />
          <figcaption className="stats">
            <div>Pokedex ID: {id}</div>
            <div>
              Height: {height}, Weight: {weight}
            </div>
            <div>
              Types:{" "}
              {types.map((type, index, arr) => (
                <span>{type}{index !== arr.length - 1 ? ', ' : ''}</span>
              ))}
            </div>
          </figcaption>
      </figure>
      <MouseToolTip
          visible={showToolTip}
          offsetX={15}
          offsetY={10}
        >
          <span className="learn-more">Click to learn more!</span>
        </MouseToolTip>
    </div>
  );
}

export default Gallery