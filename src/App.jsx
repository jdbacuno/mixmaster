import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HomeLayout, Landing, About, Cocktail, Newsletter, Error, SinglePageError } from './pages';

// loaders and action
import { loader as landingLoader } from './pages/Landing';
import { loader as singleCocktailLoader } from './pages/Cocktail';
import { action as newsletterAction } from './pages/Newsletter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // how long the query will be valid (5 minutes in milliseconds)
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    // element: <h2>home page</h2>,
    element: <HomeLayout />,
    errorElement: <Error />,

    // children would usually have the same Navbar Footer
    // that is situated in the <HomeLayout />
    // HomeLayout should render the children within
    // using Outlet component
    children: [
      {
        index: true,
        // path: 'landing',
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryClient),
      },
      {
        path: 'cocktail/:id',
        element: <Cocktail />,
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
        action: newsletterAction,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  // return <h2>MixMaster</h2>;
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};
export default App;
