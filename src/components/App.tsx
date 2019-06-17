import * as React from "react";
import { observer, inject } from "mobx-react";
import withRoot from "../withRoot";
import { Button, Typography, Paper, AppBar, Toolbar, Grid } from "@material-ui/core";
import Ingredient from "./Ingredient";
import { BurgerModel } from "../stores/models/Burger";
import { IngredientModel } from "../stores/models/Ingredient";
import BurgerStore from "../stores/RootStore";
import { Burger } from "./Burger";

interface AppProps {
  store?: typeof BurgerStore.Type;
}
export const App = ({ store }: AppProps) => {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Burger Factory
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '20px', alignContent: 'center', textAlign: 'center' }}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Typography gutterBottom variant={'h3'}>Ingredients</Typography>
          {store!.listIngredients.map((item: any) => (
            <Ingredient key={item.id} id={item.id} itemAdded={(item: any) => store!.addIngredient(item)} name={item.name} />
          ))}
          <div style={{ clear: 'both' }}></div>
        </Grid>
        <hr />
        <h2>Ingredients in table</h2>
        {(store!.containsIngredients && !store!.qualityCheck) && (<Typography color="secondary" variant="caption">What you are doing!?</Typography>)}

        {store!.listCurrentPrep.map((ingredient: typeof IngredientModel.Type, index: number) => (
          <div key={index}><img alt={ingredient.name} width="100" src={`images/burger-assets/${ingredient.name}.png`} /><Button onClick={() => store!.removeIngredient(ingredient.id)}>X</Button></div>
        ))}

        <div>
          <Button disabled={!store!.containsIngredients || !store!.qualityCheck} color="primary" variant="contained" onClick={() => store!.createBurger()}>
            Create Burger
        </Button>
        </div>
        <h2>Delivered burgers {store!.deliveredCount}</h2>
        <Grid container
          direction="row"
          justify="center"
          alignItems="flex-start">
          {store!.readyToDeliver.map((burger: typeof BurgerModel.Type, index: number) => (
            <Grid item key={index}>
              <Paper style={{ padding: '10px' }} key={index}>
                {burger.listIngredients && <Burger ingredients={burger.listIngredients} />}
              </Paper>
            </Grid>
          ))}
        </Grid>

      </div>
    </div>
  );
};

export default inject("store")(withRoot(observer(App)));
