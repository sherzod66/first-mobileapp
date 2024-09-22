import { NUTRITION_TYPE, User } from './index'
import { BaseData } from '.'
import { Product } from './product'
import { Dish } from './dish'

export type NutritionPlan = BaseData & {
	creatorName: string
	title: string
	description: string
	calories: number
	proteinPercent: number
	oilPercent: number
	type: NUTRITION_TYPE
	price: number
	nutritions: Reception[][]
	users: string[]
	creatorUser?: User
}

export type Reception = {
	products: Product[]
	amountsP: number[]
	dishes: Dish[]
	amountsD: number[]
	recommendation: string
}
