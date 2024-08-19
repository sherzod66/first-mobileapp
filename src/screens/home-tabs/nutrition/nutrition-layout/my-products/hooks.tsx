import { useEffect, useState } from 'react'
import { useRedux } from '../../../../../store/hooks'
import { selectLanguage, selectUser, setUser } from '../../../../../store/slices/appSlice'
import { Product, Response, User } from '../../../../../types'
import { convertDishToProduct } from '../../../../../utils/convertDishToProduct'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NutritionStackParamList } from '../..'
import { NUTRITION } from '../../../../../navigation/ROUTES'
import { useNavigation } from '@react-navigation/native'
import { selectProductCategories } from '../../../../../store/slices/categorySlice'
import { ApiService } from '../../../../../services'
import { TRecommendationContent } from '../../recommendation/hooks'
import EventEmitter from '../../../../../utils/EventEmitter'

export type MyProductsScreenNavigationProp = NativeStackNavigationProp<
	NutritionStackParamList,
	NUTRITION.NUTRITION_LAYOUT
>

export const MyProductsHooks = () => {
	const [activeTab, setActiveTab] = useState<number | null>(null)
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState<Product | null>(null)
	const [modalLoading, setModalLoading] = useState(false)
	const [show, setShow] = useState(false)
	const [showEdit, setShowEdit] = useState<boolean>(false)
	const [name, setName] = useState('')
	const [calories, setCalories] = useState('')
	const [protein, setProtein] = useState('')
	const [oil, setOil] = useState('')
	const [carb, setCarb] = useState('')
	const [editId, setEditId] = useState<string>('')
	const [whatModel, setWhatModel] = useState<keyof TRecommendationContent>('createProduct')

	const [language] = useRedux(selectLanguage)
	const [productCategories] = useRedux(selectProductCategories)
	const [user, dispatch] = useRedux(selectUser)

	const navigation = useNavigation<MyProductsScreenNavigationProp>()

	const event = () => setShow(true)

	useEffect(() => {
		if (user) {
			setProducts([...user.dishes.map(dish => convertDishToProduct(dish))])
		}
	}, [])

	useEffect(() => {
		EventEmitter.addListener(whatModel, () => event())
		return () => EventEmitter.removeListener(whatModel, event)
	}, [whatModel])

	const effect = () => {
		if (user) {
			if (activeTab === null) {
				setProducts([...user.dishes.map(dish => convertDishToProduct(dish))])
			} else {
				setProducts([
					...user.products.filter(p => p.category?._id === productCategories[activeTab]?._id)
				])
			}
		}
	}

	useEffect(() => {
		effect()
	}, [activeTab, user])

	const onCreate = () => {
		navigation.navigate(NUTRITION.CREATE_DISH as never)
	}

	const onRemove = async (product: Product) => {
		if (user) {
			setLoading(product)
			if (activeTab === null) {
				try {
					await ApiService.delete(`/dishes/${product._id}`)

					dispatch(
						setUser({
							...user,
							dishes: [...user.dishes.filter(p => p._id !== product._id)]
						})
					)
				} catch (e) {}
			} else {
				try {
					await ApiService.patch(`/users/remove-product/${user._id}`, {
						productId: product._id
					})

					dispatch(
						setUser({
							...user,
							products: [...user.products.filter(p => p._id !== product._id)]
						})
					)
				} catch (e) {}
			}

			setLoading(null)
		}
	}

	const onShow = () => {
		setShow(true)
		setName('')
		setCalories('')
		setProtein('')
		setOil('')
		setCarb('')
		setWhatModel('createProduct')
	}
	const navigateSearch = () => {
		navigation.navigate(NUTRITION.SEARCH_MY_PRODUCT as never)
	}

	const navigateUpdateDish = (props: Product) => {
		navigation.navigate(NUTRITION.UPDATE_DISH, { data: props })
	}

	const onHide = () => {
		setShow(false)
		setName('')
		setCalories('')
		setProtein('')
		setOil('')
		setCarb('')
	}
	const onHideEdit = () => {
		setShowEdit(false)
		setName('')
		setCalories('')
		setProtein('')
		setOil('')
		setCarb('')
	}

	const onPress = () => {
		setShow(false)
		navigation.navigate(NUTRITION.RECOMMENDATION, { value: 'createProduct' })
	}

	const onAdd = async () => {
		if (activeTab !== null && user) {
			setModalLoading(true)

			try {
				const res = await ApiService.post<Response<Product>>('/products', {
					name: {
						en: name,
						ru: name,
						uz: name
					},
					calories,
					protein,
					oil,
					carb,
					category: productCategories[activeTab]._id,
					creator: user._id,
					userProduct: true
				})

				const resProducts = await ApiService.get<Response<Product[]>>('/products')

				dispatch(
					setUser({
						...user,
						products: [...user.products, res.data]
					})
				)
				dispatch(setProducts(resProducts.data))
				setModalLoading(false)
				setShow(false)
			} catch (e) {
				setModalLoading(false)
				setShow(false)
			}
		}
	}
	const onEdit = async () => {
		if (activeTab !== null && user) {
			setModalLoading(true)
			try {
				const res = await ApiService.put<Response<Product>>(`/products/${editId}`, {
					name: {
						en: name,
						ru: name,
						uz: name
					},
					calories,
					protein,
					oil,
					carb,
					category: productCategories[activeTab]._id,
					creator: user._id
				})
				res.data

				const resUser = await ApiService.get<Response<User>>('/users/me')
				dispatch(setUser(resUser.data))

				onHideEdit()
				setModalLoading(false)
				setShowEdit(false)
			} catch (e) {
				setModalLoading(false)
				setShow(false)
			}
		}
	}

	const isModalBtnDisabled = !name || !calories || !protein || !oil || !carb

	return {
		activeTab,
		setActiveTab,
		name,
		setName,
		calories,
		setCalories,
		protein,
		setProtein,
		oil,
		setOil,
		carb,
		setCarb,
		products,
		loading,
		show,
		modalLoading,
		isModalBtnDisabled,
		language,
		productCategories,
		onCreate,
		onRemove,
		onShow,
		onHide,
		onPress,
		onAdd,
		showEdit,
		setShowEdit,
		onHideEdit,
		editId,
		setEditId,
		onEdit,
		navigateSearch,
		navigateUpdateDish
	}
}
