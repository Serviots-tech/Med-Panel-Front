
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { ToastContainer } from "react-toastify"
// import EditMedicinePage from "./pages/EditMedicinePage"

function App() {

  return (
    <>
      <>
        <RouterProvider router={router} />
        <ToastContainer  toastStyle={{ fontSize: "15px" }}/>
      </>
    </>
  )
}

export default App


