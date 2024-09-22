import { useEffect, useState } from 'react'
import { CalendarItem, IActiveDayProps } from '../../../../../components/CustomCalendar'
import { getCalendarDays } from '../../../../../utils/getCalendarDays'
import ReactNativeCalendarEvents from 'react-native-calendar-events'
import { Response, User } from '../../../../../types'
import { ApiService } from '../../../../../services'

const cd = new Date(Date.now())

export const StudentHooks = (apprenticeId = '') => {
	const [activeDay, setActiveDay] = useState<IActiveDayProps | null>(null)
	const [activeMonth, setActiveMonth] = useState(cd.getMonth())
	const [activeYear, setActiveYear] = useState(cd.getFullYear())
	const [monthlyData, setMonthlyData] = useState<CalendarItem[][]>([])
	const [date, setDate] = useState(new Date())
	const [pickerState, setPickerState] = useState<'date' | 'time' | null>(null)
	const [user, setUser] = useState<User | undefined>(undefined)
	const getUser = async () => {
		try {
			const req = await ApiService.get<Response<User>>(`/users/${apprenticeId}`)
			setUser(req.data)
		} catch (e) {}
	}
	useEffect(() => {
		if (apprenticeId.length > 1) {
			getUser()
		}
	}, [])

	const effect = () => {
		const { arr } = getCalendarDays(activeYear, activeMonth)

		let newArr = arr.map((a: CalendarItem[]) =>
			a.map((aa: CalendarItem) => {
				let newAa: CalendarItem = aa

				if (aa) {
					delete newAa?.past
				} else {
					newAa = null
				}

				return newAa
			})
		)

		setMonthlyData(newArr)
	}

	useEffect(() => {
		effect()
	}, [activeMonth])

	const onRemind = async () => {
		setPickerState('time')
	}

	return {
		monthlyData,
		activeDay,
		setActiveDay,
		activeMonth,
		setActiveMonth,
		activeYear,
		setActiveYear,
		onRemind,
		date,
		setDate,
		pickerState,
		setPickerState,
		user
	}
}
