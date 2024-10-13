import { View, Text } from 'react-native'
import { COLORS } from '../constants/COLORS'
import { ROUTES } from '../navigation/ROUTES'
import { Assets } from '../utils/requireAssets'
import { Icon } from './common'
import { useTranslation } from 'react-i18next'

interface IProps {
	focused?: boolean
	route: any
}

const TabBarIcon = ({ focused, route }: IProps) => {
	const { t } = useTranslation()
	const getObj = (route: any) => {
		switch (route.name) {
			case ROUTES.TABS.MAIN.TAB:
				return {
					icon: Assets.icons.home1,
					label: t('home')
				}
			case ROUTES.TABS.WORKOUT.TAB:
				return {
					icon: Assets.icons.dumbbell1,
					label: t('workout')
				}
			case ROUTES.TABS.NUTRITION.TAB:
				return {
					icon: Assets.icons.nutrition1,
					label: t('nutrition')
				}
			case ROUTES.TABS.PROFILE.TAB:
				return {
					icon: Assets.icons.profile1,
					label: t('profile')
				}
			default:
				return {
					icon: Assets.icons.search,
					label: 'Search'
				}
		}
	}
	const { icon, label } = getObj(route)

	return (
		<View style={{ alignItems: 'center' }}>
			<Icon source={icon} tintColor={focused ? COLORS.WHITE : COLORS.GREY6} />
			<Text
				style={{
					marginTop: 3,
					fontSize: 11,
					lineHeight: 13,
					fontWeight: '400',
					color: focused ? COLORS.WHITE : COLORS.GREY6
				}}
			>
				{label}
			</Text>
		</View>
	)
}

export default TabBarIcon
