import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

    // example modal payload
    private recipes: Recipe[] = [
        new Recipe('Nigerian Rice', 
        'This is simply a test', 
        'https://res.cloudinary.com/arm/image/upload/v1704033956/localman/fried_rice.jpg',
        [
            new Ingredient('Rice', 1),
            new Ingredient('Tomato', 1),
            new Ingredient('Chicken', 20)
        ])
      ];

      constructor(private slService: ShoppingListService) {}

      getRecipes() {
        return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}