import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const loaderSlice = createSlice({
	name: 'loader',
    initialState: true,
    reducers: {
        loading: (state, action) => {
            return action.payload
        }
    }
})

export const { loading } = loaderSlice.actions;

export default loaderSlice.reducer;