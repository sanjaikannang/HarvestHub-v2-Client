import { Provider } from "react-redux"
import AppRoutes from "./routes/AppRoutes"
import { ToastContainer } from "react-toastify"
import { store } from "./app/store"

function App() {

  return (
    <>
      <Provider store={store}>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </Provider>
    </>
  )
}

export default App
