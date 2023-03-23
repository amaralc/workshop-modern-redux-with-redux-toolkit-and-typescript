import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CartState {
  items: {
    [productId: string]: number;
  };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      if (state.items[id]) {
        state.items[id] += 1;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const getNumItemsSelector = (state: RootState) => {
  console.log("Calling num items");
  let numItems = 0;

  for (let id in state.cart.items) {
    numItems += state.cart.items[id];
  }

  return numItems;
};

export const getMemoizedNumItemsSelector = createSelector(
  // As long as this part of the state is the same...
  (state: RootState) => state.cart.items,

  // ...this function will only be called once
  (items) => {
    console.log("Getting memoized num items");
    let numItems = 0;

    for (let id in items) {
      numItems += items[id];
    }

    return numItems;
  }
);

export const getTotalPrice = createSelector(
  // As long as this parts of the state are the same...
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,

  // ...this function will only be called once
  (items, products) => {
    let total = 0;

    for (let id in items) {
      total += products[id].price * items[id];
    }

    return total.toFixed(2);
  }
);
