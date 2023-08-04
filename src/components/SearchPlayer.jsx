import React, { useEffect, useState, useRef, useCallback } from "react"
import { useLazyQuery } from "@apollo/client"
import { SEARCH_PLAYERS } from "../graphql/queries"
import { useDebounce } from "../hooks/useDebounce"
import { LoadingSpinner } from "./LoadingSpinner"

let renderCount = 0

export const SearchPlayers = () => {
  const [getSearch, { loading, error, data }] = useLazyQuery(SEARCH_PLAYERS, {
    onCompleted: () => {
      console.log(data)
      setResults(data.SearchPlayers)
    },
    onError: (error) => console.log("graph QL eror", error),
  })
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const resultsContainer = useRef(null)

  const debouncedRequest = useDebounce(() => {
    getSearch({ variables: { searchTerm: search } })
  })

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1)
    setShowResults(false)
  }, [])

  const handleSelection = (selectedIndex) => {
    const selectedItem = results[selectedIndex]
    if (!selectedItem) return resetSearchComplete()
    setSearch("")
    resetSearchComplete()
  }

  useEffect(() => {
    if (results && results.length > 0 && !showResults) setShowResults(true)

    if (results && results.length <= 0) setShowResults(false)
  }, [results])

  useEffect(() => {
    if (!resultsContainer.current) return

    resultsContainer.current.scrollIntoView({
      // block: "center",
    })
  }, [focusedIndex])

  const onChange = (e) => {
    const query = e.target.value
    console.log("current query value = ", query)
    if (query === "" || query === null) {
      setResults([])
      return
    }
    setSearch(query)
    debouncedRequest()
  }

  if (loading) {
    renderCount++
    console.log("loading")
    // return <LoadingSpinner />
  }

  return (
    <div className=" w-full px-3 md:px-0">
      <button className="btn-cancel">{renderCount}</button>
      <div
        tabIndex={1}
        onBlur={resetSearchComplete}
        // onKeyDown={handleKeyDown}
        className="relative"
      >
        <input
          className="w-full !px-6 py-3 rounded-sm text-md  focus:shadow-sm border-4 border-violet-300 focus:border-violet-500 duration-400 transition"
          type="text"
          placeholder="Search for a player"
          value={search}
          onChange={onChange}
        />
        {/* search results container */}
        {showResults && results && results.length !== 0 && (
          <div className="absolute text-md text-black text-left w-full p-2 bg-white shadow-sm rounded-bl rounded-br max-h-56 overflow-y-auto">
            {results &&
              results.map((player, index) => {
                return (
                  <div
                    key={index}
                    onMouseDown={() => handleSelection(index)}
                    ref={index === focusedIndex ? resultsContainer : null}
                    className="cursor-pointer hover:bg-violet-300 p-2"
                    style={{
                      backgroundColor: index === focusedIndex ? "#93c5fd" : "",
                    }}
                  >
                    {player.name.first}
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}
