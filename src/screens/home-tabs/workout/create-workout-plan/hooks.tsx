import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { WorkoutStackParamList } from '..'
import EventEmitter from '../../../../utils/EventEmitter'
import { WORKOUT } from '../../../../navigation/ROUTES'
import { GENDER, LEVEL, ROLES, Response, Workout, WorkoutPlan } from '../../../../types'
import { showErrToast } from '../../../../utils/showToast'
import { useRedux } from '../../../../store/hooks'
import { selectTrainer, selectUser, setUser } from '../../../../store/slices/appSlice'
import { ApiService } from '../../../../services'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export type CreateWorkoutPlanScreenNavigationProp = NativeStackNavigationProp<
	WorkoutStackParamList,
	WORKOUT.CREATE_WORKOUT_PLAN
>

let levelsMapper = {
	Новичок: LEVEL.NEWBIE,
	Опытный: LEVEL.EXPERIENCED,
	Продвинутый: LEVEL.ADVANCED
}

export const CreateWorkoutPlanHooks = () => {
	const navigation = useNavigation<CreateWorkoutPlanScreenNavigationProp>()

	const [user, dispatch] = useRedux(selectUser)
	const isSuperAdminOrTrainer = user?.role === ROLES.SUPERADMIN || user?.role === ROLES.TRAINER
	const isSuperAdmin = user?.role === ROLES.SUPERADMIN

	const { t } = useTranslation()
	const [loading, setLoading] = useState(false)
	const [title, setTitle] = useState('')
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [week, setWeek] = useState(1)
	const [groupWorkouts, setGroupWorkouts] = useState<Workout[][]>([[]])
	const [shouldShow, setShouldShow] = useState(true)
	const [byFemale, setByFemale] = useState(false)
	const [publicly, setPublic] = useState(false)
	const [drop, setDrop] = useState<keyof typeof levelsMapper>('Опытный')
	const trainer = useSelector(selectTrainer)

	const setToGroupWorkouts = ({ arr, i }: { arr: Workout[]; i: number }) => {
		let arr1 = [...groupWorkouts]
		arr1[i] = [...arr]
		setGroupWorkouts([...arr1])
	}

	useEffect(() => {
		EventEmitter.addListener('onSetGroupWorkouts', setToGroupWorkouts)

		return () => {
			EventEmitter.removeListener('onSetGroupWorkouts', setToGroupWorkouts)
		}
	}, [groupWorkouts])

	const incWeek = () => {
		if (week <= 3) {
			setWeek(week + 1)
		}
	}

	const decWeek = () => {
		if (week >= 2) {
			setWeek(week - 1)
		}
	}

	const addGroupWorkout = () => {
		if (groupWorkouts.length <= 6) {
			setGroupWorkouts([...groupWorkouts, []])
		}
	}

	const removeGroupWorkout = () => {
		if (groupWorkouts.length >= 2) {
			setGroupWorkouts(groupWorkouts.slice(0, -1))
		}
	}

	const onAddWorkouts = (index: number) => {
		navigation.navigate(WORKOUT.ADD_WORKOUTS, {
			index,
			defaultWorkouts: groupWorkouts[index]
		})
	}

	const onSave = async () => {
		if (!title) {
			showErrToast('Enter title')
			return
		}

		if (!description) {
			showErrToast('Enter description')
			return
		}

		let condition = false

		for (let i = 0; i < groupWorkouts.length; i++) {
			if (!groupWorkouts[i].length) {
				condition = true
			} else {
				for (let j = 0; j < groupWorkouts[i].length; j++) {
					if (!groupWorkouts[i][j]) {
						condition = true
					}
				}
			}
		}

		if (condition) {
			showErrToast('Fill all workouts')
			return
		}

		setLoading(true)

		try {
			const workouts = groupWorkouts.map(gW =>
				gW.map(w => ({
					exercise: w.exercise._id,
					approach: w.approach,
					repetitions: w.repetitions
				}))
			)

			let obj = {
				title,
				description,
				price: +price,
				gender: byFemale ? GENDER.FEMALE : GENDER.MALE,
				level: levelsMapper[drop],
				week: week * 4,
				creator: user?._id,
				workouts,
				isPublic: publicly
			}

			const res = await ApiService.post<Response<WorkoutPlan>>('/workout-plans', obj)

			setLoading(false)

			let arr = [...(user?.workoutPlans ?? [])]
			arr.push(res.data)
			let userObj = { ...user, workoutPlans: [...arr] }

			// @ts-ignore
			dispatch(setUser({ ...userObj }))
			navigation.goBack()
		} catch (e) {
			setLoading(false)
			console.log('e: ', e)
		}
	}

	return {
		loading,
		title,
		setTitle,
		description,
		setDescription,
		week,
		groupWorkouts,
		incWeek,
		decWeek,
		addGroupWorkout,
		removeGroupWorkout,
		onAddWorkouts,
		onSave,
		name,
		setName,
		isSuperAdminOrTrainer,
		shouldShow,
		setShouldShow,
		drop,
		setDrop,
		byFemale,
		setByFemale,
		price,
		setPrice,
		publicly,
		setPublic,
		t,
		trainer,
		isSuperAdmin
	}
}
