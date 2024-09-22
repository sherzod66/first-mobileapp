import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { NutritionStackParamList } from '../..'
import { NUTRITION } from '../../../../../navigation/ROUTES'
import { useRedux } from '../../../../../store/hooks'
import { selectTrainer, selectUser } from '../../../../../store/slices/appSlice'
import { NutritionPlan, NUTRITION_TYPE, ROLES, Response, Trainer } from '../../../../../types'
import { ApiService } from '../../../../../services'
import { useSelector } from 'react-redux'

export type MyNutritionPlansScreenNavigationProp = NativeStackNavigationProp<
	NutritionStackParamList,
	NUTRITION.NUTRITION_LAYOUT
>

export const MyNutritionPlansHooks = () => {
	const navigation = useNavigation<MyNutritionPlansScreenNavigationProp>()

	const [user] = useRedux(selectUser)
	const { nutritionPlans } = user ?? {}
	const [activeTab, setActiveTab] = useState(0)
	const [plans, setPlans] = useState<NutritionPlan[]>([])

	const [subCategory, setSubCategory] = useState(1)
	const isSuperAdmin = user?.role === ROLES.SUPERADMIN
	const isTrainers = user?.role === ROLES.TRAINER

	const trainer = useSelector(selectTrainer)

	const effect = async () => {
		if (nutritionPlans)
			setPlans(
				nutritionPlans.filter(nP => {
					return nP.type === NUTRITION_TYPE[activeTab === 0 ? 'THIN' : 'FAT']
				})
			)
		// if (user) {
		//   setPlans(
		//     user.nutritionPlans.filter(
		//       (nP) => nP.type === NUTRITION_TYPE[activeTab ? "THIN" : "FAT"]
		//     )
		//   );
		// }
	}

	useEffect(() => {
		effect()
	}, [activeTab, subCategory, user])

	const onPlanPress = (index: number) => {
		navigation.navigate(NUTRITION.NUTRITION_PLAN, {
			plan: plans[index]
		})
	}

	const onPress = () => {
		navigation.navigate(NUTRITION.CREATE_NUTRITION_PLAN, {
			type: NUTRITION_TYPE[activeTab ? 'THIN' : 'FAT']
		})
	}

	return {
		activeTab,
		setActiveTab,
		plans,
		onPlanPress,
		onPress,
		isSuperAdmin,
		subCategory,
		setSubCategory,
		isTrainers,
		trainer
	}
}
