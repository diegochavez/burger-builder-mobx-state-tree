import { types, detach, getSnapshot } from "mobx-state-tree";
import { IngredientModel } from "./models/Ingredient";
import { BurgerModel, burgerState } from "./models/Burger";

const Ingredients = types.model('Ingredients', {
    ingredients: types.array(IngredientModel),
}).views((self) => ({
    get listIngredients(): Array<typeof IngredientModel.Type> {
        return self.ingredients.toJS();
    },
}))

const Delivery = types.model('Delivery', {
    delivery: types.array(BurgerModel),
}).views((self) => ({
    get deliveredCount() {
        return self.delivery.length;
    },
    get readyToDeliver() {
        return self.delivery.toJS();
    },
}))

const currentBurger = types.model('BurgerStore', {
    currentBurgerIngredients: types.array(types.reference(IngredientModel)),
    currentBurgerState: types.optional(burgerState, 'Idle'),
}).views((self) => ({
    get containsIngredients() {
        return self.currentBurgerIngredients.length > 0;
    },
    get listCurrentPrep(){
        return self.currentBurgerIngredients.toJS();
    },
    get isValidBurger() {
        return self.currentBurgerIngredients.toJS().filter(x => x.required).length > 2;
    },
    get qualityCheck() {
        const last = self.currentBurgerIngredients.toJS().length - 1;
        const list = self.currentBurgerIngredients.toJS();
        const valid = (list[0] && list[last]) && (list[0].order === 'FIRST' && list[last].order === 'LAST');
        return valid;
    }
}));

const RootStore = types.compose(Ingredients, Delivery, currentBurger)
    .actions((self) => ({
        addIngredient(newIngredient: typeof IngredientModel.Type) {
            if (newIngredient && self.ingredients.find((x) => x.id === newIngredient.id)) {
                self.currentBurgerState = 'Process';
                const foundItem = self.ingredients.find((x) => x.id === newIngredient.id);
                if (foundItem) {
                    self.currentBurgerIngredients!.unshift(foundItem);
                }
            }
        },
        removeIngredient(id: string) {
            const foundItem = self.ingredients.find((x) => x.id === id);
            if (foundItem) {
                self.currentBurgerIngredients!.remove(foundItem);
            }
        },
        createBurger() {
            if (self.currentBurgerIngredients!.length > 0 && self.isValidBurger) {
                self.currentBurgerState = 'Done';
                const state = self.currentBurgerState;
                const dateCreated = new Date().toISOString();
                const ingredients = getSnapshot(self.currentBurgerIngredients);
                detach(self.currentBurgerIngredients);
                self.delivery.push({ state, id: dateCreated, ingredients });
            } else {
                alert('Wait that\'s not a real burger');
            }
        }
    }));

export default RootStore;