import { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useRedux } from '../../../../store/hooks'
import { selectLanguage, selectUser } from '../../../../store/slices/appSlice'
import { Product } from '../../../../types'
import EventEmitter from '../../../../utils/EventEmitter'
import { selectProductCategories } from '../../../../store/slices/categorySlice'
import { selectProducts } from '../../../../store/slices/productSlice'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NutritionStackParamList } from '..'
import { NUTRITION } from '../../../../navigation/ROUTES'

export type AddOnlyProductsScreenNavigationProp = NativeStackNavigationProp<
	NutritionStackParamList,
	NUTRITION.ADD_ONLY_PRODUCTS
>

export type AddOnlyProductsScreenRouteProp = RouteProp<
	NutritionStackParamList,
	NUTRITION.ADD_ONLY_PRODUCTS
>

export const AddProductsHooks = () => {
	const navigation = useNavigation<AddOnlyProductsScreenNavigationProp>()
	const route = useRoute<AddOnlyProductsScreenRouteProp>()
	const [language] = useRedux(selectLanguage)
	const [productCategories] = useRedux(selectProductCategories)
	const [user] = useRedux(selectUser)
	const [allProducts] = useRedux(selectProducts)

	const [searchValue, setSearchValue] = useState('')
	const [activeTab, setActiveTab] = useState(0)
	const [activeCategory, setActiveCategory] = useState(0)
	const [products, setProducts] = useState<Product[]>([])
	const [selected, setSelected] = useState<Product[]>([])

	const { products: productss, back } = route.params ?? {}

	useEffect(() => {
		setActiveCategory(0)
	}, [activeTab])

	const getProducts = () => {
		let arr: Product[] = []

		if (activeTab) {
			arr = [...allProducts.filter(elem => !elem.userProduct)]
		} else {
			arr = [...(user?.products ?? [])]
		}

		setProducts(arr.filter(p => p.category?._id === productCategories[activeCategory]?._id))
	}

	useEffect(() => {
		getProducts()
	}, [activeTab, activeCategory])

	const onSearch = () => {}

	const onSelect = (product: Product) => {
		let arr = [...selected]

		if (selected.find(s => s._id === product._id)) {
			arr = arr.filter(a => a._id !== product._id)
		} else {
			arr.push(product)
		}

		setSelected(arr)
	}

	const onAdd = () => {
		EventEmitter.notify('onAddProducts', [...productss, ...selected])
		navigation.goBack()
	}

	const navigateSearch = () => {
		navigation.navigate(NUTRITION.ADD_ONLY_SEARCH, { products: productss, back })
	}

	return {
		searchValue,
		setSearchValue,
		activeTab,
		setActiveTab,
		activeCategory,
		setActiveCategory,
		products,
		selected,
		onSearch,
		onSelect,
		onAdd,
		language,
		productCategories,
		navigateSearch
	}
}
