import { Link, useLoaderData, Navigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../assets/wrappers/CocktailPage';
import { queryOptions, useQuery } from '@tanstack/react-query';

const singleCocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const singleCocktailQuery = (id) => {
  queryOptions({
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  });
};

// export const loader = async (data) => {
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    // const { data } = await axios.get(`${singleCocktailUrl}${id}`);
    // return { id, data };

    await queryClient.query(singleCocktailQuery(id));
    return { id };
  };

const Cocktail = () => {
  // const { id, data } = useLoaderData();
  const { id } = useLoaderData();
  const { data } = useQuery(singleCocktailQuery(id));
  const [searchParams] = useSearchParams(); // ?search=margarita
  const searchTerm = searchParams.get('search');

  // axios return data.drinks[0] as null if the id is just an incorrect number
  // unlike when the id is just alphanumeric or string of gibberish, the whole data will be null
  // so check for the data.drinks if null as well
  if (!data || data.drinks === null) return <Navigate to='/' />;

  const singleDrink = data.drinks[0];

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  const capitalizeWords = (str) =>
    str
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');

  const addAndConjunction = (arr) => {
    if (arr.length === 2) return arr.join(' and ');
    if (arr.length > 2) return arr.slice(0, arr.length - 1).join(', ') + `, and ${arr.at(-1)}`;
    return arr.join('');
  };

  const ingredients = Object.keys(singleDrink)
    .filter((key) => key.startsWith('strIngredient') && singleDrink[key])
    .map((ingredient) => singleDrink[ingredient]);

  const formattedIngredients = ingredients.map((ingredient) => capitalizeWords(ingredient));

  // console.log(addAndConjunction(formattedIngredients));

  return (
    <Wrapper>
      <header>
        <Link to={`/?search=${searchTerm}`} className='btn'>
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>Name: </span>
            {name}
          </p>
          <p>
            <span className='drink-data'>Category: </span>
            {category}
          </p>
          <p>
            <span className='drink-data'>Info: </span>
            {info}
          </p>
          <p>
            <span className='drink-data'>Glass: </span>
            {glass}
          </p>
          <p>
            <span className='drink-data instructions'>Instructions: </span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>Ingredients: </span>
            {addAndConjunction(formattedIngredients)}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Cocktail;
