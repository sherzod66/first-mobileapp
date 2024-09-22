import { useEffect, useState } from 'react'
import { CategoryType, Product, Response, SchemaNutrition1, User } from '../../../../types'
import { useRedux } from '../../../../store/hooks'
import { selectUser, setUser } from '../../../../store/slices/appSlice'

import { selectProducts } from '../../../../store/slices/productSlice'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { PRODUCT_AMOUNT } from '../../../../constants/AMOUNT'
import { ApiService } from '../../../../services'
import EventEmitter from '../../../../utils/EventEmitter'
import { NutritionStackParamList } from '..'
import { NUTRITION } from '../../../../navigation/ROUTES'
import { SchemaNutritionScreenNavigationProp } from '../nutrition-layout/schema-nutrition/hooks'
import { convertDishToProduct } from '../../../../utils/convertDishToProduct'
import { useTranslation } from 'react-i18next'

export type AddProductsScreenRouteProp = RouteProp<
	NutritionStackParamList,
	NUTRITION.ADD_PRODUCTS_SEARCH
>

export const SearchHooks = () => {
	const navigation = useNavigation<SchemaNutritionScreenNavigationProp>()
	const [allProducts] = useRedux(selectProducts)
	const route = useRoute<AddProductsScreenRouteProp>()
	const [user, dispatch] = useRedux(selectUser)
	const [dish, setDish] = useState<Product[]>([])
	const { i18n } = useTranslation()
	//const [language] = useRedux(selectLanguage);
	const [searchValue, setSearchValue] = useState<string>('')
	const [selected, setSelected] = useState<Product[]>([])
	const [loading, setLoading] = useState(false)
	const [foundProduct, setFoundProduct] = useState<Product[]>([])

	useEffect(() => {
		if (user) {
			if (searchValue.length > 1)
				setFoundProduct([
					...allProducts.filter(elem => {
						if (!elem.userProduct) {
							return elem.name.ru.toLowerCase().includes(searchValue.toLowerCase())
						}
					}),
					...user.products.filter(elem =>
						elem.name.ru.toLowerCase().includes(searchValue.toLowerCase())
					),
					...dish.filter(item => item.name.ru.toLowerCase().includes(searchValue.toLowerCase()))
				])
			else setFoundProduct([])
			setDish([...user.dishes.map(item => convertDishToProduct(item))])
		}
	}, [searchValue])

	const onSelect = (product: Product) => {
		let arr = [...selected]

		if (selected.find(s => s?._id === product?._id)) {
			arr = arr.filter(a => a?._id !== product?._id)
		} else {
			arr.push(product)
		}

		setSelected(arr)
	}
	const {
		products: productss,
		schemaNutrition,
		goBackNavigation,
		activeType,
		index,
		reception
	} = route.params ?? {}
	console.log(productss)

	const onAdd = async () => {
		if (schemaNutrition) {
			setLoading(true)

			let arr1: string[] = schemaNutrition.products.map(p => p?._id)
			let arr2: string[] = schemaNutrition.dishes.map(d => d?._id)
			let amountsP: number[] = [...schemaNutrition.amountsP]
			let amountsD: number[] = [...schemaNutrition.amountsD]

			selected.map(s => {
				if (s.category?.type) {
					if (s.category.type === CategoryType.PRODUCT) {
						arr1.push(s?._id)
						amountsP.push(PRODUCT_AMOUNT)
					}
				} else {
					if (s.products && s.amounts) {
						s.products.forEach((product, index) => {
							arr1.push(product._id)
							amountsP.push(s.amounts[index])
						})
					}
				}
			})
			console.log(arr1)

			// @ts-ignore
			const cd = new Date(JSON.parse(schemaNutrition.date))

			const date = {
				year: cd.getFullYear(),
				month: cd.getMonth() + 1,
				day: cd.getDate()
			}

			const obj = {
				...schemaNutrition,
				date,
				data: {
					...schemaNutrition.data,
					type: schemaNutrition.data.nType
				},
				products: arr1,
				dishes: arr2,
				amountsP,
				amountsD
			}
			try {
				await saveSchemaNutrition(obj)
			} catch (e) {
				console.log('e: ', e)
			}

			setLoading(false)
		} else {
			EventEmitter.notify('onAddProducts', [...productss, ...selected])
		}
		if (goBackNavigation === 'CONSUME_CALENDAR') {
			navigation.navigate(NUTRITION.CONSUME_CALENDAR, {
				tab: activeType ? activeType : 0
			})
		} else {
			navigation.navigate(NUTRITION.ADD_RECEPTION, {
				index: index ? index : 0,
				reception: reception ? reception : null
			})
		}
	}

	const saveSchemaNutrition = async (obj: SchemaNutrition1) => {
		if (user) {
			await ApiService.put(`/users/set-schema-nutrition/${user._id}`, obj)

			const res = await ApiService.get<Response<User>>('/users/me')

			dispatch(setUser(res.data))
		}
	}

	return {
		foundProduct,
		selected,
		setSelected,
		loading,
		setLoading,
		onAdd,
		onSelect,
		setSearchValue,
		i18n
	}
}
