import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { MAIN } from '../../../../navigation/ROUTES'
import { ApiService } from '../../../../services'
import { Response, ROLES, Trainer } from '../../../../types'
const { ApiUrl } = Env
import EventEmitter from '../../../../utils/EventEmitter'
import { Asset, ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import { Env } from '../../../../../env'
import { MainStackParamList } from '..'
type TrainerScreenRouteProp = RouteProp<MainStackParamList, MAIN.TRAINER>

export const UpdateTrainerHook = () => {
	const [trainer, setTrainer] = useState<Partial<Trainer>>({})
	const navigation = useNavigation()
	const [selectImage, setSelectImage] = useState<Asset>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isPhoneNumber, setPhoneNumber] = useState<boolean>(true)
	const route = useRoute<TrainerScreenRouteProp>()
	const { trainer: globalTrainer } = route.params ?? {}
	const [isEducation, setIsEducation] = useState<boolean>(true)

	useEffect(() => {
		setTrainer({ ...globalTrainer })
		setPhoneNumber(globalTrainer.isPhoneNumber)
		setIsEducation(globalTrainer.isEducation)
	}, [globalTrainer])

	const onChange = (key: keyof Trainer) => (value: any) => {
		setTrainer({ ...trainer, [key]: value })
	}

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
				const res = await ApiService.put<Response<Trainer>>(
					`/trainers/image-update/${trainer._id}`,
					{ image: data.src }
				)
				setTrainer(prev => ({ ...prev, avatar: res.data.avatar }))
				setIsLoading(false)
			} catch (e) {
				setIsLoading(false)
				console.log(e)
			}
		}
	}

	const onTrainerSubmit = async () => {
		if (trainer.name && trainer.phoneNumber && trainer.email) {
			try {
				const current = {
					aboutMe: trainer.aboutMe ? trainer.aboutMe : ' ',
					age: trainer.age ? +trainer.age : 18,
					avatar: trainer.avatar,
					city: trainer.city ? trainer.city : ' ',
					education: isEducation ? (trainer.education ? trainer.education : ' ') : ' ',
					isEducation: isEducation,
					isPhoneNumber,
					email: trainer.email,
					instagramLink: trainer.instagramLink ? trainer.instagramLink : ' ',
					name: trainer.name,
					phoneNumber: trainer.phoneNumber,
					speciality: trainer.speciality ? trainer.speciality : ' ',
					telegramLink: trainer.telegramLink ? trainer.telegramLink : ' ',
					experience: trainer.experience ? +trainer.experience : 0,
					gender: trainer?.trainerGenderType?.value ? trainer?.trainerGenderType?.value : 'MALE'
				}
				const res = await ApiService.put(`/trainers/${globalTrainer._id}`, current)
				EventEmitter.notify('refreshTrainers')
				navigation.goBack()
			} catch (error: any) {
				console.log(JSON.stringify(error.response?.data))
			}
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

	return {
		onChange,
		onTrainerSubmit,
		trainer,
		selectImage,
		ImagePicker,
		isPhoneNumber,
		setPhoneNumber,
		isLoading,
		isEducation,
		setIsEducation
	}
}
