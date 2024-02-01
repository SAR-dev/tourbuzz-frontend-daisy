import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import { useImageModalStore } from "./stores/imageModalStore";
import { Lightbox } from "react-modal-image";
import Tour from "./pages/Tour";

const App = () => {
  const { url, closeModal } = useImageModalStore()
  return (
    <div>
      {url && (
        <Lightbox
          medium={url}
          large={url}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
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
  {
    path: "/tours/:id",
    element: <Tour />,
  },
]);

export default App
