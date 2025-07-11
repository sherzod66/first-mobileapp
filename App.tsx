import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { enableScreens } from 'react-native-screens'
import store from './src/store/configureStore'
import Root from './src/navigation/Root'
import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import { PermissionsAndroid, Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'

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
		PushNotification.configure({
			// Обработка уведомлений, когда они приходят или когда на них нажимают
			onNotification: function (notification) {
				console.log('НОВОЕ УВЕДОМЛЕНИЕ:', notification)
				// Дополнительная логика обработки нажатия на уведомление (если нужно)
			},

			// (опционально) если используете уведомления на iOS
			requestPermissions: true
		})

		// Создаем канал уведомлений для Android
		PushNotification.createChannel(
			{
				channelId: 'fit-me', // уникальный идентификатор канала
				channelName: 'FIT-ME', // название канала
				channelDescription: 'Sport', // описание канала
				soundName: 'default', // звуковое уведомление
				importance: 4, // высокий приоритет
				vibrate: true // включить вибрацию
			},
			created => console.log(`Канал уведомлений '${created ? 'создан' : 'уже существует'}`)
		)

		const unsubscribe = messaging().onMessage(async remoteMessage => {
			console.log('Получено новое сообщение:', remoteMessage)
			PushNotification.localNotification({
				channelId: 'fit-me',
				title: remoteMessage.notification?.title,
				message: `${remoteMessage.notification?.body}`,
				playSound: true,
				soundName: 'default',
				importance: 'high' // для Android, чтобы показать уведомление сразу
			})
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

//request-add-trainer
