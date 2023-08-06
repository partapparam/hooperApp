import React from "react"
import { useState, useMemo, createContext } from "react"
import { createPortal } from "react-dom"
import { Toast } from "../components/Toast"

function generateUEID() {
  let first = (Math.random() * 46656) | 0
  let second = (Math.random() * 46656) | 0
  first = ("000" + first.toString(36)).slice(-3)
  second = ("000" + second.toString(36)).slice(-3)

  return first + second
}

export const ToastContext = createContext({
  notification: null,
  addNotification: () => {},
  removeNotification: () => {},
})

// This is provided to the rest of the app in Route Setup. Children are all components that will have access to this context
export const ToastProvider = (props) => {
  const [toasts, setToasts] = useState([])

  const open = (message, status) => {
    console.log("open is run")
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: generateUEID(), message, status },
    ])
  }

  const close = (id) => {
    console.log("close is run")
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    )
  }

  // Memoize contextValue
  const contextValue = useMemo(() => ({ open }), [])

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      {createPortal(
        <div className="absolute top-8 right-6 w-[calc(100vw-50px)] sm:w-2/5 md:w-1/4">
          {toasts &&
            toasts.map((toast) => (
              <Toast
                key={toast.id}
                close={() => close(toast.id)}
                message={toast.message}
                status={toast.status}
              />
            ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}
