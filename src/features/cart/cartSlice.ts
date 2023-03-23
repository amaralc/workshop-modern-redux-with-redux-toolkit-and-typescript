import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  },
});

export const { addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const getNumItemsSelector = (state: RootState) => {
  let numItems = 0;

  for (let id in state.cart.items) {
    numItems += state.cart.items[id];
  }

  return numItems;
};
