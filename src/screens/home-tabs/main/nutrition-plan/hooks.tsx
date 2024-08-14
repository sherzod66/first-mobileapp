import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { MainStackParamList } from '..'
import { MAIN } from '../../../../navigation/ROUTES'
import { ApiService } from '../../../../services'
import { NutritionPlan, Response, ROLES, User } from '../../../../types'
import { useRedux } from '../../../../store/hooks'
import { selectUser, setUser } from '../../../../store/slices/appSlice'
import EventEmitter from '../../../../utils/EventEmitter'
import { showSuccessToast } from '../../../../utils/showToast'
export type ExerciseScreenRouteProp = RouteProp<MainStackParamList, MAIN.NUTRITION_DETAIL>

export const NutritionPlanHooks = () => {
	const navigation = useNavigation()
	const route = useRoute<ExerciseScreenRouteProp>()
	const { nutritionPlan } = route.params
	const [loading, setLoading] = useState<boolean>()
	const [deleteLoading, setDeleteLoading] = useState<boolean>()
	const [user, dispatch] = useRedux(selectUser)
	const isAdmin = user?.role === ROLES.SUPERADMIN

	const [disabled, setDisabled] = useState(false)
	const onPress = async () => {
		try {
			setLoading(true)

			await ApiService.put<Response<NutritionPlan>>(`/users/add-nutrition-plan/${user?._id}`, {
				planId: nutritionPlan._id
			})
			const res = await ApiService.get<Response<User>>('/users/me')
			dispatch(setUser(res.data))
			showSuccessToast('Успешно добавлено!')
			setLoading(false)
			setDisabled(true)
			navigation.goBack()
		} catch (e) {
			setLoading(false)
		}
	}

	const onDeletePlan = async () => {
		setDeleteLoading(true)
		try {
			await ApiService.delete(`/nutrition-plans/${nutritionPlan._id}`)
			const res = await ApiService.get<Response<User>>('/users/me')
			dispatch(setUser(res.data))
			showSuccessToast('Успешно удалено!')
			navigation.goBack()
		} catch (e) {
			console.log(e)
			showSuccessToast(e.data.error.message)
			setDeleteLoading(false)
		} finally {
			setDeleteLoading(false)
		}
	}

	return {
		loading,
		setLoading,
		nutritionPlan,
		disabled,
		onPress,
		isAdmin,
		deleteLoading,
		onDeletePlan
	}
}
