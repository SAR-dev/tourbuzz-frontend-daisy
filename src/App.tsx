import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Tour from "./pages/Tour";
import MainLightBox from "./components/MainLightBox";
import MainToaster from "./components/MainToaster";
import { NotificationProvider } from "./components/Notification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <MainLightBox />
        <MainToaster />
        <RouterProvider router={router} />
      </NotificationProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
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
