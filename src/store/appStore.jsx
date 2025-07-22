import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice.jsx"

const store = configureStore({
  reducer: {
    userData: userReducer,
  },
})

export default store
