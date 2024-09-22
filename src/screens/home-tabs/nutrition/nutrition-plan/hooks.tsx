import { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NutritionStackParamList } from '..'
import { NUTRITION } from '../../../../navigation/ROUTES'
import { useRedux } from '../../../../store/hooks'
import {
	selectLanguage,
	selectSchemaNutritions,
	selectTrainer,
	selectUser,
	setUser
} from '../../../../store/slices/appSlice'
import {
	CategoryType,
	NUTRITION_TYPE,
	NutritionPlan,
	Reception,
	Response,
	ROLES,
	SchemaNutrition,
	SchemaNutrition1,
	User
} from '../../../../types'
import { showErrToast, showSuccessToast } from '../../../../utils/showToast'
import { ApiService } from '../../../../services'
import { useSelector } from 'react-redux'

export type NutritionPlanScreenRouteProp = RouteProp<
	NutritionStackParamList,
	NUTRITION.NUTRITION_PLAN
>

export const NutritionPlanHooks = () => {
	const route = useRoute<NutritionPlanScreenRouteProp>()
	const [schemaNutrition] = useRedux(selectSchemaNutritions)
	// console.log(
	//   schemaNutrition &&
	//     JSON.stringify(schemaNutrition[schemaNutrition.length - 1], null, 4)
	// );
	const { plan } = route.params ?? {}
	const [loading, setLoading] = useState<boolean>()
	const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

	const [user, dispatch] = useRedux(selectUser)
	const navigate = useNavigation()

	const [language] = useRedux(selectLanguage)
	const [activePlan, setActivePlan] = useState(0)
	const [activeReception, setActiveReception] = useState(0)
	const [reception, setReception] = useState<Reception | null>(null)

	const [isShow, setIsShow] = useState<boolean>(false)
	const [selected, setSelected] = useState<User[]>([])
	const trainer = useSelector(selectTrainer)

	const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null)

	const getNutritionPlan = async () => {
		try {
			const resTrainer = await ApiService.get<Response<NutritionPlan>>(
				`/nutrition-plans/${plan._id}`
			)
			if (resTrainer) setNutritionPlan(resTrainer.data)
			else setNutritionPlan(null)
		} catch (e) {}
	}

	useEffect(() => {
		getNutritionPlan()
	}, [])

	useEffect(() => {
		setActiveReception(0)
	}, [activePlan])

	useEffect(() => {
		setReception(plan.nutritions[activePlan][activeReception])
	}, [activePlan, activeReception])

	const onAddDiary = async () => {
		if (schemaNutrition) {
			setLoading(true)

			let arr1: string[] = getNutritionDay(schemaNutrition).products.map(p => p?._id)
			let arr2: string[] = getNutritionDay(schemaNutrition).dishes.map(d => d?._id)
			let amountsP: number[] = [...getNutritionDay(schemaNutrition).amountsP]
			let amountsD: number[] = [...getNutritionDay(schemaNutrition).amountsD]

			reception?.products.map((s, index) => {
				if (s.category.type === CategoryType.PRODUCT) {
					arr1.push(s._id)
					amountsP.push(reception.amountsP[index])
				} else {
					arr2.push(s?._id)
					amountsD.push(
						// @ts-ignore
						reception.amountsD[index]
					)
				}
			})

			// @ts-ignore
			const cd = new Date()
			const date = {
				year: cd.getFullYear(),
				month: cd.getMonth() + 1,
				day: cd.getDate()
			}

			const obj = {
				...schemaNutrition,
				date,
				data: {
					...getNutritionDay(schemaNutrition).data,
					type: getNutritionDay(schemaNutrition).data.nType
				},
				products: arr1,
				dishes: arr2,
				amountsP,
				amountsD
			}

			try {
				await saveSchemaNutrition(obj)
				showSuccessToast('Успешно добавлено!')
			} catch (e) {
				console.log('e: ', e)
			}

			setLoading(false)
		}
	}

	const saveSchemaNutrition = async (obj: SchemaNutrition1) => {
		if (user) {
			await ApiService.put(`/users/set-schema-nutrition/${user._id}`, obj)

			const res = await ApiService.get<Response<User>>('/users/me')

			dispatch(setUser(res.data))
		}
	}
	const onDeletePlan = async () => {
		setDeleteLoading(true)
		try {
			await ApiService.put(`/users/remove-nutrition-plan/${user?._id}`, {
				planId: plan._id
			})
			const res = await ApiService.get<Response<User>>('/users/me')
			dispatch(setUser(res.data))
			showSuccessToast('Успешно удалено!')
			navigate.goBack()
		} catch (e: any) {
			showErrToast(e.data.error.message)
			setDeleteLoading(false)
		} finally {
			setDeleteLoading(false)
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

				console.log({
					planId: plan._id,
					users: selected.map(item => item._id)
				})

				await ApiService.put(`/users/add-nutrition-plan-by-students/${user?._id}`, {
					planId: plan._id,
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
		language,
		plan,
		reception,
		activePlan,
		setActivePlan,
		activeReception,
		setActiveReception,
		onAddDiary,
		loading,
		onDeletePlan,
		deleteLoading,
		onModalToggle,
		onSelect,
		onSubmitAdd,
		nutritionPlan,
		isTrainer: user?.role === ROLES.TRAINER,
		trainer,
		user,
		isShow,
		selected
	}
}

const initialState = {
	date: new Date(),
	data: {
		nType: NUTRITION_TYPE.FAT,
		dailyNorm: 0,
		amount: 0,
		proteinPercent: 0,
		oilPercent: 0,
		mergeAmount: 0,
		mergeCarb: 0
	},
	products: [],
	amountsP: [],
	dishes: [],
	amountsD: []
}
const getNutritionDay = (nutrition: SchemaNutrition[]): SchemaNutrition => {
	const getNutrition = nutrition.findIndex(
		el => new Date(el.date).getDate() === new Date().getDate()
	)
	if (getNutrition < 0) {
		return initialState
	} else {
		return nutrition[getNutrition]
	}
}
