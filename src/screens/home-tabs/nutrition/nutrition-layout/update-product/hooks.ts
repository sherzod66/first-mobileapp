import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Alert } from 'react-native'
import { Category, CategoryType, Exercise, Product, Response } from '../../../../../types'
import { SelectItem } from '../../../../../components/common/SelectPrimary'
import {
	selectProductCategories,
	setCategoriesByType
} from '../../../../../store/slices/categorySlice'
import { ApiService } from '../../../../../services'
import { NUTRITION } from '../../../../../navigation/ROUTES'
import { selectUser } from '../../../../../store/slices/appSlice'
import { addProduct, setProducts } from '../../../../../store/slices/productSlice'
import { countCalories } from '../../../../../utils/countCalories'
import { NutritionStackParamList } from '../..'
import { showSuccessToast } from '../../../../../utils/showToast'

type CustomCategory = Partial<
	Omit<Product, 'category'> & {
		category: Category & SelectItem
	}
>

type CustomCategoryUpdate = Omit<
	Category,
	'name' | 'updatedAt' | 'parent' | 'children' | 'createdAt'
> & {
	ru: string
	uz: string
	en: string
}

type NutritionPlanScreenRouteProp = RouteProp<NutritionStackParamList, NUTRITION.UPDATE_PRODUCT>

export const CreateProductHook = () => {
	const route = useRoute<NutritionPlanScreenRouteProp>()
	const productGlobal = useMemo(() => route.params.product, [route.params.product])
	const [product, setProduct] = useState<CustomCategory>({})
	const [category, setCategory] = useState<Partial<Category>>({})
	const [categoryModalVisible, setCategoryModalVisible] = useState(false)
	const categories = useSelector(selectProductCategories)
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const user = useSelector(selectUser)

	useEffect(() => {
		if (product && product.protein && product.oil && product.carb) {
			console.log('work')
			setProduct(prev => ({
				...prev,
				calories: countCalories(String(product.protein), String(product.oil), String(product.carb))
			}))
		}
	}, [product.protein, product.oil, product.carb])

	useEffect(() => {
		if (productGlobal) {
			// const {calories, ...needKeys} = {...productGlobal}
			setProduct({
				_id: productGlobal._id,
				amounts: productGlobal.amounts,
				calories: productGlobal.calories,
				carb: productGlobal.carb,
				createdAt: productGlobal.createdAt,
				creatorTrainer: productGlobal.creatorTrainer,
				name: productGlobal.name,
				userProduct: productGlobal.userProduct,
				updatedAt: productGlobal.updatedAt,
				protein: productGlobal.protein,
				creatorUser: productGlobal.creatorUser,
				isAdmin: productGlobal.isAdmin,
				oil: productGlobal.oil,
				products: productGlobal.products
			})
			setCategory({ ...productGlobal?.category })
		}
	}, [productGlobal])
	const fetchCategories = async () => {
		const resCategories = await ApiService.get<Response<Category[]>>('/categories')
		dispatch(
			setCategoriesByType({
				type: CategoryType.EXERCISE,
				categories: resCategories.data.filter(v => v.type === CategoryType.EXERCISE)
			})
		)
		dispatch(
			setCategoriesByType({
				type: CategoryType.PRODUCT,
				categories: resCategories.data.filter(v => v.type === CategoryType.PRODUCT)
			})
		)
		dispatch(
			setCategoriesByType({
				type: CategoryType.DISH,
				categories: resCategories.data.filter(v => v.type === CategoryType.DISH)
			})
		)
	}

	const onCategoryRemove = async (e: string) => {
		try {
			await ApiService.delete(`/categories/${e}`)
			Alert.alert('Внимание', 'Категория успешно удалена')
			await fetchCategories()
		} catch (error) {}
	}

	const onModalToggle = () => {
		setCategoryModalVisible(e => !e)
	}

	const onChange = (key: keyof Product) => (value: any) => {
		if (key.indexOf('.') !== -1) {
			const [name, lang] = key.split('.')
			setProduct({
				...product,
				//@ts-ignore
				[name]: { ...(product[name] || {}), [lang]: value }
			})
			return
		}
		setProduct({ ...product, [key]: value })
	}
	const onCategoryChange = (key: string) => (value: any) => {
		if (key.indexOf('.') !== -1) {
			const [name, lang] = key.split('.')
			setCategory({
				...category,
				//@ts-ignore
				[name]: { ...(category[name] || {}), [lang]: value }
			})
			return
		}
		setCategory({ ...category, [key]: value })
	}

	const onCategorySubmit = async () => {
		console.log(category)
		try {
			const current = {
				...category,
				parent: category?.parent?.value,
				type: CategoryType.PRODUCT
			}
			const res = await ApiService.post('/categories', current)
			await fetchCategories()
		} catch (error) {
			console.log('ERROR', JSON.stringify(error))
		}
		setCategory({})
		setCategoryModalVisible(false)
	}

	const onExerciseSubmit = async () => {
		if (product.name?.ru) {
			try {
				const current = {
					calories: product.calories ? product.calories : 0,
					carb: product.carb ? product.carb : 0,
					name: {
						uz: product.name?.uz ? product.name?.uz : ' ',
						en: product.name?.en ? product.name?.en : ' ',
						ru: product.name?.ru ? product.name?.ru : ' '
					},
					oil: product.oil ? product.oil : 0,
					protein: product.protein ? product.protein : 0
				}
				await ApiService.put(`/products/${productGlobal._id}`, current)
				const resProducts = await ApiService.get<Response<Product[]>>('/products')
				dispatch(setProducts(resProducts.data))
			} catch (error: any) {
				console.log(JSON.stringify(error.response?.data))
			}
			navigation.navigate(NUTRITION.NUTRITION_LAYOUT as never)
		}
	}

	useEffect(() => {
		if (!!product.category) {
			const found = categories.find(e => e._id === product.category?.value)
		}
	}, [product.category])

	return {
		onChange,
		categories,
		categoryModalVisible,
		onModalToggle,
		onCategoryChange,
		onCategorySubmit,
		onExerciseSubmit,
		onCategoryRemove,
		product
	}
}
