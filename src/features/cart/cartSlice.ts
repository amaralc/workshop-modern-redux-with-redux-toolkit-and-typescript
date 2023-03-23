import { createSlice } from "@reduxjs/toolkit";

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
  reducers: {},
});

export const cartReducer = cartSlice.reducer;
