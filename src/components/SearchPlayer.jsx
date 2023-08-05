import React, { useEffect, useState, useRef, useCallback } from "react"
import { useLazyQuery } from "@apollo/client"
import { SEARCH_PLAYERS } from "../graphql/queries"
import { useDebounce } from "../hooks/useDebounce"
import { LoadingSpinner } from "./LoadingSpinner"

let renderCount = 0

export const SearchPlayers = () => {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const resultsContainer = useRef(null)
  const [getSearch, { loading, error, data }] = useLazyQuery(SEARCH_PLAYERS, {
    onCompleted: () => {
      console.log("OnCompleted")
    },
    onError: (error) => console.log("graph QL eror", error),
  })

  const debouncedRequest = useDebounce(() => {
    console.log("running debounced request")
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
    setSearch(query)
    if (query == "" || query == null) {
      setResults([])
      console.log("set results to nothing")
    } else {
      console.log("about to call debounce")
      debouncedRequest()
    }
  }

  if (loading) {
    renderCount++
    console.log("loading")
    // return <LoadingSpinner />
  }
  if (error) {
    console.log("Error from GQL,", error)
  }
  useEffect(() => {
    if (!loading && data) {
      console.log("here is data = ", data)
      setResults(data.SearchPlayers)
    }
  }, [loading, data])

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
          <>
            <h3>Players</h3>
            <div className="absolute text-md text-black text-left w-full m-1 p-2 bg-white shadow-sm rounded max-h-56 overflow-y-auto">
              {results &&
                results.map((player, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer hover:bg-violet-300 p-2"
                    >
                      <p className="text-lg">
                        {player.name.first} {player.name.last}
                      </p>
                      <p className="text-xs">{player.location}</p>
                    </div>
                  )
                })}
            </div>
          </>
        )}
        {loading && <LoadingSpinner message="players" />}
      </div>
    </div>
  )
}
