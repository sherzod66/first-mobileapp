import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { MAIN } from '../../../../navigation/ROUTES'
import { ApiService } from '../../../../services'
import { ROLES, Trainer } from '../../../../types'
const { ApiUrl } = Env
import EventEmitter from '../../../../utils/EventEmitter'
import { Asset, ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import { Env } from '../../../../../env'

export const CreateTrainerHook = () => {
	const [trainer, setTrainer] = useState<Partial<Trainer>>({})
	const navigation = useNavigation()
	const [selectImage, setSelectImage] = useState<Asset>()
	const [isPhoneNumber, setPhoneNumber] = useState<boolean>(true)
	const [isEducation, setIsEducation] = useState<boolean>(true)

	const onChange = (key: keyof Trainer) => (value: any) => {
		setTrainer({ ...trainer, [key]: value })
	}

	const onTrainerSubmit = async () => {
		if (trainer.name && trainer.phoneNumber && trainer.email) {
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
					aboutMe: trainer.aboutMe ? trainer.aboutMe : ' ',
					age: trainer.age ? +trainer.age : 18,
					avatar: imagePath.length > 0 ? imagePath : ' ',
					city: trainer.city ? trainer.city : ' ',
					education: isEducation ? (trainer.education ? trainer.education : ' ') : ' ',
					isPhoneNumber,
					email: trainer.phoneNumber,
					isEducation: isEducation,
					instagramLink: trainer.instagramLink ? trainer.instagramLink : ' ',
					name: trainer.name,
					phoneNumber: trainer.email,
					speciality: trainer.speciality ? trainer.speciality : ' ',
					telegramLink: trainer.telegramLink ? trainer.telegramLink : ' ',
					experience: trainer.experience ? +trainer.experience : 0,
					gender: trainer?.trainerGenderType?.value ? trainer?.trainerGenderType?.value : 'MALE'
				}
				console.log(JSON.stringify(current, null, 4))
				const res = await ApiService.post('/trainers', current)
				EventEmitter.notify('refreshTrainers')
				navigation.navigate(MAIN.TRAINERS as never)
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
		isEducation,
		setIsEducation
	}
}
