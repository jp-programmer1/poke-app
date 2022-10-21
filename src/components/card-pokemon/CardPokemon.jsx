import React, { useCallback, useMemo } from 'react'
import './styles.css';

export const CardPokemon = ({pokemon, onOpenDetail}) => {
  let id = pokemon.url.split('/')[6];

  const getImage = useMemo(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }, [pokemon]);

  return (
    <div className="item-container-card" onClick={() => onOpenDetail(id, pokemon.name, getImage)}>
      <div className='img-card'>
        <img src={getImage} alt="img" />
      </div>
      <div className='title-card'>
        {pokemon.name}
      </div>
    </div>
  )
}
