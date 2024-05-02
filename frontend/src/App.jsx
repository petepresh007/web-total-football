import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./components/errorPage";
import { SharedLayout } from "./components/sharedlayout";
import {HomePage} from "./pages/homepage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"/",
        element: <HomePage/>
      }
    ]
  }
])



function App() {
  return (
    <RouterProvider router={router} >
    </RouterProvider>
  )
}

export default App