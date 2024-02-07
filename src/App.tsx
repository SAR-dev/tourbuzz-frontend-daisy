import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Tour from "./pages/Tour";
import MainLightBox from "./components/MainLightBox";
import MainToaster from "./components/MainToaster";

const App = () => {
  return (
    <>
      <MainLightBox />
      <MainToaster />
      <RouterProvider router={router} />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/articles/:id",
    element: <Article />,
  },
  {
    path: "/tours/:id",
    element: <Tour />,
  },
]);

export default App
