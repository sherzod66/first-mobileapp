import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { styles } from './style'
import SafeAreaView from 'react-native-safe-area-view'
import { ButtonSecondary, Header } from '../../../../components/common'
import { IUserNotification, NotificationsHooks } from './hooks'
import { COLORS } from '../../../../constants/COLORS'

const Notifications = () => {
	const { notifications, acceptDisciple, removeDisciple } = NotificationsHooks()
	const renderNotification = (e: IUserNotification) => {
		//TODO SWITCH notification type
		return (
			<View style={styles.box}>
				<View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.textRed}>Пользователь</Text>
						<Text style={styles.text}> “ {e.name} “ хочет стат </Text>
					</View>
					<Text style={styles.text}>вашым учеником</Text>
				</View>
				<View style={{}}>
					<ButtonSecondary
						onPress={() => acceptDisciple(e.data)}
						text='Принять'
						containerStyle={{ borderColor: COLORS.GREEN, marginBottom: 20 }}
						textStyle={{ color: COLORS.GREEN }}
					/>
					<ButtonSecondary
						onPress={() => removeDisciple(e.data)}
						text='Отклонит'
						containerStyle={{ borderColor: COLORS.RED }}
						textStyle={{ color: COLORS.RED }}
					/>
				</View>
			</View>
		)
	}
	return (
		<View style={styles.container}>
			<SafeAreaView />
			<Header title='Уведомления' />
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ marginBottom: 100 }}>
					{notifications.map(e => renderNotification(e))}
					{/* <View style={styles.box}>
            <View style={{}}>
              <Text style={styles.text}>Вы купили упражнение “ Плечи “</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>за </Text>
                <Text style={styles.textRed}>50.000 сум</Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.textData}>10.15.2022</Text>
              <Text
                style={[styles.textRed, { fontWeight: "300", marginTop: 15 }]}
              >
                Перейти
              </Text>
            </View>
          </View>
          <View style={styles.box}>
            <View style={{}}>
              <Text style={styles.text}>Вы купили упражнение “ Плечи “</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>за </Text>
                <Text style={styles.textRed}>"Дневник тренировок "</Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.textData}>10.15.2022</Text>
              <Text
                style={[styles.textRed, { fontWeight: "300", marginTop: 15 }]}
              >
                Перейти
              </Text>
            </View>
          </View>
          <View style={styles.box}>
            <View style={{}}>
              <Text style={styles.text}>Вы купили упражнение “ Плечи “</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>за </Text>
                <Text style={styles.textRed}>"Дневник тренировок "</Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.textData}>10.15.2022</Text>
              <Text
                style={[styles.textRed, { fontWeight: "300", marginTop: 15 }]}
              >
                Перейти
              </Text>
            </View>
          </View>
          <View style={styles.box}>
            <View style={{}}>
              <Text style={styles.text}>Вы добавили блюдо “ Рис “</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>в</Text>
                <Text style={styles.textRed}>“ Мои продукты “</Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.textData}>10.15.2022</Text>
              <Text
                style={[styles.textRed, { fontWeight: "300", marginTop: 15 }]}
              >
                Перейти
              </Text>
            </View>
          </View>
          <View style={styles.box}>
            <View style={{}}>
              <Text style={styles.text}>Вы сделали свой план</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>в</Text>
                <Text style={styles.textRed}>“ Мои планы “</Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.textData}>10.15.2022</Text>
              <Text
                style={[styles.textRed, { fontWeight: "300", marginTop: 15 }]}
              >
                Перейти
              </Text>
            </View>
          </View> */}
				</View>
			</ScrollView>
		</View>
	)
}

export default Notifications
