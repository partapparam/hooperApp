import { useContext } from "react"
import { ToastContext } from "../providers/ToastProvider"

/**
 *
 * By creating a hook, we can avoid having to do useContext in every component
 * exposes the addNotification and removeNotification functions, and the notification
 */
export const useToast = () => useContext(ToastContext)
