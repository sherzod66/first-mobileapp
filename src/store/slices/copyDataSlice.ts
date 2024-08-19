import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { Product } from '../../types'

const initialState: Product[] = []

const {
	actions: { setCopyProducts, clearCopyProducts },
	reducer
} = createSlice({
	name: 'copyProductSlice',
	initialState,
	reducers: {
		setCopyProducts: (state, action: PayloadAction<Product[]>) => {
			return [...action.payload]
		},

		clearCopyProducts: () => {
			return [...initialState]
		}
	}
})

export { clearCopyProducts, setCopyProducts }

export const copyProductSlice = ({ copyProduct }: RootState) => copyProduct

export default reducer
