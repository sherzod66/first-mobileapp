import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { ProfileStackParamList } from '../..'
import { CalendarItem, IActiveDayProps } from '../../../../../components/CustomCalendar'
import { PROFILE } from '../../../../../navigation/ROUTES'
import { ApiService } from '../../../../../services'
import { useRedux } from '../../../../../store/hooks'
import {
	selectSchemaNutritions,
	selectTrainer,
	selectUser,
	setUser
} from '../../../../../store/slices/appSlice'
import {
	CategoryType,
	NUTRITION_TYPE,
	Product,
	Response,
	SchemaNutrition,
	User
} from '../../../../../types'
import { convertDishToProduct } from '../../../../../utils/convertDishToProduct'
import { getCalendarDays } from '../../../../../utils/getCalendarDays'
import { getIndexSN } from '../../../../../utils/getIndexSN'
import { getSumValues } from '../../../../../utils/getSumValues'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

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

export type MyNutritionScreenNavigationProp = NativeStackNavigationProp<
	ProfileStackParamList,
	PROFILE.MY_DATA
>

export const MyNutritionHooks = (apprenticeId = '') => {
	const navigation = useNavigation<MyNutritionScreenNavigationProp>()

	let [user, dispatch] = useRedux(selectUser)
	const trainer = useSelector(selectTrainer)
	if (!!apprenticeId) {
		user = trainer?.disciples.find(e => e._id === apprenticeId)
	}
	const [schemaNutritions] = useRedux(selectSchemaNutritions)

	const [schemaNutrition, setSchemaNutrition] = useState<SchemaNutrition | null>(null)
	const [activeDay, setActiveDay] = useState<IActiveDayProps | null>(null)
	const [activeMonth, setActiveMonth] = useState(cd.getMonth())
	const [activeYear, setActiveYear] = useState(cd.getFullYear())
	const [monthlyData, setMonthlyData] = useState<CalendarItem[][]>([])
	const [activeTog, setActiveTog] = useState<boolean>(false)
	const [activeCalories, setActiveCalories] = useState(0)
	const [activeProtein, setActiveProtein] = useState(0)
	const [activeOil, setActiveOil] = useState(0)
	const [activeCarb, setActiveCarb] = useState(0)
	const [calories, setCalories] = useState(0)
	const [protein, setProtein] = useState(0)
	const [oil, setOil] = useState(0)
	const [carb, setCarb] = useState(0)
	const [products, setProducts] = useState<Product[]>([])
	const [amounts, setAmounts] = useState<number[]>([])
	const [show, setShow] = useState<any>({})
	const [modalValue, setModalValue] = useState('')
	const [modalLoading, setModalLoading] = useState(false)
	const [loading, setLoading] = useState<number | boolean>(false)
	const { t } = useTranslation()

	const effect = () => {
		const currentYear = cd.getFullYear()
		const currentMonth = cd.getMonth()

		const { arr, day, week } = getCalendarDays(activeYear, activeMonth)

		let newArr = arr.map((a: CalendarItem[]) =>
			a.map((aa: CalendarItem) => {
				let newAa: CalendarItem = aa

				if (aa) {
					const index = getIndexSN({
						schemaNutritions,
						year: activeYear,
						month: activeMonth,
						day: aa.day
					})

					if (index !== -1) {
						const { products, dishes, amountsP, amountsD } = (schemaNutritions ?? [])[index]

						aa.value = getSumValues(
							[...products, ...dishes.map(d => convertDishToProduct(d))],
							[...amountsP, ...amountsD],
							'calories'
						)
					}

					if (activeYear <= currentYear && activeMonth < currentMonth) {
						newAa = { ...aa, past: true }
					} else {
						if (activeMonth > currentMonth) {
							delete newAa?.past
						}

						if (!newAa?.past && newAa?.value && newAa?.day !== cd.getDate()) {
							newAa = { ...aa, planned: true }
							delete newAa.value
						}
					}
				} else {
					newAa = null
				}

				return newAa
			})
		)

		setMonthlyData(newArr as CalendarItem[][])

		if (activeMonth === currentMonth) {
			if (!activeDay) {
				setActiveDay({ weekIndex: week, dayIndex: day })
			}
		} else {
			setActiveDay(null)
		}

		// boshqa kundigi planda update bogandan keyn bugun active bop qovotti
	}

	useEffect(() => {
		effect()
	}, [user, activeMonth])

	const effect1 = () => {
		if (activeDay) {
			const { weekIndex, dayIndex } = activeDay
			const dayy = monthlyData[weekIndex][dayIndex]?.day ?? 0

			const index = getIndexSN({
				schemaNutritions,
				year: activeYear,
				month: activeMonth,
				day: dayy
			})

			let obj: typeof schemaNutrition = null

			if (schemaNutritions) {
				if (index !== -1) {
					obj = schemaNutritions[index]

					const {
						data: { nType, dailyNorm, amount, proteinPercent, oilPercent, mergeAmount, mergeCarb }
					} = obj

					if (nType === NUTRITION_TYPE.THIN) {
						setActiveTog(true)
					} else {
					}

					let amountNorm = 0
					let amountProtein = 0
					let amountOil = 0
					let amountCarb = 0

					amountNorm = dailyNorm - amount
					amountProtein = Math.trunc((amountNorm * proteinPercent) / 400)
					amountOil = Math.trunc((amountNorm * oilPercent) / 900)
					amountCarb = Math.trunc(
						(amountNorm - (amountNorm / 100) * (proteinPercent + oilPercent)) / 4
					)

					if (mergeAmount) {
						amountNorm = amountNorm - (amountNorm * mergeAmount) / 100
					}

					if (mergeCarb) {
						amountCarb = amountCarb - mergeCarb
					}

					setActiveCalories(amountNorm)
					setActiveProtein(amountProtein)
					setActiveOil(amountOil)
					setActiveCarb(amountCarb)
				} else {
					obj = {
						...initialState,
						date: new Date(`${activeYear}-${activeMonth + 1}-${dayy}`)
					}
				}

				setSchemaNutrition(obj)
			}
		}
	}

	useEffect(() => {
		effect1()
	}, [user, activeDay])

	const effect2 = () => {
		if (schemaNutrition) {
			const { products, dishes } = schemaNutrition

			setProducts([...products, ...dishes.map(d => convertDishToProduct(d))])
		}
	}

	useEffect(() => {
		effect2()
	}, [schemaNutrition])

	const setToAmounts = () => {
		if (schemaNutrition) {
			setAmounts([...schemaNutrition.amountsP, ...schemaNutrition.amountsD])
		}
	}

	useEffect(() => {
		setToAmounts()
	}, [products])

	const setToProperties = () => {
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
	}

	useEffect(() => {
		setToProperties()
	}, [amounts])

	const navigateAddProducts = () => {
		const obj = schemaNutrition
			? {
					...schemaNutrition,
					date: JSON.stringify(schemaNutrition.date)
			  }
			: undefined

		navigation.navigate(PROFILE.ADD_PRODUCTS, {
			products,
			// @ts-ignore
			schemaNutrition: obj
		})
	}

	const onShow = (index: number, value: string) => {
		setModalValue(value)
		setShow({ index })
	}

	const onCancel = () => {
		setShow({})
		setModalValue('')
	}

	const saveSchemaNutrition = async ({
		arr1,
		arr2,
		amountsP,
		amountsD
	}: {
		arr1: string[]
		arr2: string[]
		amountsP: number[]
		amountsD: number[]
	}) => {
		if (user && schemaNutrition) {
			const dd = new Date(schemaNutrition.date)

			const date = {
				year: dd.getFullYear(),
				month: dd.getMonth() + 1,
				day: dd.getDate()
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

			await ApiService.put(`/users/set-schema-nutrition/${user._id}`, obj)

			const res = await ApiService.get<Response<User>>('/users/me')

			dispatch(setUser(res.data))
		}
	}

	const onSave = async () => {
		if (schemaNutrition) {
			setModalLoading(true)

			let arr1: string[] = []
			let arr2: string[] = []
			let amountsP: number[] = []
			let amountsD: number[] = []

			products.map((p, i) => {
				if (p.category.type === CategoryType.PRODUCT) {
					arr1.push(p._id)

					if (i === show.index) {
						amountsP.push(Number(modalValue))
					} else {
						amountsP.push(amounts[i])
					}
				} else {
					arr2.push(p._id)

					if (i === show.index) {
						amountsD.push(Number(modalValue))
					} else {
						amountsD.push(amounts[i])
					}
				}
			})

			try {
				await saveSchemaNutrition({ arr1, arr2, amountsP, amountsD })
			} catch (e) {
				console.log('e: ', e)
			}

			setModalLoading(false)
			onCancel()
		}
	}

	const onRemove = async () => {
		if (schemaNutrition) {
			setLoading(true)

			let arr1: string[] = []
			let arr2: string[] = []
			let amountsP: number[] = []
			let amountsD: number[] = []

			products.slice(0, -1).map((p, i) => {
				if (p.category.type === CategoryType.PRODUCT) {
					arr1.push(p._id)

					if (i === show.index) {
						amountsP.push(Number(modalValue))
					} else {
						amountsP.push(amounts[i])
					}
				} else {
					arr2.push(p._id)

					if (i === show.index) {
						amountsD.push(Number(modalValue))
					} else {
						amountsD.push(amounts[i])
					}
				}
			})

			try {
				await saveSchemaNutrition({ arr1, arr2, amountsP, amountsD })
			} catch (e) {
				console.log('e: ', e)
			}

			setLoading(false)
		}
	}

	const onRemoveByIndex = async (index: number) => {
		if (schemaNutrition) {
			setLoading(index)

			let arr1: string[] = []
			let arr2: string[] = []
			let amountsP: number[] = []
			let amountsD: number[] = []

			products
				.filter((p, i) => i !== index)
				.map((p, i) => {
					if (p.category.type === CategoryType.PRODUCT) {
						arr1.push(p._id)

						if (i === show.index) {
							amountsP.push(Number(modalValue))
						} else {
							amountsP.push(amounts[i])
						}
					} else {
						arr2.push(p._id)

						if (i === show.index) {
							amountsD.push(Number(modalValue))
						} else {
							amountsD.push(amounts[i])
						}
					}
				})

			try {
				await saveSchemaNutrition({ arr1, arr2, amountsP, amountsD })
			} catch (e) {
				console.log('e: ', e)
			}

			setLoading(false)
		}
	}

	return {
		show,
		loading,
		modalLoading,
		monthlyData,
		activeTog,
		activeCalories,
		activeProtein,
		activeOil,
		activeCarb,
		calories,
		protein,
		oil,
		carb,
		products,
		amounts,
		activeDay,
		setActiveDay,
		activeMonth,
		setActiveMonth,
		activeYear,
		setActiveYear,
		modalValue,
		setModalValue,
		onShow,
		onCancel,
		onSave,
		onRemove,
		onRemoveByIndex,
		navigateAddProducts,
		t
	}
}
