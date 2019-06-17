import * as React from 'react';
import { IngredientModel } from '../stores/models/Ingredient';

interface IBurgerProps {
  ingredients: Array<typeof IngredientModel.Type>;
}

export const Burger: React.FC<IBurgerProps> = ({ingredients}) => {
    return (
      <div>
        {ingredients.map((ingredient: typeof IngredientModel.Type, index: number) => (
                  <div style={{ margin: '-10px 0' }} key={index}><img alt={ingredient.name} width="75" src={`images/burger-assets/${ingredient.name}.png`} /></div>
        ))}
      </div>
    );
};
