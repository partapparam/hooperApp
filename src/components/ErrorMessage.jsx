export const ErrorMessage = ({ message, status }) => {
  return (
    <div className="bg-rose-400 text-center p-10">
      <h3>{status}</h3>
      <p>{message}</p>
    </div>
  )
}
