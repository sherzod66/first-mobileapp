import { useEffect, useState } from 'react'
import { useRedux } from '../../../../../store/hooks'
import { selectLanguage, selectUser, setUser } from '../../../../../store/slices/appSlice'
import { selectProductCategories } from '../../../../../store/slices/categorySlice'
import { setProducts as setProductsAction } from '../../../../../store/slices/productSlice'
import { ApiService } from '../../../../../services'
import { Product, ROLES } from '../../../../../types'
import { selectProducts } from '../../../../../store/slices/productSlice'
import { useNavigation } from '@react-navigation/native'
import { NUTRITION } from '../../../../../navigation/ROUTES'
import { Alert } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NutritionStackParamList } from '../..'
import { showSuccessToast } from '../../../../../utils/showToast'
import { useTranslation } from 'react-i18next'

type MyNutritionPlansScreenNavigationProp = NativeStackNavigationProp<
	NutritionStackParamList,
	NUTRITION.UPDATE_PART_PLAN
>

export const BaseProductsHooks = () => {
	const [language] = useRedux(selectLanguage)
	const [user, dispatch] = useRedux(selectUser)
	const [allProducts] = useRedux(selectProducts)
	const [productCategories] = useRedux(selectProductCategories)

	const [activeTab, setActiveTab] = useState(0)
	const [products, setProducts] = useState<Product[]>([])
	const [selected, setSelected] = useState<Product[]>([])
	const [loading, setLoading] = useState(false)
	const [search, setSearch] = useState<string>('')
	const { t, i18n } = useTranslation()

	const navigation = useNavigation<MyNutritionPlansScreenNavigationProp>()

	const getProducts = () => {
		console.log('UPDATING THE PRODUCTS')
		if (user) {
			setProducts(
				!!allProducts && allProducts.length > 0
					? allProducts
							.filter(e => e.name?.ru?.indexOf(search) !== -1)
							.filter(p => p.category?._id === productCategories[activeTab]?._id && !p.userProduct)
					: []
			)
		}
	}

	useEffect(() => {
		getProducts()
	}, [activeTab, user])

	useEffect(() => {
		getProducts()
	}, [allProducts])

	useEffect(() => {
		if (search.length > 1)
			setProducts([
				...allProducts.filter(e => e.name?.ru?.toLowerCase().includes(search.toLowerCase()))
			])
	}, [search])

	const onSelect = (product: Product) => {
		let arr = [...selected]

		if (selected.find(s => s._id === product._id)) {
			arr = arr.filter(a => a._id !== product._id)
		} else {
			arr.push(product)
		}

		setSelected(arr)
	}

	const onAdd = async () => {
		if (user) {
			setLoading(true)

			for (let i = 0; i < selected.length; i++) {
				await ApiService.put(`/users/add-product/${user._id}`, {
					productId: selected[i]._id
				})
			}

			dispatch(
				setUser({
					...user,
					products: [...user.products, ...selected]
				})
			)

			setLoading(false)
			showSuccessToast('Успешно добавлено!')
			setSelected([])
		}
	}

	const onCreate = () => {
		navigation.navigate(NUTRITION.CREATE_PRODUCT as never)
	}

	const onUpdateNavigate = (product: Product) => {
		navigation.navigate(NUTRITION.UPDATE_PRODUCT, { product })
	}

	const onSearch = () => {
		navigation.navigate(NUTRITION.SEARCH_PRODUCT as never)
	}

	const onDeleteConfirm = async id => {
		try {
			console.log('====================================')
			console.log({ id })
			console.log('====================================')
			await ApiService.delete('/products/' + id)
			let res = await ApiService.get('/products')
			dispatch(setProductsAction(res.data))
			getProducts()
			Alert.alert('Внимание !', 'Удалено')
		} catch (error) {
			Alert.alert('Ошибка !', 'Не удалос удалить!')
		}
	}

	const onDeletePress = el => {
		Alert.alert('Внимание !', 'Вы уверены, что хотите удалить этот продукт?', [
			{
				text: 'Удалить',
				style: 'destructive',
				onPress: () => onDeleteConfirm(el._id)
			},
			{ text: 'Отменить' }
		])
	}

	return {
		activeTab,
		setActiveTab,
		products,
		selected,
		language,
		loading,
		productCategories,
		onSelect,
		onAdd,
		onCreate,
		onDeletePress,
		isSuperAdmin: user?.role === ROLES.SUPERADMIN,
		search,
		setSearch,
		onSearch,
		onUpdateNavigate,
		t,
		i18n
	}
}
