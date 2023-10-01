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
    <div className="h-screen bg-white text-black flex flex-col justify-center items-center overflow-hidden">
      <p className="text-2xl font-extrabold">Are you the best in</p>
      <div className="mx-10">
        <TextScroll baseVelocity={2}>
          Los Angeles NYC AUSTIN DENVER SEATTLE SAN FRANCISCO D.C BOSTON
          BARCELONA LONDON MADRID MOSCOW OKC PORTLAND TORONTO BROOKLYN QUEENS
          ATLANTA NASHVILLE MELBOURNE Sydney Cairo Vancouver Prague Rio de
          Janeiro Nairobi Budapest Seoul Lisbon Vienna Helsinki Auckland
          Istanbul
        </TextScroll>
        <TextScroll baseVelocity={-2}>
          PARIS SEATTLE LONDON SAN DIEGO MADRID TOKYO D.C BOSTON BARCELONA
          MOSCOW SYDNEY MIAMI CHICAGO LIMA PHOENIX DUBLIN LONDON MIAMI BARCELONA
          AUCKLAND SEOUL Los Angeles MUMBAI New York City AUSTIN BEIJING
          ISTANBUL DENVER LIMA AMSTERDAM NAIROBI HELSINKI MEXICO CITY MONTREAL
        </TextScroll>
      </div>
    </div>
  )
}
