import { types } from "mobx-state-tree";

export const ingredientOrder = types.enumeration(['FIRST', 'ANY', 'LAST'])
export const IngredientModel = types.model('Ingredient', {
    name: types.string,
    id: types.identifier,
    required: false,
    order: types.optional(ingredientOrder, 'ANY')
})