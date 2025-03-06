import React from 'react'

const Search = ({searchTerm , setSearchTerm}) => {
  return (
    <div className="search" style={{ padding: '12px' }}>
        <div>
            <img src="search.svg" alt="" />
            <input type="text" placeholder='Search through thousands of movies' value = {searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search