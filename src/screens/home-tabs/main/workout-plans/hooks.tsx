import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { MainStackParamList } from '..'
import { MAIN } from '../../../../navigation/ROUTES'
import { ApiService } from '../../../../services'
import { useRedux } from '../../../../store/hooks'
import { selectUser, setUser } from '../../../../store/slices/appSlice'
import { GENDER, LEVEL, Response, ROLES, User, WorkoutPlan } from '../../../../types'
import EventEmitter from '../../../../utils/EventEmitter'
import { getNewData } from '../../../../utils/getNewData'
import { showSuccessToast } from '../../../../utils/showToast'
import { useTranslation } from 'react-i18next'

export type WorkoutPlansScreenNavigationProp = NativeStackNavigationProp<
	MainStackParamList,
	MAIN.WORKOUT_PLANS
>

export const WorkoutPlansHooks = () => {
	const [activeGender, setActiveGender] = useState(0)
	const [activeLevel, setActiveLevel] = useState<number>(0)
	const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([])
	const [loading, setLoading] = useState<any>()
	const [show, setShow] = useState<any>()

	const [user, dispatch] = useRedux(selectUser)
	const isSuperAdmin = user?.role === ROLES.SUPERADMIN
	const { workoutPlans: userWorkoutPlans } = user ?? {}
	const { t } = useTranslation()

	const navigation = useNavigation<WorkoutPlansScreenNavigationProp>()

	const removePlan = (id: string) => {
		setWorkoutPlans(workoutPlans.filter(a => a._id !== id))
	}

	const getWorkoutPlans = async () => {
		try {
			const resWorkoutPlans = await ApiService.get<Response<WorkoutPlan[]>>(
				`/workout-plans?gender=${Object.values(GENDER)[activeGender]}&level=${
					Object.values(LEVEL)[activeLevel]
				}&isPublic=true`
			)
			setWorkoutPlans(getNewData(resWorkoutPlans.data))
		} catch (e) {
			console.log('e: ', e)
		}
	}

	useEffect(() => {
		EventEmitter.addListener('onRemoveWorkoutPlan', removePlan)
		return () => {
			EventEmitter.removeListener('onRemoveWorkoutPlan', removePlan)
		}
	}, [workoutPlans])

	useEffect(() => {
		getWorkoutPlans()
		// setActiveLevel(0);
	}, [activeGender, activeLevel])

	const onPress = (index: number) => {
		navigation.navigate(MAIN.WORKOUT_PLAN, {
			workoutPlan: workoutPlans[index]
		})
	}

	const onIndividualPress = () => {
		navigation.navigate(MAIN.TRAINERS, { individual: true, workout: true })
	}

	const onRemove = async (id: string, index: number) => {
		try {
			setLoading({ [index]: !(loading && loading[index]) })

			await ApiService.delete(`/workout-plans/${id}`)

			const res = await ApiService.get<Response<User>>('/users/me')
			getWorkoutPlans()
			dispatch(setUser(res.data))
			showSuccessToast('Успешно удалено!')
			setLoading(undefined)
			setShow(undefined)
		} catch (e) {
			console.log('e: ', e)
		}
	}

	return {
		activeGender,
		setActiveGender,
		activeLevel,
		setActiveLevel,
		workoutPlans,
		onPress,
		onIndividualPress,
		loading,
		setLoading,
		show,
		setShow,
		onRemove,
		isSuperAdmin,
		t
	}
}
