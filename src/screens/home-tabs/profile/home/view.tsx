import { View, Text, ScrollView } from 'react-native'
import Profile_btn from '../../../../components/common/ProfileBtn'
import { styles } from './style'
import SafeAreaView from 'react-native-safe-area-view'
import { ProfileHomeHooks } from './hooks'

const ProfileHomeView = () => {
	const {
		onMyDataPress,
		onNotificationPress,
		onSettingsPress,
		onLogOut,
		isAdmin,
		user,
		onUsersPress,
		isTrainer,
		onAdPress,
		t,
		onTrainerStatistic,
		onMyTrainerPress
	} = ProfileHomeHooks()

	return (
		<View style={styles.container}>
			<SafeAreaView />
			<View style={styles.profileContainer}>
				<View style={{}}>
					<View style={styles.profileNameBox}>
						<Text style={styles.profileName}>{user?.name}</Text>
						<Text style={styles.profileId}>ID: {user?._id}</Text>
					</View>
				</View>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ marginBottom: 130 }}>
					<Profile_btn onPress={onMyDataPress} title={t('my-data')} />
					<Profile_btn title={t('my-purchases')} />
					{isTrainer ? (
						<Profile_btn onPress={() => onUsersPress(true)} title='Мои ученики' />
					) : (
						<Profile_btn onPress={onMyTrainerPress} title={t('my-coach')} />
					)}
					{isTrainer && <Profile_btn onPress={onTrainerStatistic} title='Статистика' />}
					<Profile_btn onPress={onNotificationPress} title={t('notifications')} />
					<Profile_btn onPress={onSettingsPress} title={t('app-settings')} />
					{!!isAdmin && <Profile_btn title={t('users')} onPress={() => onUsersPress(false)} />}
					{!!isAdmin && <Profile_btn title={t('ads')} onPress={onAdPress} />}
					<Profile_btn
						textStyle={styles.titleBtn}
						title={t('logout')}
						hasIcon={false}
						onPress={onLogOut}
						// onPress={logOut}
					/>
				</View>
			</ScrollView>
		</View>
	)
}

export default ProfileHomeView
