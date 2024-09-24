import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { PROFILE } from '../../../../navigation/ROUTES'
import { ApiService } from '../../../../services'
import { clearT } from '../../../../services/AuthService'
import { useRedux } from '../../../../store/hooks'
import { selectUser } from '../../../../store/slices/appSlice'
import { ROLES } from '../../../../types'
import { useTranslation } from 'react-i18next'

export const ProfileHomeHooks = () => {
	const navigation = useNavigation()

	const [user, dispatch] = useRedux(selectUser)

	const [state, setState] = useState('')
	const { t } = useTranslation()

	const onMyDataPress = () => {
		navigation.navigate(PROFILE.MY_DATA as never)
	}

	const onSettingsPress = () => {
		navigation.navigate(PROFILE.SETTINGS as never)
	}
	const onNotificationPress = () => {
		navigation.navigate(PROFILE.NOTIFICATIONS as never)
	}
	const onMyTrainerPress = () => {
		navigation.navigate(PROFILE.MY_TRAINER as never)
	}
	const onTrainerStatistic = () => {
		navigation.navigate(PROFILE.TRAINER_STATISTIC as never)
	}

	const onLogOut = async () => {
		try {
			const { phoneNumber: phone } = user ?? {}
			clearT()

			await ApiService.post('/auth/logout', { phone })
		} catch (e) {
			console.log('e: ', JSON.stringify(e, null, 4))
		}
	}

	const onUsersPress = (isTrainer?: boolean) => {
		//@ts-ignore
		navigation.navigate(PROFILE.USERS as never, { isTrainer })
	}

	const onAdPress = () => {
		navigation.navigate(PROFILE.ADS as never)
	}

	return {
		state,
		setState,
		onMyDataPress,
		onSettingsPress,
		onNotificationPress,
		onLogOut,
		isAdmin: user?.role === ROLES.SUPERADMIN,
		isTrainer: user?.role === ROLES.TRAINER,
		user,
		onUsersPress,
		onAdPress,
		t,
		onTrainerStatistic,
		onMyTrainerPress
	}
}
