import { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NutritionStackParamList } from '..'
import { NUTRITION } from '../../../../navigation/ROUTES'
import { useRedux } from '../../../../store/hooks'
import { selectLanguage } from '../../../../store/slices/appSlice'
import { normalizeOnlyNumbers } from '../../../../utils/normalizeOnlyNumbers'
import { getSumValues } from '../../../../utils/getSumValues'
import EventEmitter from '../../../../utils/EventEmitter'
import { Product, Reception } from '../../../../types'
import { convertDishToProduct } from '../../../../utils/convertDishToProduct'

export type UpdatePartPlanScreenNavigationProp = NativeStackNavigationProp<
	NutritionStackParamList,
	NUTRITION.UPDATE_PART_PLAN
>

export type UpdatePartPlanScreenRouteProp = RouteProp<
	NutritionStackParamList,
	NUTRITION.UPDATE_PART_PLAN
>

export const UpdatePartPlanHooks = () => {
	const navigation = useNavigation<UpdatePartPlanScreenNavigationProp>()
	const route = useRoute<UpdatePartPlanScreenRouteProp>()

	const [language] = useRedux(selectLanguage)

	const {
		index,
		topCalories,
		topProtein,
		topOil,
		topCarb,
		receptions: defaultReceptions
	} = route.params ?? {}
	const [receptions, setReceptions] = useState<Reception[]>([])

	const [calories, setCalories] = useState(0)
	const [protein, setProtein] = useState(0)
	const [oil, setOil] = useState(0)
	const [carb, setCarb] = useState(0)
	const [amountsP, setAmountsP] = useState<number[][]>([])
	const [amountsD, setAmountsD] = useState<number[][]>([])

	useEffect(() => {
		if (defaultReceptions.length) {
			setReceptions(defaultReceptions)
		}
	}, [])

	useEffect(() => {
		let tCalories = 0
		let tProtein = 0
		let tOil = 0
		let tCarb = 0

		receptions.map(reception => {
			if (reception) {
				const { products, dishes, amountsP, amountsD } = reception
				const tProducts = [...products, ...dishes.map(d => convertDishToProduct(d))]
				const tAmounts = [...amountsP, ...amountsD]

				tCalories += getSumValues(tProducts, tAmounts, 'calories')
				tProtein += getSumValues(tProducts, tAmounts, 'protein')
				tOil += getSumValues(tProducts, tAmounts, 'oil')
				tCarb += getSumValues(tProducts, tAmounts, 'carb')
			}
		})

		setCalories(tCalories)
		setProtein(tProtein)
		setOil(tOil)
		setCarb(tCarb)
	}, [receptions])

	useEffect(() => {
		let arrP: number[][] = []
		let arrD: number[][] = []

		receptions.map(r => {
			arrP.push([...r.amountsP])
			arrD.push([...r.amountsD])
		})

		setAmountsP([...arrP])
		setAmountsD([...arrD])
	}, [receptions])

	useEffect(() => {
		let tCalories = 0
		let tProtein = 0
		let tOil = 0
		let tCarb = 0
		if (receptions) {
			receptions.map(({ products, dishes }, i) => {
				// @ts-ignore
				const tProducts: Product[] = [...products, ...dishes]
				let tAmounts: number[] = []
				if (amountsP[i] && amountsP[i].length) {
					tAmounts = [...tAmounts, ...amountsP[i]]
				}
				if (amountsD[i] && amountsD[i].length) {
					tAmounts = [...tAmounts, ...amountsD[i]]
				}

				tCalories += getSumValues(tProducts, tAmounts, 'calories')
				tProtein += getSumValues(tProducts, tAmounts, 'protein')
				tOil += getSumValues(tProducts, tAmounts, 'oil')
				tCarb += getSumValues(tProducts, tAmounts, 'carb')
			})
		}

		setCalories(tCalories)
		setProtein(tProtein)
		setOil(tOil)
		setCarb(tCarb)
	}, [amountsP, amountsD])

	const onChangeP = (value: string, i: number, ii: number) => {
		let arr = [...amountsP]
		arr[i][ii] = normalizeOnlyNumbers(value)
		setAmountsP([...arr])
	}

	const onChangeD = (value: string, i: number, ii: number) => {
		let arr = [...amountsD]
		arr[i][ii] = normalizeOnlyNumbers(value)
		setAmountsD([...arr])
	}

	const setToReceptions = ({ obj, i }: { obj: Reception; i: number }) => {
		console.log('setToReceptions::', obj)
		let arr1 = [...receptions]
		arr1[i] = { ...obj }
		const amountP = [...amountsP]
		const amountD = [...amountsD]
		amountP.splice(i, 1, obj.amountsP)
		amountD.splice(i, 1, obj.amountsD)

		setReceptions(arr1)
		setAmountsP(amountP)
		setAmountsD(amountD)
	}

	useEffect(() => {
		EventEmitter.addListener('onSetReceptions', setToReceptions)

		return () => {
			EventEmitter.removeListener('onSetReceptions', setToReceptions)
		}
	}, [receptions])

	const onPress = () => {
		EventEmitter.notify(
			'onUpdateReceptions',
			receptions.map((r, i) => ({
				...r,
				amountsP: amountsP[i],
				amountsD: amountsD[i]
			}))
		)
		navigation.goBack()
	}

	const onAddReception = (index: number, receptions: Reception) => {
		navigation.navigate(NUTRITION.ADD_RECEPTION, {
			index,
			reception: receptions
		})
	}

	return {
		index,
		calories,
		protein,
		oil,
		carb,
		receptions,
		amountsP,
		amountsD,
		language,
		onChangeP,
		onChangeD,
		onPress,
		onAddReception
	}
}
