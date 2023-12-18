
import { configureStore, createSlice } from "@reduxjs/toolkit";

const mainReducer = createSlice(
  {
    name: "main",
    initialState: {
      data: ["no data yet"]
    }
  }
);

const redux = configureStore({
  reducer: {
    main: mainReducer.reducer,
  }
});

export default redux;