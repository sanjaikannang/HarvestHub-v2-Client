import { Provider } from "react-redux"
import AppRoutes from "./routes/AppRoutes"
import { ToastContainer } from "react-toastify"
import { store } from "./app/store"

function App() {

  return (
    <>
      <Provider store={store}> {/* Provides the store to all components */}
        <AppRoutes /> {/* App routes handle navigation */}
        <ToastContainer position="top-right" autoClose={3000} /> {/* Toast notifications */}
      </Provider>
    </>
  )
}

export default App
