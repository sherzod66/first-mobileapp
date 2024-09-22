import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { WorkoutStackParamList } from '..'
import { WORKOUT } from '../../../../navigation/ROUTES'
import { ApiService } from '../../../../services'
import { useRedux } from '../../../../store/hooks'
import { selectTrainer, selectUser, setUser } from '../../../../store/slices/appSlice'
import { Response, ROLES, Trainer, User, WorkoutPlan } from '../../../../types'
import { useSelector } from 'react-redux'
import { string } from 'yup'
import { showErrToast, showSuccessToast } from '../../../../utils/showToast'

export type WorkoutPlanScreenNavigationProp = NativeStackNavigationProp<
	WorkoutStackParamList,
	WORKOUT.WORKOUT_PLAN
>

export type WorkoutPlanScreenRouteProp = RouteProp<WorkoutStackParamList, WORKOUT.WORKOUT_PLAN>

export const WorkoutPlanHooks = () => {
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const [isShow, setIsShow] = useState<boolean>(false)
	const [selected, setSelected] = useState<User[]>([])

	const [user, dispatch] = useRedux(selectUser)

	const navigation = useNavigation<WorkoutPlanScreenNavigationProp>()
	const route = useRoute<WorkoutPlanScreenRouteProp>()
	const { workoutPlan } = route.params
	const [plan, setPlan] = useState<WorkoutPlan | null>(null)

	const trainer = useSelector(selectTrainer)

	const getWorkoutPlan = async () => {
		try {
			const resTrainer = await ApiService.get<Response<WorkoutPlan>>(
				`/workout-plans/${workoutPlan._id}`
			)
			if (resTrainer) setPlan(resTrainer.data)
			else setPlan(null)
		} catch (e) {}
	}

	useEffect(() => {
		getWorkoutPlan()
	}, [])

	const onPress = async () => {
		if (user) {
			try {
				setLoading(true)

				await ApiService.put(`/users/set-schedule-workout/${user._id}`, {
					planId: workoutPlan._id
				})

				const res = await ApiService.get<Response<User>>('/users/me')

				dispatch(setUser(res.data))

				setLoading(false)
				navigation.goBack()
			} catch (e) {
				setLoading(false)
				console.log('e: ', JSON.stringify(e, null, 4))
			}
		}
	}

	const onModalToggle = () => {
		setIsShow(!isShow)
	}

	const onSelect = (users: User) => {
		let arr = [...selected]

		if (selected.find(s => s?._id === users?._id)) {
			arr = arr.filter(a => a?._id !== users?._id)
		} else {
			arr.push(users)
		}

		setSelected(arr)
	}

	const onSubmitAdd = async () => {
		if (selected.length > 0) {
			try {
				setLoading(true)

				await ApiService.put(`/users/add-workout-plan-by-students/${user?._id}`, {
					planId: workoutPlan._id,
					users: selected.map(item => item._id)
				})
				showSuccessToast('Успешно отправлено!')
				setLoading(false)
				setIsShow(false)
			} catch (e) {
				setLoading(false)
				console.log('e: ', JSON.stringify(e, null, 4))
			}
		} else {
			showErrToast('Выберите ученика')
		}
	}

	return {
		workoutPlan,
		onPress,
		loading,
		disabled,
		trainer,
		plan,
		isTrainer: user?.role === ROLES.TRAINER,
		onModalToggle,
		isShow,
		onSelect,
		selected,
		onSubmitAdd,
		user
	}
}
