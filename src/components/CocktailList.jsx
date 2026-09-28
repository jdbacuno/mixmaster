import Wrapper from '../assets/wrappers/CocktailList';
import CocktailCard from './CocktailCard';

const CocktailList = ({ drinks, searchTerm }) => {
  if (!drinks) {
    return <h4 style={{ textAlign: 'center' }}>no matching cocktails found</h4>;
  }

  const formattedDrinks = drinks.map((drink) => {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink;

    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });

  return (
    <Wrapper>
      {formattedDrinks.map((item) => {
        return <CocktailCard key={item.id} {...item} searchTerm={searchTerm} />;
      })}
    </Wrapper>
  );
};
export default CocktailList;
