import { createSlice } from "@reduxjs/toolkit";

import type { Product } from "../../app/api";

export interface ProductsState {
  items: {
    [productId: string]: Product;
  };
}

const initialState: ProductsState = {
  items: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const productsReducer = productsSlice.reducer;
