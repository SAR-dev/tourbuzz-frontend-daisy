import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotificationProvider } from "./contexts/Notification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from "react-error-boundary";

import Home from "./pages/Home";
import Article from "./pages/Article";
import Tour from "./pages/Tour";
import MainLightBox from "./components/MainLightBox";
import MainToaster from "./components/MainToaster";
import ErrorFallback from "./components/ErrorFallback";
import { ReactionProvider } from "./contexts/Reaction";

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactionProvider>
        <NotificationProvider>
          <MainLightBox />
          <MainToaster />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </NotificationProvider>
      </ReactionProvider>
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
