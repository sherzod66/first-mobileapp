import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { ProfileStackParamList } from '..'
import { PROFILE } from '../../../../navigation/ROUTES'
import { ApiService } from '../../../../services'
import { Response, ScheduleWorkout, User } from '../../../../types'
import { useTranslation } from 'react-i18next'

type WorkoutResultsScreenNavigationProp = NativeStackNavigationProp<
	ProfileStackParamList,
	PROFILE.WORKOUT_RESULTS
>

type WorkoutResultsScreenRouteProp = RouteProp<
	ProfileStackParamList,
	PROFILE.WORKOUT_RESULTS_STUDENT
>

export const WorkoutResultsHooks = () => {
	const route = useRoute<WorkoutResultsScreenRouteProp>()
	const { workoutIndex, weekIndex, userId } = route.params
	const [data, setData] = useState<ScheduleWorkout | null>(null)
	const { i18n } = useTranslation()

	const [user, setUser] = useState<User | undefined>(undefined)
	const getUser = async () => {
		try {
			const req = await ApiService.get<Response<User>>(`/users/${userId}`)
			setUser(req.data)
		} catch (e) {}
	}
	useEffect(() => {
		if (userId.length > 1) {
			getUser()
		}
	}, [])

	const navigation = useNavigation<WorkoutResultsScreenNavigationProp>()

	const effect = async () => {
		if (user) {
			setData(user.scheduleWorkouts.find(s => !s.isFinished) ?? null)
		}
	}

	useEffect(() => {
		effect()
	}, [user])

	const onPress = (index: number) => {
		if (data) {
			const { exercise } = data.plan.workouts[workoutIndex][index]

			navigation.navigate(PROFILE.EXERCISE, {
				exercise
			})
		}
	}

	const getRecordWight = (workoutIndex: number, weekIndex: number, workout: number): number => {
		const weight: number[] = []
		data?.results[workoutIndex].forEach(first =>
			first[workout].forEach(third => weight.push(third.weight))
		)

		weight.sort((a, b) => a - b)
		return weight[weight.length - 1]
	}

	return {
		data,
		workoutIndex,
		weekIndex,
		onPress,
		getRecordWight,
		i18n
	}
}
