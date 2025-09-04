import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';
import store from './src/store/configureStore';
import Root from './src/navigation/Root';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

enableScreens();

const persistor = persistStore(store);

// Запрос разрешений для Android 13+
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
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Разрешение на уведомления получено');
      } else {
        console.log('Разрешение на уведомления отклонено');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

// Запрос разрешений для iOS
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

// Функция отображения уведомлений через Notifee
async function displayNotification(remoteMessage: any) {
  const channelId = await notifee.createChannel({
    id: 'fit-me',
    name: 'FIT-ME',
    description: 'Sport',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title || remoteMessage.data?.title,
    body: remoteMessage.notification?.body || remoteMessage.data?.body,
    android: {
      channelId,
      pressAction: { id: 'default' },
      smallIcon: 'ic_launcher', // проверь, что иконка есть в res/mipmap
      importance: AndroidImportance.HIGH,
    },
  });
}

const App = () => {
  useEffect(() => {
    // Запрос разрешений
    requestNotificationPermission();
    requestUserPermission();

    // Слушатель кликов по уведомлениям
    const unsubscribeNotifeeEvents = notifee.onForegroundEvent(
      ({ type, detail }) => {
        if (type === EventType.PRESS) {
          console.log(
            'Пользователь нажал на уведомление:',
            detail.notification,
          );
          // здесь можно навигацию сделать
        }
      },
    );

    // Когда сообщение получено при открытом приложении
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Получено новое сообщение:', remoteMessage);
      await displayNotification(remoteMessage);
    });

    // Когда сообщение получено в фоне
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Фоновое сообщение:', remoteMessage);
      await displayNotification(remoteMessage);
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeNotifeeEvents();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;
