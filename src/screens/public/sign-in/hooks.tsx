import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { PublickStackParamList } from '../../../navigation/PublicStack'
import { ApiService } from '../../../services'
import { SignInResponse, Response } from '../../../types'
import { showErrToast } from '../../../utils/showToast'
import { PUBLIC } from '../../../navigation/ROUTES'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export type SignInScreenNavigationProp = NativeStackNavigationProp<
	PublickStackParamList,
	PUBLIC.SIGN_IN
>

export const SignInHooks = () => {
	const [phone, setPhone] = useState('')
	const [loading, setLoading] = useState(false)

	const { t } = useTranslation()

	const navigation = useNavigation<SignInScreenNavigationProp>()

	// useEffect(() => {
	//   if (phone.length < 4 || phone.slice(0, 4) !== "+998") {
	//     setPhone("+998");
	//   }
	//   if (phone.length > 13) {
	//     setPhone(phone.slice(0, 13));
	//   }
	// }, [phone]);

	const onRegisterPress = () => {
		navigation.navigate(PUBLIC.SIGN_UP)
	}

	const onPress = async () => {
		try {
			// if (phone.length !== 13) {
			//   showErrToast("Please enter correct phone number");
			//   return;
			// }

			setLoading(true)
			// axios.get("http://")
			await ApiService.post<Response<SignInResponse>>('/auth/signin', {
				phone
			})

			setLoading(false)

			navigation.navigate(PUBLIC.VERIFY_CODE, { phone, from: 'signin' })
		} catch (e) {
			console.log('====================================')
			console.log(e)
			console.log('====================================')
			setLoading(false)
			if (!!e && e.data && e.data.error && e.data.error.message) {
				showErrToast(e.data.error.message)
			} else {
				console.log('e: ', JSON.stringify(e, null, 4))
			}
		}
	}

	return { phone, setPhone, onRegisterPress, onPress, loading, t }
}
