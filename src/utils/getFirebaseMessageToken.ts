import messaging from '@react-native-firebase/messaging'

export const getFirebaseMessageToken = async (): Promise<string> => {
	const token = await messaging().getToken()
	console.log('TOKEN = ', token)
	return token
}
