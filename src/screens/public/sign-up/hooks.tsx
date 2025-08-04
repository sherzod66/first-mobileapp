import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { PublickStackParamList } from '../../../navigation/PublicStack'
import { PUBLIC, ROUTES } from '../../../navigation/ROUTES'
import { ApiService } from '../../../services'
import { Response, SignUpResponse } from '../../../types'
import { showErrToast } from '../../../utils/showToast'
import { useTranslation } from 'react-i18next'

export type SignUpScreenNavigationProp = NativeStackNavigationProp<
	PublickStackParamList,
	PUBLIC.SIGN_UP
>

export const SignUpHooks = () => {
	const [loading, setLoading] = useState(false)
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const { t } = useTranslation()
	const navigation = useNavigation<SignUpScreenNavigationProp>()

	// useEffect(() => {
	//   if (phone.length < 4 || phone.slice(0, 4) !== "+998") {
	//     setPhone("+998");
	//   }
	//   if (phone.length > 13) {
	//     setPhone(phone.slice(0, 13));
	//   }
	// }, [phone]);

	const onPress = async () => {
		try {
			if (!name) {
				showErrToast('Please enter name')
				return
			}

			if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(phone)) {
				showErrToast('Please enter correct email address')
				return
			}

			setLoading(true)

			const res = await ApiService.post<Response<SignUpResponse>>('/auth/signup', {
				name,
				phone
			})
			console.log(JSON.stringify(res.data))

			setLoading(false)

			navigation.navigate(PUBLIC.VERIFY_CODE, { phone, from: 'signup' })
		} catch (e: any) {
			setLoading(false)
			if (e.data && e.data.error && e.data.error.message) {
				showErrToast(e.data.error.message)
			} else {
				console.log('e: ', JSON.stringify(e, null, 4))
			}
		}
	}

	const onLoginPress = () => {
		navigation.navigate(ROUTES.PUBLIC.SIGN_IN)
	}

	return { loading, name, setName, phone, setPhone, onPress, onLoginPress, t }
}
