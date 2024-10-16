import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
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

export const CreateProductHook = () => {
	const [product, setProduct] = useState<CustomCategory>({})
	const [category, setCategory] = useState<Partial<Category>>({})
	const [categoryModalVisible, setCategoryModalVisible] = useState(false)
	const categories = useSelector(selectProductCategories)
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const user = useSelector(selectUser)

	const [updateLoading, setUpdateLoading] = useState<boolean>(false)
	const [updateCategoryValue, setUpdateCategoryValue] = useState<CustomCategoryUpdate>({
		_id: '',
		en: '',
		ru: '',
		type: CategoryType.PRODUCT,
		uz: ''
	})
	const [updateCategory, setUpdateCategory] = useState<{
		isOpen: boolean
		category: SelectItem | null
	}>({ category: null, isOpen: false })

	useEffect(() => {
		if (product && product.protein && product.oil && product.carb) {
			console.log('work')
			setProduct(prev => ({
				...prev,
				calories: countCalories(String(product.protein), String(product.oil), String(product.carb))
			}))
		}
	}, [product.protein, product.oil, product.carb])

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
		if (product.category && product.name?.ru) {
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
					protein: product.protein ? product.protein : 0,
					category: product.category?.value,
					creator: user?._id,
					userProduct: false
				}
				await ApiService.post('/products', current)
				const resProducts = await ApiService.get<Response<Product[]>>('/products')
				dispatch(setProducts(resProducts.data))
			} catch (error: any) {
				console.log(JSON.stringify(error.response?.data))
			}
			navigation.navigate(NUTRITION.NUTRITION_LAYOUT)
		}
	}
	const openUpdateCategory = (category: SelectItem) => {
		setUpdateCategory({ category, isOpen: true })
		const findCategory = categories.find(elem => elem._id === category.value)
		if (findCategory) {
			setUpdateCategoryValue({
				_id: findCategory._id,
				en: findCategory.name.en,
				ru: findCategory.name.ru,
				type: findCategory.type,
				uz: findCategory.name.uz
			})
		}
	}
	const closeUpdateCategory = () => {
		setUpdateCategory({ category: null, isOpen: false })
	}

	useEffect(() => {
		if (!!product.category) {
			const found = categories.find(e => e._id === product.category?.value)
		}
	}, [product.category])

	const categoryProductUpdateSubmit = async () => {
		if (updateCategoryValue) {
			const findCategory = categories.find(elem => elem._id === updateCategoryValue._id)
			if (findCategory) {
				try {
					setUpdateLoading(true)
					const payload = {
						name: {
							ru: updateCategoryValue.ru,
							uz: updateCategoryValue.uz,
							en: updateCategoryValue.en
						},
						type: updateCategoryValue.type,
						parent: findCategory.parent
					}
					await ApiService.put(`/categories/${updateCategoryValue._id}`, payload)

					await fetchCategories()
					setUpdateLoading(false)
					setUpdateCategory({ category: null, isOpen: false })
					showSuccessToast('Категорий успешно обновлен')
				} catch (error) {
					setUpdateLoading(false)
				}
			}
		}
	}

	return {
		onChange,
		categories,
		categoryModalVisible,
		onModalToggle,
		onCategoryChange,
		onCategorySubmit,
		onExerciseSubmit,
		onCategoryRemove,
		product,
		openUpdateCategory,
		closeUpdateCategory,
		updateLoading,
		updateCategoryValue,
		updateCategory,
		setUpdateCategoryValue,
		categoryProductUpdateSubmit
	}
}

