import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ButtonTabs, ButtonPrimary, ButtonSecondary } from '../../../../../components/common'
import { COLORS } from '../../../../../constants/COLORS'
import { SchemaNutritionHooks } from './hooks'
import Modal from './modal'
import { styles } from './style'

const SchemaNutritionView = () => {
	const {
		show,
		loading,
		modalError,
		calories,
		protein,
		oil,
		carb,
		acTogLoading,
		amountPercent,
		amountNorm,
		amountProtein,
		amountOil,
		amountCarb,
		schemaNutrition,
		activeTab,
		setActiveTab,
		modalValue,
		setModalValue,
		modalValue1,
		modalValue2,
		setModalValue1,
		setModalValue2,
		onDailyNormPress,
		onRecommendationPress,
		onConsumeCalendarPress,
		onMeasurementsPress,
		onShow,
		onSave,
		onCancel,
		t
	} = SchemaNutritionHooks()

	const { data } = schemaNutrition ?? {}
	const { dailyNorm, amount, proteinPercent, oilPercent, nType } = data ?? {}

	return (
		<View style={styles.container}>
			{acTogLoading ? (
				<View style={styles.btnCont}>
					<ActivityIndicator color={COLORS.WHITE} />
				</View>
			) : (
				<ButtonTabs
					primary
					active={activeTab}
					setActive={setActiveTab}
					containerStyle={styles.btnCont}
					titles={[t('oil'), t('mass')]}
					scroll={false}
				/>
			)}

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={[styles.row, styles.borderBottom]}>
					<View style={styles.box}>
						<ButtonSecondary
							text={t('daily-norm')}
							textStyle={styles.title}
							containerStyle={styles.titleBtn}
							onPress={onDailyNormPress}
						/>
						<TouchableOpacity style={styles.col3} onPress={() => onShow('a')}>
							{!!dailyNorm ? (
								<Text style={styles.text1}>
									{dailyNorm} {t('calories2')}
								</Text>
							) : (
								<View style={styles.colLine} />
							)}
						</TouchableOpacity>
					</View>
					<View style={styles.box}>
						<View style={styles.titleBox}>
							{activeTab ? (
								<Text style={styles.title}>{t('surplus-amount')}</Text>
							) : (
								<Text style={styles.title}>{t('deficit-amount')}</Text>
							)}
						</View>
						<TouchableOpacity style={styles.col2} onPress={() => onShow('b')}>
							{!!amount ? (
								<Text style={styles.text1}>
									{amount} {t('calories2')}
								</Text>
							) : (
								<View style={styles.colLine} />
							)}
						</TouchableOpacity>
					</View>
					<View style={styles.box}>
						<View style={styles.titleBox}>
							<Text style={styles.title}>{t('in-percent')}</Text>
						</View>
						<View style={styles.col1}>
							<Text style={styles.text1}>{amountPercent + '%' || ''}</Text>
						</View>
					</View>
				</View>

				<View style={[styles.row, { marginTop: 15 }]}>
					<View style={styles.box}>
						{activeTab ? (
							<Text style={styles.title}>{t('surplus-calorie-norm')}</Text>
						) : (
							<Text style={styles.title}>{t('deficit-calorie-norm')}</Text>
						)}

						<View style={styles.col3}>
							<Text style={styles.text1}>{amountNorm + ' Ккал' || ''}</Text>
						</View>
					</View>
					<View style={styles.box}>
						<Text style={styles.title}>{t('reduction-protein')}</Text>
						<TouchableOpacity style={styles.col1} onPress={() => onShow('c')}>
							<Text style={styles.text1}>{!!proteinPercent ? proteinPercent + '%' : ''}</Text>
							<View style={styles.colLine} />
							<Text style={styles.text1}>{!!proteinPercent ? amountProtein + ' гр' : ''}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.box}>
						<Text style={styles.title}>{t('reduction-fats')}</Text>
						<TouchableOpacity style={styles.col1} onPress={() => onShow('d')}>
							<Text style={styles.text1}>{!!oilPercent ? oilPercent + '%' : ''}</Text>
							<View style={styles.colLine} />
							<Text style={styles.text1}>{!!oilPercent ? amountOil + ' гр' : ''}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.box}>
						<Text style={styles.title}>{t('reduction-carbohydrates')}</Text>
						<View style={styles.col1}>
							<Text style={styles.text1}>
								{!!proteinPercent && !!oilPercent ? amountCarb + ' гр' : ''}
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.row2}>
					<ButtonSecondary
						text={t('change')}
						textStyle={styles.text1}
						onPress={() => onShow('e')}
						containerStyle={styles.changeBtn}
					/>
					{activeTab ? (
						<Text style={styles.text2}>{t('adjust-surplus-norm')}</Text>
					) : (
						<Text style={styles.text2}>{t('adjust-deficit-norm')}</Text>
					)}
				</View>

				<View style={[styles.row, { marginTop: 15 }]}>
					<View style={styles.box}>
						<Text style={styles.title}>{t('actual-calories')}</Text>
						<View style={styles.col3}>
							<Text style={styles.text}>{Math.round(calories) || ''}</Text>
						</View>
					</View>
					<View style={styles.box}>
						<Text style={styles.title}>{t('reduction-protein')}</Text>
						<View style={styles.col1}>
							<Text style={styles.text}>{Math.round(protein) || ''}</Text>
						</View>
					</View>
					<View style={styles.box}>
						<Text style={styles.title}>{t('reduction-fats')}</Text>
						<View style={styles.col1}>
							<Text style={styles.text}>{Math.round(oil) || ''}</Text>
						</View>
					</View>
					<View style={styles.box}>
						<Text style={styles.title}>{t('reduction-carbohydrates')}</Text>
						<View style={styles.col1}>
							<Text style={styles.text}>{Math.round(carb) || ''}</Text>
						</View>
					</View>
				</View>

				<View style={styles.btnBox}>
					<ButtonPrimary
						fill
						style={styles.btn1}
						textStyle={styles.btnText1}
						onPress={onConsumeCalendarPress}
						text={`+  ${t('food-consumed')}`}
					/>
					<ButtonPrimary
						fill
						style={styles.btn2}
						textStyle={styles.btnText2}
						onPress={onMeasurementsPress}
						text={t('dynamic-analysis')}
					/>
				</View>

				<View style={{ marginBottom: 100 }} />
			</ScrollView>

			<Modal
				show={show}
				error={modalError}
				loading={loading}
				activeTab={activeTab}
				state={modalValue}
				setState={setModalValue}
				state1={modalValue1}
				state2={modalValue2}
				setState1={setModalValue1}
				setState2={setModalValue2}
				onSave={onSave}
				onCancel={onCancel}
				onPress={onRecommendationPress}
			/>
		</View>
	)
}

export default SchemaNutritionView
