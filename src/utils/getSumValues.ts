import { PRODUCT_AMOUNT } from '../constants/AMOUNT'
import { Product } from '../types'

export const getSumValues = (
	products: Product[],
	amounts: number[],
	key: 'calories' | 'protein' | 'oil' | 'carb'
): number =>
	products
		.map((p, i) => {
			// console.log("p: ", JSON.stringify(p, null, 4));
			let calculatedValue = 0

			calculatedValue = (amounts[i] ?? 0) / PRODUCT_AMOUNT

			return p[key] * calculatedValue
		})
		.reduce((acc, val) => acc + val, 0)
