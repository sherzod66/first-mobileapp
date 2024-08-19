import { useEffect, useState } from 'react'
import { Exercise, TExercise } from '../../../../types'
import { ApiService } from '../../../../services'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { MainStackParamList } from '..'
import { MAIN } from '../../../../navigation/ROUTES'
import { Env } from '../../../../../env'
const { ApiUrl } = Env
import { Asset, ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'

export type ExerciseEditScreenRouteProp = RouteProp<MainStackParamList, MAIN.EDIT_EXERCISE>
type Response<D> = {
	success: boolean
	data: D
	error?: any | null
}

export const CreateExerciseHook = () => {
	const route = useRoute<ExerciseEditScreenRouteProp>()
	const navigation = useNavigation()
	const { exercise: data } = route.params
	const [exercise, setExercise] = useState(data)
	const [selectImage, setSelectImage] = useState<Asset>({ fileName: '' })
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		imageUpload()
	}, [selectImage])

	const imageUpload = async () => {
		if (selectImage) {
			setIsLoading(true)
			try {
				const bodyFormData = new FormData()
				bodyFormData.append('image', {
					uri: selectImage.uri,
					type: selectImage.type,
					name: selectImage.fileName
				})
				const fileRes = await fetch(`${ApiUrl}/uploads/image`, {
					method: 'post',
					body: bodyFormData,
					headers: { 'Content-Type': 'multipart/form-data' }
				})
				const data = await fileRes.json()
				const res = await ApiService.put<Response<Exercise>>(
					`/exercises/image-update/${exercise._id}`,
					{ image: data.src }
				)
				setExercise(prev => ({ ...prev, image: res.data.image }))
				setIsLoading(false)
			} catch (e) {
				setIsLoading(false)
				console.log(e)
			}
		}
	}
	const changeValue = (value: string, key: keyof Exercise) => {
		setExercise(prev => ({ ...prev, [key]: value }))
	}
	const ImagePicker = () => {
		let option: ImageLibraryOptions = {
			mediaType: 'photo'
		}
		launchImageLibrary(option, response => {
			if (response.assets) setSelectImage(response.assets[0])
		})
	}
	const onExerciseSubmit = async () => {
		try {
			const current: TExercise = {
				category: exercise.category,
				description: exercise.description,
				image: exercise.image,
				metadescription: exercise.metadescription,
				parentCategory: exercise.parentCategory,
				title: exercise.title,
				video: exercise.video
			}
			const res = await ApiService.put(`/exercises/${exercise._id}`, current)
		} catch (error) {
			console.log('ERROR', JSON.stringify(error))
		}
		navigation.navigate(MAIN.EXERCISES as never)
	}
	return {
		exercise,
		changeValue,
		onExerciseSubmit,
		ImagePicker,
		isLoading,
		setExercise
	}
}
