import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NutritionStackParamList } from '../..'
import { NUTRITION } from '../../../../../navigation/ROUTES'
import { useRedux } from '../../../../../store/hooks'
import { selectSchemaNutritions, selectUser, setUser } from '../../../../../store/slices/appSlice'
import {
	NUTRITION_TYPE,
	Response,
	SchemaNutrition,
	SchemaNutrition1,
	User
} from '../../../../../types'
import { ApiService } from '../../../../../services'
import { getIndexSN } from '../../../../../utils/getIndexSN'
import { getSumValues } from '../../../../../utils/getSumValues'
import { convertDishToProduct } from '../../../../../utils/convertDishToProduct'
import EventEmitter from '../../../../../utils/EventEmitter'
import { TRecommendationContent } from '../../recommendation/hooks'
import { useTranslation } from 'react-i18next'

export type SchemaNutritionScreenNavigationProp = NativeStackNavigationProp<
	NutritionStackParamList,
	NUTRITION.NUTRITION_LAYOUT
>

const cd = new Date(Date.now())

const initialState = {
	date: cd,
	data: {
		nType: NUTRITION_TYPE.FAT,
		dailyNorm: 0,
		amount: 0,
		proteinPercent: 0,
		oilPercent: 0,
		mergeAmount: 0,
		mergeCarb: 0
	},
	products: [],
	amountsP: [],
	dishes: [],
	amountsD: []
}

