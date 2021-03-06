import { Paginator } from '../general/Paginator.jsx'
import React, { useState } from 'react'
import { useFetchReducer } from '../../hooks/useFetchWithCache.js'
import { List } from '../general/List.jsx'
import pokeAPI from '../../pokeAPI.js'
import { Loading } from '../general/Loading.jsx'
import { Alert } from 'react-bootstrap'

export const Pokedex = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [numberElements, setNumberElements] = useState(null)
  const { data , error, loading } = useFetchReducer(pokeAPI.search, getPageParameter(currentPage))

  if(data && !numberElements){
    setNumberElements(data.count)
  }
  
  return (
    <>
    {numberElements && (
      <div className="text-center">
        <h3>There are a total of {numberElements} pokemons</h3>
        <Paginator page={currentPage} changePage={setCurrentPage} totalElemnts={numberElements}></Paginator>
      </div>
    )}
    {loading && <Loading/>}
    {error && <Alert variant='danger'>{error}</Alert>}
    {data && <List listElements={data.results.map(pokemon => pokemon.name)} typeElement='pokemon' id="pokemons-list"/>}
    </>
  )
}

const getPageParameter = (numberPage) => {
  const POKEMONS_PER_PAGE = 20

  return `pokemon/?offset=${POKEMONS_PER_PAGE * (numberPage - 1)}&limit=${POKEMONS_PER_PAGE}`
}
