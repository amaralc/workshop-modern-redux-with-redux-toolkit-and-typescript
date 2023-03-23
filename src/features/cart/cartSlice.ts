import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CartItems, checkout } from "../../app/api";
import { RootState } from "../../app/store";

type CheckoutState = "LOADING" | "READY" | "ERROR";

export interface CartState {
  items: {
    [productId: string]: number;
  };
  checkoutState: CheckoutState;
}

const initialState: CartState = {
  items: {},
  checkoutState: "READY",
};

export const checkoutCart = createAsyncThunk(
  "cart/checkout",
  async (items: CartItems) => {
    const response = await checkout(items);
    return response;
  }
);

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
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkoutCart.pending, (state) => {
      state.checkoutState = "LOADING";
    });
    builder.addCase(checkoutCart.fulfilled, (state) => {
      state.checkoutState = "READY";
    });
    builder.addCase(checkoutCart.rejected, (state) => {
      state.checkoutState = "ERROR";
    });
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
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
