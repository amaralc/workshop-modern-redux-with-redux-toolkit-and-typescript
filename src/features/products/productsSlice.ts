import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Product } from "../../app/api";

export interface ProductsState {
  products: {
    [productId: string]: Product;
  };
}

const initialState: ProductsState = {
  products: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    receivedProducts: (state, action: PayloadAction<Product[]>) => {
      const products = action.payload;
      products.forEach((product) => {
        state.products[product.id] = product;
      });
    },
  },
});

export const { receivedProducts } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
