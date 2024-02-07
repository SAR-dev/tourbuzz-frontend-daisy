import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Tour from "./pages/Tour";
import MainLightBox from "./components/MainLightBox";
import MainToaster from "./components/MainToaster";
import { NotificationProvider } from "./components/Notification";

const App = () => {
  return (
    <NotificationProvider>
      <MainLightBox />
      <MainToaster />
      <RouterProvider router={router} />
    </NotificationProvider>
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
