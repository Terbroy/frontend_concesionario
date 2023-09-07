import { configureStore } from '@reduxjs/toolkit'
import loaderSlice from './slices/loader.slice'
import vehiclesSlice from './slices/vehicles.slice'
import priceSlice from './slices/price.slice'

export default configureStore({
  reducer: {
        loader: loaderSlice,
        vehicles: vehiclesSlice,
        price: priceSlice
	}
})