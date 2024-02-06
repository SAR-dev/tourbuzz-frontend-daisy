import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import { Toaster } from 'react-hot-toast';
import Tour from "./pages/Tour";
import MainLightBox from "./components/MainLightBox";

const App = () => {
  return (
    <>
      <MainLightBox />
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
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
