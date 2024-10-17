import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { CalendarItem, IActiveDayProps } from '../../../../../components/CustomCalendar'
import { PRODUCT_AMOUNT } from '../../../../../constants/AMOUNT'
import { PROFILE } from '../../../../../navigation/ROUTES'
import { ReceptProduct } from '../../../../../types'
import EventEmitter from '../../../../../utils/EventEmitter'
import { getCalendarDays } from '../../../../../utils/getCalendarDays'
import { getSumValues } from '../../../../../utils/getSumValues'
import { getWeeklyDays } from '../../../../../utils/getWeeklyDays'
import { useTranslation } from 'react-i18next'

const cd = new Date(Date.now())

export const MyNutritionHooks = () => {
	const navigation = useNavigation<any>()

	const [activeTab, setActiveTab] = useState(0)
	const [activeDay, setActiveDay] = useState<IActiveDayProps | null>(null)
	const [activeMonth, setActiveMonth] = useState(new Date(cd).getMonth())
	const [activeYear, setActiveYear] = useState(new Date(cd).getFullYear())
	const [monthlyData, setMonthlyData] = useState<CalendarItem[][]>([])
	const [activeWeekDay, setActiveWeekDay] = useState<number | null>(null)
	const [weeklyData, setWeeklyData] = useState<CalendarItem[]>([])
	const [products, setProducts] = useState<ReceptProduct[]>([])
	const [amounts, setAmounts] = useState<number[]>([])
	const [calories, setCalories] = useState(0)
	const [protein, setProtein] = useState(0)
	const [oil, setOil] = useState(0)
	const [carb, setCarb] = useState(0)
	const { t, i18n } = useTranslation()

	const currentDate = new Date(cd)
	const yesterday = new Date(currentDate)
	yesterday.setDate(yesterday.getDate() - 1)

	const effect = () => {
		const currentYear = currentDate.getFullYear()
		const currentMonth = currentDate.getMonth()

		const { arr, day, week } = getCalendarDays(activeYear, activeMonth)
		getWeeklyDays(currentDate)

		let newArr = arr.map((a: CalendarItem[]) =>
			a.map((aa: CalendarItem) => {
				let newAa: CalendarItem = aa

				if (aa) {
					if (activeYear <= currentYear && activeMonth < currentMonth) {
						newAa = { ...aa, past: true, value: 3000 }
					} else {
						if (activeMonth > currentMonth) {
							delete newAa?.past
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
			setActiveDay({ weekIndex: week, dayIndex: day })
		} else {
			setActiveDay(null)
		}
	}

	useEffect(() => {
		effect()
	}, [activeMonth])

	useEffect(() => {
		if (activeTab === 2 || activeTab === 3) {
			let day = currentDate.getDate()

			if (activeTab === 3) {
				currentDate.setDate(day - 7)
			}

			let arr = getWeeklyDays(currentDate)

			arr = arr.map((a, i) => {
				if (a && (a.day < day || activeTab === 3)) {
					a.past = true
				}
				if (a && a.day === day) {
					setActiveWeekDay(i)
				}
				if (a && a.day === 15) {
					a.planned = true
				}
				return a
			})

			setWeeklyData(arr)
		}
	}, [activeTab])

	const onSelectWeekDay = (i: number) => {
		setActiveWeekDay(i)
	}

	useEffect(() => {
		let arr: number[] = []

		if (products.length) {
			products.map(p => {
				arr.push(p.amount ?? 0)
			})
		}

		setAmounts(arr)
	}, [products])

	useEffect(() => {
		if (products.length) {
			let tProducts = products.map((p, i) => ({ ...p, amount: amounts[i] }))

			setCalories(getSumValues(tProducts, 'calories'))
			setProtein(getSumValues(tProducts, 'protein'))
			setOil(getSumValues(tProducts, 'oil'))
			setCarb(getSumValues(tProducts, 'carb'))
		}
	}, [amounts])

	const addProducts = (ps: ReceptProduct[]) => {
		let arr: ReceptProduct[] = []

		for (let i = 0; i < ps.length; i++) {
			let obj = { ...ps[i] }

			let amount = 0

			if (obj.category.type === 'PRODUCT') {
				amount = PRODUCT_AMOUNT
			} else {
				// @ts-ignore
				const dish: Dish = { ...obj }

				dish.products.map((dp: any) => {
					amount += dp.amount ?? 0
				})
			}

			obj.amount = amount

			arr.push(obj)
		}

		setProducts(arr)
	}

	useEffect(() => {
		EventEmitter.addListener('onAddProducts', addProducts)

		return () => {
			EventEmitter.removeListener('onAddProducts', addProducts)
		}
	}, [])

	const navigateAddProducts = () => {
		navigation.navigate(PROFILE.ADD_PRODUCTS, {
			hasDishTab: true,
			products
		})
	}

	const onRecommendationPress = () => {
		navigation.navigate(PROFILE.RECOMMENDATION)
	}

	return {
		currentDate,
		yesterday,
		calories,
		protein,
		oil,
		carb,
		monthlyData,
		activeWeekDay,
		weeklyData,
		activeTab,
		setActiveTab,
		products,
		setProducts,
		amounts,
		setAmounts,
		activeDay,
		setActiveDay,
		activeMonth,
		setActiveMonth,
		activeYear,
		setActiveYear,
		onSelectWeekDay,
		navigateAddProducts,
		onRecommendationPress,
		t
	}
}
