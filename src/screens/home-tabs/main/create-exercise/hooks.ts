import { useEffect, useState } from 'react'
import { SelectItem } from '../../../../components/common/SelectPrimary'
import { Category, CategoryType, Exercise, Response } from '../../../../types'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectExerciseCategories,
	setCategoriesByType
} from '../../../../store/slices/categorySlice'
import { ApiService } from '../../../../services'
import { useNavigation } from '@react-navigation/native'
import { MAIN } from '../../../../navigation/ROUTES'
import { Alert } from 'react-native'
import { Asset, ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import { Env } from '../../../../../env'
import { showSuccessToast } from '../../../../utils/showToast'
const { ApiUrl } = Env

type CustomCategory = Partial<
	| Omit<Exercise, 'category'> & {
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

export const CreateExerciseHook = () => {
	const [exercise, setExercise] = useState<CustomCategory>({})
	const [selectImage, setSelectImage] = useState<Asset>()
	const [category, setCategory] = useState<Partial<Category>>({})
	const [subcategories, setSubcategories] = useState<Category[]>()
	const [categoryModalVisible, setCategoryModalVisible] = useState(false)

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
	const categories = useSelector(selectExerciseCategories)
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const onCategoryRemove = async (e: string) => {
		try {
			await ApiService.delete(`/categories/${e}`)
			Alert.alert('Внимание', 'Категория успешно удалена')
			const resCategories = await ApiService.get<Response<Category[]>>('/categories?parents=ss')
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
		} catch (error) {}
	}

	const onModalToggle = () => {
		setCategoryModalVisible(e => !e)
	}

	const onChange = (key: keyof Exercise) => (value: any) => {
		setExercise({ ...exercise, [key]: value })
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
		try {
			const current = {
				...category,
				parent: category?.parent?.value,
				type: 'EXERCISE'
			}
			const res = await ApiService.post('/categories', current)
		} catch (error) {
			console.log('ERROR', JSON.stringify(error))
		}
		setCategory({})
		setCategoryModalVisible(false)
	}

	const onExerciseSubmit = async () => {
		if (exercise.category?.label && exercise.title?.ru) {
			let imagePath = ''
			try {
				if (selectImage) {
					const bodyFormData = new FormData()
					bodyFormData.append('image', {
						uri: selectImage.uri,
						type: selectImage.type,
						name: selectImage.fileName
					})
					const res = await fetch(`${ApiUrl}/uploads/image`, {
						method: 'post',
						body: bodyFormData,
						headers: { 'Content-Type': 'multipart/form-data' }
					})
					const data = await res.json()
					imagePath = data.src
				}
				const current = {
					description: {
						en: exercise.description ? exercise.description.en : '  ',
						ru: exercise.description ? exercise.description.ru : '  ',
						uz: exercise.description ? exercise.description.uz : '  '
					},
					image: imagePath.length > 0 ? imagePath : ' ',
					metadescription: exercise.metadescription ? exercise.metadescription : ' ',
					title: {
						en: exercise.title ? exercise.title.en : ' ',
						ru: exercise.title ? exercise.title.ru : ' ',
						uz: exercise.title ? exercise.title.uz : ' '
					},
					video: exercise.video ? exercise.video : ' ',
					category: exercise.category?.value
				}
				console.log(JSON.stringify(current, null, 4))
				const res = await ApiService.post('/exercises', current)
			} catch (error: any) {
				console.log(JSON.stringify(error.response?.data.message, null, 4))
			}
			navigation.navigate(MAIN.EXERCISES as never)
		}
	}
	const ImagePicker = () => {
		let option: ImageLibraryOptions = {
			mediaType: 'photo'
		}
		launchImageLibrary(option, response => {
			if (response.assets) setSelectImage(response.assets[0])
		})
	}

	useEffect(() => {
		if (!!exercise.category) {
			const found = categories.find(e => e._id === exercise.category?.value)
			setSubcategories(found?.children)
		}
	}, [exercise.category])

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
				categories: resCategories.data.filter(v => v.type === CategoryType.PRODUCT).reverse()
			})
		)
		dispatch(
			setCategoriesByType({
				type: CategoryType.DISH,
				categories: resCategories.data.filter(v => v.type === CategoryType.DISH)
			})
		)
	}

	const categoryProductUpdateSubmit = async () => {
		if (updateCategoryValue && subcategories) {
			console.log('sss')
			const findCategory = categories.find(elem => elem._id === updateCategoryValue._id)
			const findSubcategory = subcategories.find(elem => elem._id === updateCategoryValue._id)
			if (findCategory) {
				try {
					setUpdateLoading(true)

					await ApiService.put(`/categories/${updateCategoryValue._id}`, payload)

					setUpdateLoading(false)
					setUpdateCategory({ category: null, isOpen: false })
					showSuccessToast('Категорий успешно обновлен')
				} catch (error) {
					setUpdateLoading(false)
				}
			} else if (findSubcategory) {
				try {
					setUpdateLoading(true)
					const payload = {
						name: {
							ru: updateCategoryValue.ru,
							uz: updateCategoryValue.uz,
							en: updateCategoryValue.en
						},
						type: updateCategoryValue.type,
						parent: findSubcategory.parent
					}
					await ApiService.put(`/categories/${updateCategoryValue._id}`, payload)

					setUpdateLoading(false)
					setUpdateCategory({ category: null, isOpen: false })
					showSuccessToast('Категорий успешно обновлен')
				} catch (error) {
					setUpdateLoading(false)
				}
			}
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
	const openUpdateSubcategory = (category: SelectItem) => {
		if (subcategories) {
			setUpdateCategory({ category, isOpen: true })
			const findCategory = subcategories.find(elem => elem._id === category.value)
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
	}
	const closeUpdateCategory = () => {
		setUpdateCategory({ category: null, isOpen: false })
	}

	return {
		onChange,
		subcategories,
		openUpdateSubcategory,
		categories,
		categoryModalVisible,
		onModalToggle,
		onCategoryChange,
		onCategorySubmit,
		onExerciseSubmit,
		onCategoryRemove,
		ImagePicker,
		selectImage,
		setExercise,
		categoryProductUpdateSubmit,
		openUpdateCategory,
		updateCategory,
		closeUpdateCategory,
		updateCategoryValue,
		setUpdateCategoryValue,
		updateLoading
	}
}
