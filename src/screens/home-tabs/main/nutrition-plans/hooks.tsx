import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { MainStackParamList } from '..'
import { MAIN, NUTRITION } from '../../../../navigation/ROUTES'
import { NUTRITION_TYPE, NutritionPlan, ROLES, Response } from '../../../../types'
import { useRedux } from '../../../../store/hooks'
import { selectUser } from '../../../../store/slices/appSlice'
import { ApiService } from '../../../../services'
import { useTranslation } from 'react-i18next'

export type NutritionPlansScreenNavigationProp = NativeStackNavigationProp<
	MainStackParamList,
	MAIN.NUTRITION_PLANS
>

export const NutritionPlansHooks = () => {
	const navigation = useNavigation<NutritionPlansScreenNavigationProp>()

	const [user] = useRedux(selectUser)
	const { t } = useTranslation()

	const [activeTab, setActiveTab] = useState(0)
	const [plans, setPlans] = useState<NutritionPlan[]>([])
	const [subCategory, setSubCategory] = useState(1)
	const isSuperAdmin = user?.role === ROLES.SUPERADMIN

	const effect = async () => {
		const resWorkoutPlans = await ApiService.get<Response<NutritionPlan[]>>(
			`/nutrition-plans?isPublic=true`
		)
		setPlans(
			resWorkoutPlans.data.filter(nP => {
				return nP.type === NUTRITION_TYPE[activeTab === 0 ? 'THIN' : 'FAT']
			})
		)
	}

	useEffect(() => {
		effect()
	}, [activeTab, subCategory])

	const onIndividualPress = (plan: NutritionPlan) => {
		navigation.navigate(MAIN.NUTRITION_DETAIL, { nutritionPlan: plan })
	}
	const onIndividualPlan = (plan: NutritionPlan) => {
		navigation.navigate(MAIN.TRAINERS, { individual: true, workout: false })
	}

	return {
		activeTab,
		setActiveTab,
		plans,
		onIndividualPress,
		setSubCategory,
		subCategory,
		onIndividualPlan,
		t
	}
}
