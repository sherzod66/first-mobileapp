import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ProfileStackParamList } from '../..'
import { PROFILE } from '../../../../../navigation/ROUTES'
import { ApiService } from '../../../../../services'
import { useRedux } from '../../../../../store/hooks'
import { selectTrainer, selectUser, setUser } from '../../../../../store/slices/appSlice'
import { Exercise, Response, ScheduleWorkout, User } from '../../../../../types'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export type MyWorkoutScreenNavigationProp = NavigationProp<ProfileStackParamList, PROFILE.MY_DATA>

export const StudentWorkoutHooks = (apprenticeId = '') => {
	const [show, setShow] = useState<any>({})
	const [data, setData] = useState<ScheduleWorkout | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [showModal, setShowModal] = useState(false)
	const [modalLoading, setModalLoading] = useState(false)
	const trainer = useSelector(selectTrainer)
	const { i18n } = useTranslation()
	const [user, setUser] = useState<User | undefined>(undefined)
	const getUser = async () => {
		try {
			setIsLoading(true)

			const req = await ApiService.get<Response<User>>(`/users/${apprenticeId}`)
			setUser(req.data)
			setIsLoading(false)
		} catch (e) {
			setIsLoading(false)
		}
	}
	useEffect(() => {
		if (apprenticeId.length > 1) {
			getUser()
		}
	}, [])

	const navigation = useNavigation<MyWorkoutScreenNavigationProp>()

	const effect = async () => {
		if (user) {
			setData(user.scheduleWorkouts.find(s => !s.isFinished) ?? null)
		}
	}

	useEffect(() => {
		effect()
	}, [user])

	const onHide = () => {
		setShowModal(false)
	}

	const onFinish = async () => {
		if (user) {
			setModalLoading(true)

			try {
				await ApiService.put(`/users/finish-schedule-workout/${user._id}`)

				const res = await ApiService.get<Response<User>>('/users/me')

				setUser(res.data)
			} catch (e) {
				console.log('e: ', e)
			}

			setModalLoading(false)
			setShowModal(false)
		}
	}

	const onPress = (workoutIndex: number, weekIndex: number) => {
		if (data) {
			navigation.navigate(PROFILE.WORKOUT_RESULTS_STUDENT, {
				userId: apprenticeId,
				weekIndex,
				workoutIndex
			})
		}
	}

	const exercisePress = (exercise: Exercise) => {
		navigation.navigate(PROFILE.EXERCISE, {
			exercise
		})
	}

	console.log(user?.scheduleWorkouts)

	return {
		data,
		setData,
		show,
		setShow,
		showModal,
		setShowModal,
		modalLoading,
		onPress,
		onHide,
		onFinish,
		i18n,
		exercisePress,
		isLoading
	}
}
