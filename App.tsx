import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { enableScreens } from 'react-native-screens'
import store from './src/store/configureStore'
import Root from './src/navigation/Root'
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import { PermissionsAndroid, Platform } from 'react-native'
import { getFirebaseMessageToken } from './src/utils/getFirebaseMessageToken'

enableScreens()

const persistor = persistStore(store)
const requestNotificationPermission = async () => {
	if (Platform.OS === 'android' && Platform.Version >= 33) {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
				{
					title: 'Разрешение на уведомления',
					message: 'Приложению необходимо разрешение для отправки уведомлений',
					buttonNeutral: 'Напомнить позже',
					buttonNegative: 'Отмена',
					buttonPositive: 'OK'
				}
			)

			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('Разрешение на уведомления получено')
			} else {
				console.log('Разрешение на уведомления отклонено')
			}
		} catch (err) {
			console.warn(err)
		}
	}
}

// // Запрос разрешений для iOS
async function requestUserPermission() {
	const authStatus = await messaging().requestPermission()
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL

	if (enabled) {
		console.log('Authorization status:', authStatus)
	}
}

const App = () => {
	useEffect(() => {
		requestNotificationPermission()
		requestUserPermission()
		getFirebaseMessageToken()
	}, [])
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Root />
			</PersistGate>
		</Provider>
	)
}

export default App

//request-add-trainer
