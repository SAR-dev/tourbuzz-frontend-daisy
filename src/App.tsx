import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotificationProvider } from "./contexts/Notification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from "react-error-boundary";
import { ReactionProvider } from "./contexts/Reaction";

import Home from "./pages/Home";
import Article from "./pages/articles/Article";
import Tour from "./pages/tours/Tour";
import MainLightBox from "./components/MainLightBox";
import MainToaster from "./components/MainToaster";
import ErrorFallback from "./components/ErrorFallback";
import Enquiry from "./pages/chat/Enquiry";
import NotFound from "./pages/NotFound";
import Place from "./pages/places/Place";
import Organizer from "./pages/organizers/Organizer";
import Hotel from "./pages/hotels/Hotel";
import HotelList from "./pages/hotels/HotelList";
import TourList from "./pages/tours/TourList";
import ArticleList from "./pages/articles/ArticleList";
import OrganizerList from "./pages/organizers/OrganizerList";
import PlaceList from "./pages/places/PlaceList";
import TicketList from "./pages/tickets/TicketList";
import Ticket from "./pages/tickets/Ticket";
import ShopHome from "./pages/shop/ShopHome";

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
    path: "/articles",
    element: <ArticleList />,
  },
  {
    path: "/articles/:slug",
    element: <Article />,
  },
  {
    path: "/tours",
    element: <TourList />,
  },
  {
    path: "/tours/:slug",
    element: <Tour />,
  },
  {
    path: "/places",
    element: <PlaceList />,
  },
  {
    path: "/places/:id",
    element: <Place />,
  },
  {
    path: "/hotels",
    element: <HotelList />,
  },
  {
    path: "/hotels/:id",
    element: <Hotel />,
  },
  {
    path: "/organizers",
    element: <OrganizerList />,
  },
  {
    path: "/organizers/:username",
    element: <Organizer />,
  },
  {
    path: "/chat/enquiry",
    element: <Enquiry />
  },
  {
    path: "/tickets",
    element: <TicketList />
  },
  {
    path: "/tickets/:invoice_no",
    element: <Ticket />
  },
  {
    path: "/shop",
    element: <ShopHome />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default App
