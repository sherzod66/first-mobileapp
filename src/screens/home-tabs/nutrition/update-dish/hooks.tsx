import { useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useRedux } from '../../../../store/hooks'
import { selectLanguage, selectUser, setUser } from '../../../../store/slices/appSlice'
import { NUTRITION } from '../../../../navigation/ROUTES'
import { NutritionStackParamList } from '..'
import EventEmitter from '../../../../utils/EventEmitter'
import { Dish, Product, Response, User } from '../../../../types'
import { getSumValues } from '../../../../utils/getSumValues'
import { PRODUCT_AMOUNT } from '../../../../constants/AMOUNT'
import { selectDishCategories } from '../../../../store/slices/categorySlice'
import { ApiService } from '../../../../services'
import { copyProductSlice, setCopyProducts } from '../../../../store/slices/copyDataSlice'

export type CreateDishScreenNavigationProp = NativeStackNavigationProp<
	NutritionStackParamList,
	NUTRITION.CREATE_DISH
>

type ExerciseScreenRouteProp = RouteProp<NutritionStackParamList, NUTRITION.UPDATE_DISH>

export const UpdateDishHooks = () => {
	const navigation = useNavigation<CreateDishScreenNavigationProp>()
	const [language] = useRedux(selectLanguage)
	const [user, dispatch] = useRedux(selectUser)
	const [copyData, updateCopy] = useRedux(copyProductSlice)

	const [dishCategories] = useRedux(selectDishCategories)

	const RouteProp = useRoute<ExerciseScreenRouteProp>()
	const [name, setName] = useState('')
	const [activeIndex, setActiveIndex] = useState(0)
	const [products, setProducts] = useState<Product[]>([])
	const [amounts, setAmounts] = useState<number[]>([])
	const [calories, setCalories] = useState(0)
	const [protein, setProtein] = useState(0)
	const [oil, setOil] = useState(0)
	const [carb, setCarb] = useState(0)
	const [loading, setLoading] = useState(false)
	const [show, setShow] = useState<any>({})
	const [modalValue, setModalValue] = useState('')
	const [showDots, setShowDots] = useState<boolean>(false)

	useEffect(() => {
		// console.log(JSON.stringify(RouteProp.params.data, null, 4));
		setProducts(RouteProp.params.data.products)
		setName(RouteProp.params.data.name.ru)
	}, [RouteProp])
	useEffect(() => {
		let arr: number[] = []

		for (let i = 0; i < products.length; i++) {
			if (RouteProp.params.data.amounts[i]) {
				arr.push(RouteProp.params.data.amounts[i])
			} else {
				arr.push(PRODUCT_AMOUNT)
			}
		}

		setAmounts(arr)
	}, [products])

	useEffect(() => {
		if (products.length) {
			setCalories(getSumValues(products, amounts, 'calories'))
			setProtein(getSumValues(products, amounts, 'protein'))
			setOil(getSumValues(products, amounts, 'oil'))
			setCarb(getSumValues(products, amounts, 'carb'))
		} else {
			setCalories(0)
			setProtein(0)
			setOil(0)
			setCarb(0)
		}
	}, [amounts])

	const addProducts = (ps: Product[]) => setProducts(ps)

	useEffect(() => {
		EventEmitter.addListener('onAddProducts', addProducts)

		return () => {
			EventEmitter.removeListener('onAddProducts', addProducts)
		}
	}, [])

	const onSubmit = async () => {
		if (user) {
			setLoading(true)
			try {
				const res = await ApiService.put<Response<Dish>>(`/dishes/${RouteProp.params.data._id}`, {
					name,
					products: products.map(p => p._id),
					amounts,
					creator: user._id
				})
				dispatch(
					setUser({
						...user,
						dishes: [...user.dishes.filter(elem => elem._id !== res.data._id), res.data]
					})
				)
				const resUser = await ApiService.get<Response<User>>('/users/me')
				dispatch(setUser(resUser.data))
				setLoading(false)
				navigation.goBack()
			} catch (e) {
				console.log('e: ', e)
				setLoading(false)
			}
		}
	}

	const onShow = (index: number, value: string) => {
		setModalValue(value)
		setShow({ index })
	}

	const onRemove = () => {
		setProducts(products.slice(0, -1))
	}

	const onRemoveByIndex = (index: number) => {
		// console.log("products: ", JSON.stringify(products, null, 4));
		setProducts(products.filter((p, i) => i !== index))
	}

	const navigateAddProducts = () => {
		navigation.navigate(NUTRITION.ADD_ONLY_PRODUCTS, { products, back: true })
	}

	const onCancel = () => {
		setShow({})
		setModalValue('')
	}

	const onSaveAmount = () => {
		const arr = amounts.map((a, i) => {
			if (i === show.index) {
				a = Number(modalValue)
			}

			return a
		})
		setAmounts(arr)
		setShow({})
		setModalValue('')
	}
	const copyHandler = () => {
		updateCopy(setCopyProducts(products))
	}
	const onPasteData = () => {
		setProducts(prev => [...prev, ...copyData])
		setShowDots(false)
	}

	return {
		categories: dishCategories,
		show,
		loading,
		language,
		calories,
		protein,
		oil,
		carb,
		products,
		amounts,
		name,
		setName,
		activeIndex,
		setActiveIndex,
		modalValue,
		setModalValue,
		onSubmit,
		onShow,
		onCancel,
		onSaveAmount,
		onRemove,
		onRemoveByIndex,
		navigateAddProducts,
		showDots,
		setShowDots,
		copyData,
		copyHandler,
		onPasteData
	}
}
