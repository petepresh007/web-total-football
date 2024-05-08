import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./components/errorPage";
import { SharedLayout } from "./components/sharedlayout";
import { HomePage } from "./pages/homepage";
import { News } from "./pages/news";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { CreatedContext } from './components/constext';
import {CreateNews} from './components/createNews';
import {EPL} from "./pages/epl";
import {Laliga} from "./pages/laliga";
import {Bundesliga} from "./pages/bundesliga";
import {SerieA} from "./pages/seriea";
import {NPFL} from "./pages/npfl";
import {UCL} from "./pages/ucl";


const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/news/:id",
        element: <News />
      },
      {
        path: "/adminlogin",
        element: <Login />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/createnews",
        element: <CreateNews/>
      },
      {
        path:"/epl",
        element: <EPL/>
      },
      {
        path:"/laliga",
        element:<Laliga/>
      },
      {
        path:"/bundesliga",
        element:<Bundesliga/>
      },
      {
        path:"/seriea",
        element: <SerieA/>
      },
      {
        path:"/npfl",
        element:<NPFL/>
      },
      {
        path:"/ucl",
        element:<UCL/>
      }
    ]
  }
])



function App() {
  return (
    <CreatedContext>
      <RouterProvider router={router} >
      </RouterProvider>
    </CreatedContext>
  )
}

export default App