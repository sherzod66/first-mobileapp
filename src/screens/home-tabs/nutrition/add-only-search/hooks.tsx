import { useEffect, useState } from 'react'
import { Product } from '../../../../types'
import { useRedux } from '../../../../store/hooks'
import { selectUser } from '../../../../store/slices/appSlice'

import { selectProducts } from '../../../../store/slices/productSlice'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import EventEmitter from '../../../../utils/EventEmitter'
import { NutritionStackParamList } from '..'
import { NUTRITION } from '../../../../navigation/ROUTES'
import { SchemaNutritionScreenNavigationProp } from '../nutrition-layout/schema-nutrition/hooks'

type AddProductsScreenRouteProp = RouteProp<NutritionStackParamList, NUTRITION.ADD_ONLY_SEARCH>

export const SearchHooks = () => {
	const navigation = useNavigation<SchemaNutritionScreenNavigationProp>()
	const [allProducts] = useRedux(selectProducts)
	const route = useRoute<AddProductsScreenRouteProp>()
	const [user, dispatch] = useRedux(selectUser)
	//const [language] = useRedux(selectLanguage);
	const [searchValue, setSearchValue] = useState<string>('')
	const [selected, setSelected] = useState<Product[]>([])
	const [loading, setLoading] = useState(false)
	const [foundProduct, setFoundProduct] = useState<Product[]>([])

	useEffect(() => {
		if (searchValue.length > 1 && user)
			setFoundProduct([
				...allProducts.filter(elem => {
					if (!elem.userProduct) {
						return elem.name.ru.toLowerCase().includes(searchValue.toLowerCase())
					}
				}),
				...user.products.filter(elem =>
					elem.name.ru.toLowerCase().includes(searchValue.toLowerCase())
				)
			])
		else setFoundProduct([])
	}, [searchValue, user])

	const onSelect = (product: Product) => {
		let arr = [...selected]

		if (selected.find(s => s._id === product._id)) {
			arr = arr.filter(a => a._id !== product._id)
		} else {
			arr.push(product)
		}

		setSelected(arr)
	}
	const { products: productss, back } = route.params ?? {}

	const onAdd = () => {
		EventEmitter.notify('onAddProducts', [...productss, ...selected])
		if (back) {
			navigation.goBack()
		} else {
			navigation.navigate(NUTRITION.CREATE_DISH)
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
		setSearchValue
	}
}
