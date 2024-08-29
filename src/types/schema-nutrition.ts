import { NUTRITION_TYPE } from '.'
import { Dish } from './dish'
import { Product } from './product'

export type SchemaNutrition = {
	date: Date
	data: SchemaNutritionData
	products: Product[]
	amountsP: number[]
	dishes: Dish[]
	amountsD: number[]
}

export type SchemaNutritionData = {
	nType: NUTRITION_TYPE
	dailyNorm: number
	amount: number
	proteinPercent: number
	oilPercent: number
	mergeAmount: number
	mergeCarb: number
}

export type SchemaNutrition1 = {
	date: {
		year: number
		month: number
		day: number
	}
	data: {
		nType: NUTRITION_TYPE
		dailyNorm: number
		amount: number
		proteinPercent: number
		oilPercent: number
		mergeAmount: number
		mergeCarb: number
	}
	products: string[]
	amountsP: number[]
	dishes: string[]
	amountsD: number[]
}
