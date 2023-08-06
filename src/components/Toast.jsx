import React from "react"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { useTimeout } from "../hooks/useTimeout"

export const Toast = (props) => {
  useTimeout(props.close, 3000)

  return (
    <div
      className={`py-3 px-2 rounded-sm shadow-lg text-white z-50 relative mb-3 flex flex-row items-center justify-between ${
        props.status === "success" ? "bg-green-500" : "bg-rose-500"
      }`}
    >
      <p className="text-xs">{props.message}</p>
      <button className="flex-inline" onClick={props.close}>
        <XMarkIcon className="w-4 h-4 hover:text-black transition" />
      </button>
    </div>
  )
}
