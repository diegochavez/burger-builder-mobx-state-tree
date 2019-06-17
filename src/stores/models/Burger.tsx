import { types } from "mobx-state-tree";
import { IngredientModel } from "./Ingredient";

export const burgerState = types.enumeration(['Idle', 'Process', 'Done'])
export const BurgerModel = types.model('BurgerModel', {
    id: types.identifier,
    ingredients: types.array(types.late(() => types.reference(IngredientModel))),
    state: burgerState
}).views(self => ({
    get listIngredients(){
        return self.ingredients.toJS();
    }
}));