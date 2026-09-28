import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';
import { useQuery } from '@tanstack/react-query';

const cocktailSearchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

// no need to create a separate action method here for the search form
// since we can access the request object here
// but since this is loader, you have to make the request first to create the url
// then from the URL, you extract the search term
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);

    // the CocktailDB API doesn't allow empty search term
    const searchTerm = url.searchParams.get('search') || 'margarita';

    // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
    // return { drinks: response.data.drinks, searchTerm };

    // check for cached data/cached the data BEFORE the route renders result
    // useQuery, on the other hand,
    // fetch and caches the data and gives it to the component
    // prevents reloading (navigation.state === 'loading') if cached
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));

    return { searchTerm };
  };

const Landing = () => {
  // const outletGlobalData = useOutletContext(); // import useOutletContext
  // console.log(outletGlobalData);

  // const { drinks, searchTerm } = useLoaderData();
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} searchTerm={searchTerm} />
    </>
  );
};
export default Landing;
