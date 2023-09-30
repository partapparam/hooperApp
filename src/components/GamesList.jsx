import React from "react"
import { GameCard } from "./GameCard"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { motion } from "framer-motion"

export const GamesList = ({ games }) => {
  const { isLoggedIn } = useAuth()
  console.log(games)
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
            <div key={game.id}>
              <motion.div
                initial={{ opacity: 0.5 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <GameCard key={game.id} game={game} />
              </motion.div>
            </div>
          )
        })}
    </div>
  )
}
