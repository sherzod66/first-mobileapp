import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { WorkoutStackParamList } from '../..'
import { ROUTES, WORKOUT } from '../../../../../navigation/ROUTES'
import { ApiService } from '../../../../../services'
import { useRedux } from '../../../../../store/hooks'
import { selectTrainer, selectUser, setUser } from '../../../../../store/slices/appSlice'
import { Response, Trainer, User, WorkoutPlan } from '../../../../../types'
import { showSuccessToast } from '../../../../../utils/showToast'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export type MyWorkoutPlansScreenNavigationProp = NativeStackNavigationProp<
	WorkoutStackParamList,
	WORKOUT.WORKOUT_LAYOUT
>

export const MyWorkoutPlansHooks = () => {
	const [loading, setLoading] = useState<any>()
	const [show, setShow] = useState<any>()

	const trainer = useSelector(selectTrainer)

	const { t } = useTranslation()

	const [user, dispatch] = useRedux(selectUser)
	const { workoutPlans } = user ?? {}

	const navigation = useNavigation<MyWorkoutPlansScreenNavigationProp>()

	const onPress = (workoutPlan: WorkoutPlan) => {
		navigation.navigate(WORKOUT.WORKOUT_PLAN, {
			workoutPlan
		})
	}

	const onRemove = async (i: number) => {
		try {
			setLoading({ [i]: !(loading && loading[i]) })

			const planId = (workoutPlans && workoutPlans[i]._id) ?? ''
			await ApiService.patch(`/users/remove-workout-plan/${user?._id}`, {
				planId: planId
			})

			const res = await ApiService.get<Response<User>>('/users/me')

			dispatch(setUser(res.data))
			showSuccessToast('Успешно удалено!')
			setLoading(undefined)
			setShow(undefined)
		} catch (e) {
			console.log('e: ', e)
		}
	}

	const onCreate = () => {
		navigation.navigate(ROUTES.TABS.WORKOUT.CREATE_WORKOUT_PLAN as never)
	}

	return {
		loading,
		setLoading,
		show,
		setShow,
		onPress,
		onCreate,
		onRemove,
		workoutPlans,
		user,
		trainer,
		t
	}
}
