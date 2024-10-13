import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { ButtonSecondary, Header, InputPrimary } from '../../../../components/common'
import { CalcDailyNormHooks } from './hooks'
import { styles } from './style'

import { RouteProp, useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { MAIN, NUTRITION, ROUTES } from '../../../../navigation/ROUTES'
import { COLORS } from '../../../../constants/COLORS'
import { NutritionStackParamList } from '..'
import { NUTRITION_TYPE } from '../../../../types'

export type DailyScreenRouteProp = RouteProp<NutritionStackParamList, NUTRITION.CALC_DAILY_NORM>
const CalcDailyNormView = () => {
	const { weight, setWeight, gender, setGender, selected, onSelect, calculated, t, items, nType } =
		CalcDailyNormHooks()

	const route = useRoute<DailyScreenRouteProp>()
	const navigation = useNavigation()
	const { onSave, tab } = route.params || {}

	const text = t('daily-calorie-intake-deficit')

	const textThin = t('daily-calorie-intake-surplus')

	return (
		<View style={styles.container}>
			<SafeAreaView />

			<Header
				onBackPress={
					!!onSave && !!weight && !!selected
						? () => onSave(`${Number(weight) * items[selected].value}`)
						: () => {
								navigation.navigate(ROUTES.TABS.NUTRITION.SCHEMA_NUTRITION as never)
						  }
				}
				recommendation={tab > 0 ? 'dailyNormMass' : 'dailyNormOil'}
				right
			/>

			<ScrollView>
				<Text style={styles.title}>{t('daily-calorie-intake')}</Text>
				<Text style={styles.text1}>{nType === NUTRITION_TYPE.FAT ? text : textThin}</Text>

				<View style={styles.mid}>
					<View style={styles.left}>
						<Text style={styles.title1}>{t('weight-on-empty-stomach')}</Text>

						<InputPrimary
							value={!!weight && `${weight} кг`}
							disablePlaceholder
							inputStyle={styles.input}
							containerStyle={styles.inputCont}
							onChange={t => setWeight(t.replace(/[^\d.-]+/g, ''))}
						/>
					</View>
					<View style={styles.right}>
						<Text style={styles.title1}>{t('gender')}</Text>

						<View style={styles.rightRow}>
							<ButtonSecondary
								text={t('male')}
								onPress={() => setGender(0)}
								containerStyle={[!!gender && styles.inActiveBtn]}
								textStyle={!gender ? styles.text2 : styles.inActiveBtnText}
							/>
							<ButtonSecondary
								text={t('female')}
								onPress={() => setGender(1)}
								textStyle={gender ? styles.text2 : styles.inActiveBtnText}
								containerStyle={[styles.ml15, !!!gender && styles.inActiveBtn]}
							/>
						</View>
					</View>
				</View>

				<Text style={styles.title2}>{t('lifestyle-question')}</Text>
				{items.map((e, i) => (
					<TouchableOpacity key={i} style={styles.row} onPress={() => onSelect(i)}>
						<View style={styles.checkbox}>
							{i === selected && <View style={styles.checkboxFilled} />}
						</View>
						<Text style={styles.text3}>{e.text}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
			<View style={{ paddingBottom: 60 }}>
				<Text style={styles.title3}>{t('daily-calorie-requirement')}</Text>
				<View
					style={[
						styles.result,
						selected !== undefined && Number(weight) && { backgroundColor: COLORS.RED2 }
					]}
				>
					<Text style={[styles.title1, { fontSize: 16 }]}>
						{selected !== undefined && Number(weight) * items[selected].value} {t('calories2')}
					</Text>
				</View>
			</View>
		</View>
	)
}

export default CalcDailyNormView
