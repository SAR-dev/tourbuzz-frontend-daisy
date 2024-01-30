import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import { useImageModalStore } from "./stores/imageModalStore";
import { Lightbox } from "react-modal-image";

const App = () => {
  const { url, closeModal } = useImageModalStore()
  return (
    <div>
      {url && (
        <Lightbox
          medium={url}
          large={url}
          // @ts-expect-error
          onClose={closeModal}
        />
      )}
      <RouterProvider router={router} />
    </div>
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
]);

export default App
