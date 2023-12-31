import React from "react"
import { GameCard } from "./GameCard"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { motion, useInView } from "framer-motion"
import { useEffect } from "react"
import { Reveal } from "./transitions/Reveal"

// interface Props {
//   children: JSX.Element;
//   width?: "fit-content" | "100%";
// }

export const GamesList = ({ games }) => {
  const { isLoggedIn } = useAuth()
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-white">Games</h1>

        {isLoggedIn && (
          <Link to="/game/create">
            <button className="btn-secondary">New</button>
          </Link>
        )}
      </div>
      {games &&
        games.map((game) => {
          return (
            <Reveal key={game.id} width="fit-content">
              <GameCard key={game.id} game={game} />
            </Reveal>
          )
        })}
    </div>
  )
}
