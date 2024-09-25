import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { enableScreens } from 'react-native-screens'
import store from './src/store/configureStore'
import Root from './src/navigation/Root'
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'

enableScreens()

const persistor = persistStore(store)

// Запрос разрешений для iOS
const requestUserPermission = async () => {
	const authStatus = await messaging().requestPermission()
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL

	if (enabled) {
		console.log('Уведомления разрешены')
	}
}

// Получение токена устройства
const getDeviceToken = async () => {
	const token = await messaging().getToken()
	console.log('FCM Token:', token)
}

const App = () => {
	useEffect(() => {
		// Запрос разрешений при запуске приложения
		requestUserPermission()

		// Получение FCM токена
		getDeviceToken()

		// Обработчик для сообщений, полученных в фоне
		messaging().setBackgroundMessageHandler(async remoteMessage => {
			console.log('Сообщение в фоне:', remoteMessage)
		})

		// Обработчик для сообщений, полученных, когда приложение активно
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			console.log('Сообщение в активном приложении:', remoteMessage)
		})

		return unsubscribe
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
