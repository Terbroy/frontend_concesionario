
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

const apiVehicles = "https://sincoayf-concesionario-api.up.railway.app/api/v1";

export const priceSlice = createSlice({
    name: 'price',
    initialState: [],
    reducers: {
        setPrice: (state , actions) => {
            return actions.payload
        },

    }
})


export const { setPrice } = priceSlice.actions;


export const getPricesThunk = () => async dispatch => {
    return await axios.get(`${apiVehicles}/price`, getConfig())
        .then((res) => dispatch(setPrice(res.data)))
};

export default priceSlice.reducer;