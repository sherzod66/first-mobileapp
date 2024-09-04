import { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NUTRITION } from '../../../../navigation/ROUTES'
import { useRedux } from '../../../../store/hooks'
import { selectLanguage, selectUser, setUser } from '../../../../store/slices/appSlice'
import {
	selectDishCategories,
	selectProductCategories
} from '../../../../store/slices/categorySlice'
import { selectProducts } from '../../../../store/slices/productSlice'
import { selectDishes } from '../../../../store/slices/dishSlice'
import {
	Category,
	CategoryType,
	Product,
	Response,
	SchemaNutrition1,
	User
} from '../../../../types'
import { convertDishToProduct } from '../../../../utils/convertDishToProduct'
import EventEmitter from '../../../../utils/EventEmitter'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NutritionStackParamList } from '..'
import { ApiService } from '../../../../services'
import { PRODUCT_AMOUNT } from '../../../../constants/AMOUNT'

export type AddProductsScreenNavigationProp = NativeStackNavigationProp<
	NutritionStackParamList,
	NUTRITION.ADD_PRODUCTS
>

export type AddProductsScreenRouteProp = RouteProp<NutritionStackParamList, NUTRITION.ADD_PRODUCTS>

export const AddProductsHooks = () => {
	const navigation = useNavigation<AddProductsScreenNavigationProp>()
	const route = useRoute<AddProductsScreenRouteProp>()
	const [user, dispatch] = useRedux(selectUser)
	const [language] = useRedux(selectLanguage)
	const [productCategories] = useRedux(selectProductCategories)
	const [dishCategories] = useRedux(selectDishCategories)
	const [allProducts] = useRedux(selectProducts)
	const [allDishes] = useRedux(selectDishes)
	//console.log(allDishes);

	const [searchValue, setSearchValue] = useState('')
	const [activeTab, setActiveTab] = useState<number>(0)
	const [activeCategory, setActiveCategory] = useState(0)
	const [categories, setCategories] = useState<Category[]>([])
	const [products, setProducts] = useState<Product[]>([])
	const [selected, setSelected] = useState<Product[]>([])
	const [loading, setLoading] = useState(false)

	const {
		products: productss,
		schemaNutrition,
		goBackNavigation,
		activeType,
		index,
		reception
	} = route.params ?? {}

	const getCategories = () => {
		setActiveCategory(0)

		if (activeTab === 0) {
			setCategories(productCategories)
		} else if (activeTab === 1) {
			setCategories(productCategories)
		} else {
			setCategories(dishCategories)
		}
	}

	useEffect(() => {
		getCategories()
	}, [activeTab])
	const getProducts = async () => {
		if (categories.length && user) {
			let arr: Product[] = []

			if (activeTab) {
				if (activeTab === 2) {
					console.log(activeTab)
					arr = [...user.dishes.map(dish => convertDishToProduct(dish))]
				} else {
					arr = [...user.products]
				}
			} else {
				arr = [...allProducts.filter(elem => !elem.userProduct)]
			}
			if (activeTab === 2) {
				setProducts([...arr])
			} else {
				setProducts(arr.filter(p => p.category?._id === categories[activeCategory]?._id))
			}
		}
	}

	useEffect(() => {
		getProducts()
	}, [activeTab, categories, activeCategory])

	const onSearch = () => {
		console.log('onSearch')
	}

	const onCreate = () => {
		navigation.navigate(NUTRITION.CREATE_DISH as never)
	}

	const onSelect = (product: Product) => {
		let arr = [...selected]

		if (selected.find(s => s?._id === product?._id)) {
			arr = arr.filter(a => a?._id !== product?._id)
		} else {
			arr.push(product)
		}

		setSelected(arr)
	}

	const onAdd = async () => {
		if (schemaNutrition) {
			setLoading(true)

			let arr1: string[] = schemaNutrition.products.map(p => p?._id)
			let arr2: string[] = schemaNutrition.dishes.map(d => d?._id)
			let amountsP: number[] = [...schemaNutrition.amountsP]
			let amountsD: number[] = [...schemaNutrition.amountsD]

			selected.map(s => {
				console.log(JSON.stringify(s, null, 4))
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
		navigation.goBack()
	}

	const saveSchemaNutrition = async (obj: SchemaNutrition1) => {
		if (user) {
			await ApiService.put(`/users/set-schema-nutrition/${user._id}`, obj)

			const res = await ApiService.get<Response<User>>('/users/me')

			dispatch(setUser(res.data))
		}
	}

	const navigateSearch = () => {
		if (goBackNavigation === 'ADD_RECEPTION') {
			navigation.navigate(NUTRITION.MEAL_PLANS_SEARCH, {
				products: productss,
				schemaNutrition,
				goBackNavigation,
				activeType,
				index,
				reception
			})
		} else {
			navigation.navigate(NUTRITION.ADD_PRODUCTS_SEARCH, {
				products: productss,
				schemaNutrition,
				goBackNavigation,
				activeType,
				index,
				reception
			})
		}
	}

	return {
		searchValue,
		setSearchValue,
		goBackNavigation,
		activeTab,
		setActiveTab,
		activeCategory,
		setActiveCategory,
		loading,
		products: !!searchValue
			? products.filter(e => e.name.ru.indexOf(searchValue) !== -1)
			: products,
		selected,
		onSearch,
		onCreate,
		onSelect,
		onAdd,
		language,
		categories,
		navigateSearch
	}
}
