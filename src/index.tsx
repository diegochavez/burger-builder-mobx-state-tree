import * as React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import App from "./components/App";
import { onSnapshot } from "mobx-state-tree";
import BurgerStore from "./stores/RootStore";

let initialState =  {
    ingredients: [
      { name: 'bread1', id: '1', required: true, order: 'FIRST'},
      { name: 'tomato', id: '2', order: 'ANY'},
      { name: 'meat', id: '3', required: true, order: 'ANY'},
      { name: 'cheese', id: '4', order: 'ANY'},
      { name: 'bread2', id: '5', required: true, order: 'LAST'}
    ]
} as typeof BurgerStore.CreationType;
if (localStorage.getItem("myApp")) {
  initialState = JSON.parse(`${localStorage.getItem("myApp")}`);
}
const store = BurgerStore.create(initialState);
onSnapshot(store, stateLog =>
  localStorage.setItem("myApp", JSON.stringify(stateLog))
);
const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