export const SchemaNutritionHooks = () => {
	const navigation = useNavigation<SchemaNutritionScreenNavigationProp>()

	const [user, dispatch] = useRedux(selectUser)
	const [schemaNutritions] = useRedux(selectSchemaNutritions)

	const [schemaNutrition, setSchemaNutrition] = useState<SchemaNutrition | null>(null)
	const [activeTab, setActiveTab] = useState(0)
	const [acTogLoading, setAcTogLoading] = useState(false)
	const [show, setShow] = useState<any>({})
	const [modalValue, setModalValue] = useState('')
	const [modalValue1, setModalValue1] = useState('')
	const [modalValue2, setModalValue2] = useState('')
	const [loading, setLoading] = useState(false)
	const [modalError, setModalError] = useState('')
	const [calories, setCalories] = useState(0)
	const [protein, setProtein] = useState(0)
	const [oil, setOil] = useState(0)
	const [carb, setCarb] = useState(0)
	const [whatModel, setWhatModel] = useState<keyof TRecommendationContent>('amountOfDeficitOil')

	const { t } = useTranslation()

	const effect = () => {
		if (schemaNutritions) {
			const index = getIndexSN({
				schemaNutritions,
				year: cd.getFullYear(),
				month: cd.getMonth(),
				day: cd.getDate()
			})

			let obj: typeof schemaNutrition = null

			if (index !== -1) {
				obj = schemaNutritions[index]
				const products = [...obj.products, ...obj.dishes.map(d => convertDishToProduct(d))]
				const amounts = [...obj.amountsP, ...obj.amountsD]

				setCalories(getSumValues(products, amounts, 'calories'))
				setProtein(getSumValues(products, amounts, 'protein'))
				setOil(getSumValues(products, amounts, 'oil'))
				setCarb(getSumValues(products, amounts, 'carb'))
			} else {
				obj = { ...initialState }
			}
			setSchemaNutrition(obj)
		}
	}
	console.log(activeTab)
	useEffect(() => {
		effect()
	}, [user])

	const event = () => setShow(show)
	useEffect(() => {
		EventEmitter.addListener(whatModel, () => event())
		return () => EventEmitter.removeListener(whatModel, event)
	}, [whatModel])

	const effect1 = () => {
		if (schemaNutrition) {
			const {
				data: { nType }
			} = schemaNutrition

			setActiveTab(nType === NUTRITION_TYPE.THIN ? 1 : 0)
		}
	}

	useEffect(() => {
		effect1()
	}, [schemaNutrition])

	const saveSchemaNutrition = async (obj: SchemaNutrition1) => {
		if (user) {
			await ApiService.put(`/users/set-schema-nutrition/${user._id}`, obj)

			const res = await ApiService.get<Response<User>>('/users/me')

			dispatch(setUser(res.data))
		}
	}

	const toggleType = async () => {
		if (schemaNutrition) {
			setAcTogLoading(true)

			const date = {
				year: cd.getFullYear(),
				month: cd.getMonth() + 1,
				day: cd.getDate()
			}

			try {
				await saveSchemaNutrition({
					...schemaNutrition,
					date,
					data: {
						...schemaNutrition.data,
						nType: NUTRITION_TYPE[activeTab ? 'THIN' : 'FAT']
					},
					products: schemaNutrition.products.map(p => p._id),
					dishes: schemaNutrition.dishes.map(d => d._id)
				})
			} catch (e) {
				console.log('e')
			}

			setAcTogLoading(false)
		}
	}

	useEffect(() => {
		toggleType()
	}, [activeTab])

	const onDailyNormPress = () => {
		//@ts-ignore
		navigation.navigate(NUTRITION.CALC_DAILY_NORM, {
			onSave: async (val: string) => {
				let data = {
					...schemaNutrition?.data,
					nType: NUTRITION_TYPE[activeTab ? 'THIN' : 'FAT'],
					dailyNorm: Number(val) || 0
				}
				const date = {
					year: cd.getFullYear(),
					month: cd.getMonth() + 1,
					day: cd.getDate()
				}
				try {
					await saveSchemaNutrition({
						...schemaNutrition,
						date,
						data,
						products: schemaNutrition?.products.map(p => p._id) || [],
						dishes: schemaNutrition?.dishes.map(d => d._id) || []
					})
					setSchemaNutrition({
						...schemaNutrition,
						date,
						data,
						products: schemaNutrition?.products.map(p => p._id) || [],
						dishes: schemaNutrition?.dishes.map(d => d._id) || []
					})
				} catch (e) {
					console.log('e: ', e)
				}
			},
			tab: activeTab
		})
	}

	const onRecommendationPress = () => {
		navigation.navigate(NUTRITION.RECOMMENDATION, {
			value: whatModel
		})
		setShow({})
	}

	const onConsumeCalendarPress = () => {
		navigation.navigate(NUTRITION.CONSUME_CALENDAR, { tab: activeTab })
	}

	const onMeasurementsPress = () => {
		navigation.navigate(NUTRITION.MEASUREMENTS, { tab: activeTab })
	}

	const onShow = (key: 'a' | 'b' | 'c' | 'd' | 'e') => {
		if (key === 'a') {
			setModalValue(schemaNutrition?.data.dailyNorm.toString() || '')
			if (activeTab > 0) setWhatModel('dailyNormMassWindow')
			else setWhatModel('dailyNormOilWindow')
		}
		if (key === 'b') {
			setModalValue(schemaNutrition?.data.amount.toString() || '')
			if (activeTab > 0) setWhatModel('amountOfSurplusMass')
			else setWhatModel('amountOfDeficitOil')
		}
		if (key === 'c') {
			setModalValue(schemaNutrition?.data.proteinPercent.toString() || '')
			if (activeTab > 0) setWhatModel('proteinMass')
			else setWhatModel('proteinOil')
		}
		if (key === 'd') {
			setModalValue(schemaNutrition?.data.oilPercent.toString() || '')
			if (activeTab > 0) setWhatModel('fatsMass')
			else setWhatModel('fatsOil')
		}
		if (key === 'e') {
			setModalValue1(schemaNutrition?.data.mergeAmount.toString() || '')
			setModalValue2(schemaNutrition?.data.mergeCarb.toString() || '')
			if (activeTab > 0) setWhatModel('buttonChangeMass')
			else setWhatModel('buttonChangeOil')
		}
		setShow({ [key]: true })
	}

	const onCancel = () => {
		setModalValue('')
		setModalValue1('')
		setModalValue2('')
		setShow({})
	}

	const onSave = async () => {
		if (schemaNutrition) {
			if (!show.e && !modalValue) {
				setModalError('Set daily norm')
			}

			if (show.e && !modalValue1 && !modalValue2) {
				setModalError('Set modalValue1/setModalValue2')
			}

			// if (!modalValue && !modalValue1 && !modalValue2) {
			//   setModalError("Set daily norm");
			// }

			setLoading(true)

			const date = {
				year: cd.getFullYear(),
				month: cd.getMonth() + 1,
				day: cd.getDate()
			}
			let data = {
				...schemaNutrition.data,
				nType: NUTRITION_TYPE[activeTab ? 'THIN' : 'FAT']
			}

			if (show.a) {
				data.dailyNorm = Number(modalValue)
			}

			if (show.b) {
				data.amount = Number(modalValue)
			}

			if (show.c) {
				data.proteinPercent = Number(modalValue)
			}

			if (show.d) {
				data.oilPercent = Number(modalValue)
			}

			if (show.e) {
				if (modalValue1) {
					data.mergeAmount = Number(modalValue1)
				}

				if (modalValue2) {
					data.mergeCarb = Number(modalValue2)
				}
			}

			try {
				await saveSchemaNutrition({
					...schemaNutrition,
					date,
					data,
					products: schemaNutrition.products.map(p => p._id),
					dishes: schemaNutrition.dishes.map(d => d._id)
				})
			} catch (e) {
				console.log('e: ', e)
			}

			setLoading(false)
			onCancel()
		}
	}

	let amountPercent = 0
	let amountNorm = 0
	let amountProtein = 0
	let amountOil = 0
	let amountCarb = 0

	if (schemaNutrition) {
		const {
			data: { dailyNorm, amount, proteinPercent, oilPercent, mergeAmount, mergeCarb }
		} = schemaNutrition

		amountPercent = Math.trunc((amount * 100) / dailyNorm)

		if (activeTab) {
			amountNorm = dailyNorm + amount
		} else {
			amountNorm = dailyNorm - amount
		}

		amountProtein = Math.trunc((amountNorm * proteinPercent) / 400)
		amountOil = Math.trunc((amountNorm * oilPercent) / 900)
		amountCarb = Math.trunc((amountNorm - (amountNorm / 100) * (proteinPercent + oilPercent)) / 4)

		if (mergeAmount) {
			if (activeTab) {
				amountNorm = amountNorm + (amountNorm * mergeAmount) / 100
			} else {
				amountNorm = amountNorm - (amountNorm * mergeAmount) / 100
			}
			amountProtein = Math.trunc((amountNorm * proteinPercent) / 400)
			amountOil = Math.trunc((amountNorm * oilPercent) / 900)
			amountCarb = Math.trunc((amountNorm - (amountNorm / 100) * (proteinPercent + oilPercent)) / 4)
		}

		if (mergeCarb) {
			if (activeTab) {
				amountCarb = amountCarb + mergeCarb
			} else {
				amountCarb = amountCarb - mergeCarb
			}
		}
	}

	return {
		show,
		loading,
		modalError,
		calories,
		protein,
		oil,
		carb,
		acTogLoading,
		amountPercent,
		amountNorm,
		amountProtein,
		amountOil,
		amountCarb,
		schemaNutrition,
		activeTab,
		setActiveTab,
		modalValue,
		setModalValue,
		modalValue1,
		modalValue2,
		setModalValue1,
		setModalValue2,
		onDailyNormPress,
		onRecommendationPress,
		onConsumeCalendarPress,
		onMeasurementsPress,
		onShow,
		onSave,
		onCancel,
		t
	}
}
