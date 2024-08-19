import { combineReducers } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-community/async-storage'
import { persistReducer } from 'redux-persist'
// @ts-ignore
import { PersistPartial } from 'redux-persist/lib/persistReducer'
import appReducer, { AppState } from './appSlice'
import categoryReducer, { CategoryState } from './categorySlice'
import productReducer from './productSlice'
import dishReducer from './dishSlice'
import { Dish, Product } from '../../types'
import copyProductReducer from './copyDataSlice'

export type RootState = {
	app: AppState & PersistPartial
	category: CategoryState
	products: Product[]
	dishes: Dish[]
	copyProduct: Product[]
}

export const rootReducer = combineReducers<RootState>({
	app: persistReducer(
		{
			key: 'app',
			storage: AsyncStorage
		},
		appReducer
	),
	category: categoryReducer,
	products: productReducer,
	dishes: dishReducer,
	copyProduct: copyProductReducer
})
