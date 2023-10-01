import React from "react"

import { TextScroll } from "./transitions/TextScroll"

const CITIES = [
  "LA",
  "NYC",
  "AUSTIN",
  "DENVER",
  "SEATTLE",
  "SAN FRANCISCO",
  "D.C.",
  "BOSTON",
  "BARCELONA",
  "LONDON",
  "MADRID",
  "MOSCOW",
]

export const HomeBanner = () => {
  return (
    <div className="h-screen bg-gray-800 flex flex-col justify-center items-center overflow-hidden">
      <p className="text-xl font-bold">Hooper</p>
      <p className="text-lg">Are you the best in</p>
      <TextScroll baseVelocity={4}>
        LA NYC AUSTIN DENVER SEATTLE SAN FRANCISCO D.C BOSTON BARCELONA LONDON
        MADRID MOSCOW
      </TextScroll>
    </div>
  )
}
