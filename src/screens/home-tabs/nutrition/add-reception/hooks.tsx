import { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NutritionStackParamList } from '..'
import { NUTRITION } from '../../../../navigation/ROUTES'
import EventEmitter from '../../../../utils/EventEmitter'
import { CategoryType, Product } from '../../../../types'
import { PRODUCT_AMOUNT } from '../../../../constants/AMOUNT'
import { getSumValues } from '../../../../utils/getSumValues'

export type AddReceptionScreenNavigationProp = NativeStackNavigationProp<
	NutritionStackParamList,
	NUTRITION.ADD_RECEPTION
>

export type AddReceptionScreenRouteProp = RouteProp<
	NutritionStackParamList,
	NUTRITION.ADD_RECEPTION
>

export const AddReceptionHooks = () => {
	const navigation = useNavigation<AddReceptionScreenNavigationProp>()
	const route = useRoute<AddReceptionScreenRouteProp>()

	const [products, setProducts] = useState<Product[]>([])
	const [amounts, setAmounts] = useState<number[]>([])
	const [calories, setCalories] = useState(0)
	const [protein, setProtein] = useState(0)
	const [oil, setOil] = useState(0)
	const [carb, setCarb] = useState(0)
	const [recommendation, setRecommendation] = useState('')
	const [show, setShow] = useState<any>({})
	const [modalValue, setModalValue] = useState('')

	const { index, reception } = route.params ?? {}

	useEffect(() => {
		if (reception) {
			setAmounts([...reception.amountsD, ...reception.amountsP])
			setProducts(reception.products)
			setRecommendation(reception.recommendation ?? '')
		}
	}, [])

	useEffect(() => {
		let arr: number[] = []
		for (let i = 0; i < products.length; i++) {
			if (products[i].category) {
				if (reception?.amountsP[i] && reception.products[i].name.ru === products[i].name.ru) {
					arr.push(
						reception?.amountsP[i] === PRODUCT_AMOUNT ? PRODUCT_AMOUNT : reception?.amountsP[i]
					)
				} else {
					arr.push(PRODUCT_AMOUNT)
				}
			} else {
				if (reception?.amountsP[i] && reception.products[i].name.ru === products[i].name.ru) {
					arr.push(
						reception?.amountsP[i] === PRODUCT_AMOUNT ? PRODUCT_AMOUNT : reception?.amountsD[i]
					)
				} else {
					//TODO: Решить с добовлением блюд!
					// if (products[i].amounts) {
					//   let num = 0;
					//   products[i].amounts.forEach((elem) => {
					//     num += +elem;
					//   });
					//   arr.push(
					//     reception?.amountsP[i] === PRODUCT_AMOUNT ? PRODUCT_AMOUNT : num
					//   );
					// } else {
					//   arr.push(PRODUCT_AMOUNT);
					// }
				}
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

	const onSave = () => {
		let amountsP: number[] = []
		let amountsD: number[] = []

		for (let i = 0; i < products.length; i++) {
			if (products[i].category.type === CategoryType.PRODUCT) {
				amountsP.push(amounts[i])
			} else {
				amountsD.push(amounts[i])
			}
		}

		const obj = {
			recommendation,
			amountsP,
			amountsD,
			products: products.filter(p => p.category.type === CategoryType.PRODUCT),
			dishes: products
				.filter(p => p.category.type !== CategoryType.PRODUCT)
				.map(a => ({ ...a, name: a.name.ru }))
		}
		EventEmitter.notify('onSetReceptions', { i: index, obj })

		navigation.goBack()
	}

	const onShow = (index: number, value: string) => {
		setModalValue(value)
		setShow({ index })
	}

	const onRemove = () => {
		setProducts(products.slice(0, -1))
	}

	const onRemoveByIndex = (index: number) => {
		const amountsCopy = [...amounts]
		amountsCopy.slice(index, 1)
		setAmounts(amountsCopy)
		setProducts(products.filter((p, i) => i !== index))
	}

	const navigateAddProducts = () => {
		navigation.navigate(NUTRITION.ADD_PRODUCTS, {
			products,
			goBackNavigation: 'ADD_RECEPTION',
			index,
			reception
		})
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

	return {
		index,
		show,
		calories,
		protein,
		oil,
		carb,
		amounts,
		products,
		recommendation,
		setRecommendation,
		modalValue,
		setModalValue,
		onSave,
		onShow,
		onCancel,
		onSaveAmount,
		onRemove,
		onRemoveByIndex,
		navigateAddProducts
	}
}
