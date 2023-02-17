import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    age: 15
}

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        age: (state) => {
            state.age = state.age + 1;
        }
    }
});

export const {age} = testSlice.actions;

export default testSlice.reducer;